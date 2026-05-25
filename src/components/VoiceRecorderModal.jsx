import React, { useState, useEffect, useRef } from 'react';
import { syncStorage } from '../firebase';
import { OPIC_CATEGORIES } from '../data';

export default function VoiceRecorderModal({ pattern, example, onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [timerText, setTimerText] = useState('00:00');
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [visualizerTip, setVisualizerTip] = useState('🎙️ Click the Record button below to begin speaking...');
  const [checklist, setChecklist] = useState({
    pron: false,
    into: false,
    speed: false,
    filler: false
  });

  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const recordedUrlRef = useRef(null);
  const recStartTimeRef = useRef(null);

  // Clean up recording pipelines on unmount
  useEffect(() => {
    return () => {
      stopAllMediaPipelines();
    };
  }, []);

  const stopAllMediaPipelines = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  };

  const startRecording = async () => {
    audioChunksRef.current = [];
    setHasRecordedAudio(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        recordedUrlRef.current = URL.createObjectURL(audioBlob);
        setHasRecordedAudio(true);
        setVisualizerTip('🔊 Practice recorded! Listen to your pronunciation below.');

        // Update speaking stats
        const currentStats = await syncStorage.getStats();
        await syncStorage.saveStats(currentStats.quizzes, currentStats.speaking + 1);
      };

      // Setup Web Audio Analyser
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      source.connect(analyser);

      // Boot
      mediaRecorder.start();
      recStartTimeRef.current = Date.now();
      setIsRecording(true);
      setVisualizerTip('🎤 Listening to your voice... Keep speaking!');

      // Timer Tick Interval
      timerIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - recStartTimeRef.current;
        const sec = Math.floor(elapsed / 1000) % 60;
        const min = Math.floor(elapsed / 60000);
        setTimerText(`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`);

        // Limit speaking practice to 60 seconds (realistic OPIc duration)
        if (elapsed >= 60000) {
          stopRecording();
        }
      }, 1000);

      // Start visualizer canvas drawing loop
      drawWaveform();

    } catch (err) {
      console.error("Mic access denied:", err);
      setVisualizerTip('⚠️ Microphone access denied. Check your browser permissions.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Waveform Drawing Loop
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameIdRef.current = requestAnimationFrame(draw);
      
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#060914';
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
        grad.addColorStop(0, '#8b5cf6');
        grad.addColorStop(1, '#06b6d4');

        ctx.fillStyle = grad;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };
    draw();
  };

  const handlePlayVoice = () => {
    if (recordedUrlRef.current) {
      const audio = new Audio(recordedUrlRef.current);
      audio.play();
    }
  };

  const handlePlayTTS = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(example.en);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    const voices = synth.getVoices();
    const usVoice = 
      voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Natural')) ||
      voices.find(v => v.lang.startsWith('en-US')) ||
      voices.find(v => v.lang.startsWith('en'));

    if (usVoice) utterance.voice = usVoice;
    synth.speak(utterance);
  };

  const handleCheckChange = (key) => {
    setChecklist({
      ...checklist,
      [key]: !checklist[key]
    });
  };

  const cat = OPIC_CATEGORIES.find(c => c.id === pattern.categoryId);

  return (
    <div class="record-modal active">
      <div class="record-modal-content">
        <button class="close-modal-btn" onClick={onClose} title="닫기">×</button>
        
        <div class="modal-sentence-header">
          <span class="modal-category-badge">{cat ? cat.name : 'OPIc Practice'}</span>
          <h3 class="modal-sentence-en">{example.en}</h3>
          <p class="modal-sentence-ko">{example.ko}</p>
        </div>

        {/* Live Audio Waveform Canvas */}
        <div class="visualizer-container">
          <canvas ref={canvasRef} class="visualizer-canvas"></canvas>
          <div class="visualizer-placeholder" style={{ display: isRecording ? 'none' : 'block' }}>
            {visualizerTip}
          </div>
        </div>

        <div class="recorder-controls-row">
          <div class="record-timer" style={{ color: isRecording ? '#f43f5e' : 'var(--text-primary)' }}>
            {timerText}
          </div>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button 
              class={`main-record-btn ${isRecording ? 'recording' : ''}`} 
              onClick={handleRecordToggle}
              title="녹음 시작/중지"
            >
              {isRecording ? '⏹' : '🎙️'}
            </button>
            <button 
              class="action-circle-btn" 
              onClick={handlePlayTTS}
              style={{ width: '50px', height: '50px', fontSize: '20px' }} 
              title="원어민 음성 다시듣기"
            >
              🔊
            </button>
          </div>

          {/* Playback recorded voice */}
          <div class={`playback-controls ${hasRecordedAudio ? 'active' : ''}`}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>내가 녹음한 발음:</span>
            <button class="playback-btn" onClick={handlePlayVoice}>▶ 재생하기 (Play Back)</button>
          </div>
        </div>

        {/* Rubric Self Checklist */}
        <div class="assessment-box">
          <h4 class="assessment-title">🎯 스피킹 셀프 피드백 (OPIc 채점 자가진단)</h4>
          <div class="assessment-checklist">
            <label class="checklist-label">
              <input 
                type="checkbox" 
                class="checklist-input" 
                checked={checklist.pron}
                onChange={() => handleCheckChange('pron')}
              />
              <span>🗣️ 정확한 발음 (Pronunciation)</span>
            </label>
            <label class="checklist-label">
              <input 
                type="checkbox" 
                class="checklist-input" 
                checked={checklist.into}
                onChange={() => handleCheckChange('into')}
              />
              <span>📈 자연스러운 억양/강세 (Intonation)</span>
            </label>
            <label class="checklist-label">
              <input 
                type="checkbox" 
                class="checklist-input" 
                checked={checklist.speed}
                onChange={() => handleCheckChange('speed')}
              />
              <span>⚡ 막힘없는 속도 (Flow & Speed)</span>
            </label>
            <label class="checklist-label">
              <input 
                type="checkbox" 
                class="checklist-input" 
                checked={checklist.filler}
                onChange={() => handleCheckChange('filler')}
              />
              <span>🌾 적절한 필러 워드 (Filler Usage)</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
