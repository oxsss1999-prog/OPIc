import React from 'react';
import { OPIC_TEMPLATES } from '../data';

export default function Strategies() {
  const handlePlayTTS = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }

    const cleanedText = text.replace(/\[.*?\]/g, 'something');
    const utterance = new SpeechSynthesisUtterance(cleanedText);
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
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '26px', marginBottom: '8px' }}>
          🛡️ OPIc 만능 답변 프레임워크 & 전략
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          돌발 질문이나 막막한 비교/묘사 질문을 맞닥뜨려도 흔들리지 않는 <strong>무기 템플릿</strong>입니다. 이 뼈대를 기억해두고 문장 사이에 적합한 어휘만 채워 자연스럽게 살을 붙이면 IH/AL 수준의 풍성한 발화량을 손쉽게 채울 수 있습니다.
        </p>
      </div>

      <div class="strategies-grid">
        {OPIC_TEMPLATES.map((temp, index) => (
          <div key={index} class="strategy-card">
            <div class="strategy-header">
              <span class="strategy-badge">{temp.type}</span>
              <h3 class="strategy-title">{temp.title}</h3>
            </div>
            
            <div class="strategy-steps">
              {temp.structure.map((step, idx) => (
                <div key={idx} class="step-card">
                  <div class="step-lbl">{step.step}</div>
                  <div class="step-phrase">
                    <span>"{step.phrase}"</span>
                    <button 
                      class="ex-small-play"
                      onClick={() => handlePlayTTS(step.phrase)}
                      title="TTS 듣기"
                    >
                      ▶
                    </button>
                  </div>
                  <div class="step-explanation">{step.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
