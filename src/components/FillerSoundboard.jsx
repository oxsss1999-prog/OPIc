import React from 'react';
import { OPIC_FILLERS } from '../data';

export default function FillerSoundboard() {
  const handlePlayTTS = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
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

  return (
    <div class="tab-content">
      <div class="filler-intro">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '26px', marginBottom: '8px' }}>
          🗣️ 오픽 만능 필러(Filler Words) 사운드보드
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          오픽 평가관이 가장 높게 평가하는 요소는 바로 <strong>'자연스러움(Fluency)'</strong>입니다. 대화가 뚝뚝 끊기지 않도록 단어 사이사이 아래의 필러 표현들을 자연스럽게 녹여내는 연습을 해보세요. 문장 카드를 클릭하면 쉐도잉 예문을 청취할 수 있습니다.
        </p>
      </div>

      <div class="filler-grid">
        {OPIC_FILLERS.map(fill => (
          <div 
            key={fill.id} 
            class={`filler-card ${fill.level.includes('Advanced') ? 'advanced' : ''}`}
          >
            <div class="filler-header">
              <h3 class="filler-word">{fill.word}</h3>
              <span class="filler-level">{fill.level}</span>
            </div>
            <h4 class="filler-meaning">{fill.meaning}</h4>
            <p class="filler-situation">{fill.situation}</p>
            <div 
              class="filler-sound-play"
              onClick={() => handlePlayTTS(fill.audioText)}
            >
              <span class="filler-play-icon">▶</span>
              <div class="filler-sound-text">
                <strong>🔊 Shadowing Sentence:</strong><br />
                "{fill.audioText}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
