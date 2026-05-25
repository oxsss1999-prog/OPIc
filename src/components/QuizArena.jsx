import React, { useState } from 'react';
import { OPIC_CATEGORIES, OPIC_PATTERNS } from '../data';
import { syncStorage } from '../firebase';

export default function QuizArena({ refreshStats }) {
  const [quizMode, setQuizMode] = useState('setup'); // 'setup' | 'playing' | 'finished'
  const [selectedCategory, setSelectedCategory] = useState('intro');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredState, setAnsweredState] = useState(null); // null | { selectedIdx, isCorrect }

  const startQuiz = () => {
    generateQuestions(selectedCategory);
    setCurrentIdx(0);
    setScore(0);
    setAnsweredState(null);
    setQuizMode('playing');
  };

  const generateQuestions = (catId) => {
    const catPatterns = OPIC_PATTERNS.filter(p => p.categoryId === catId);
    let questionPool = [];

    catPatterns.forEach(pat => {
      const isFillBlank = Math.random() > 0.4;
      const example = pat.examples[Math.floor(Math.random() * pat.examples.length)];

      if (isFillBlank) {
        // Gap-fill style
        let blankWord = 'describe';
        if (pat.pattern.includes('would describe')) blankWord = 'describe';
        else if (pat.pattern.includes('In my spare time')) blankWord = 'spare';
        else if (pat.pattern.includes('really into')) blankWord = 'into';
        else if (pat.pattern.includes('What I like most')) blankWord = 'most';
        else if (pat.pattern.includes('terribly sorry')) blankWord = 'terribly';

        const questionSentence = pat.pattern.replace(blankWord, '_______');
        const pool = ['recommend', 'introduce', 'explain', 'mention', 'free', 'hobbies', 'interested', 'completely', 'wonder', 'sorry', 'apologize'];
        const wrongOptions = pool.filter(w => w !== blankWord).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [blankWord, ...wrongOptions].sort(() => 0.5 - Math.random());

        questionPool.push({
          type: 'blank',
          prompt: '다음 패턴의 빈칸에 알맞은 단어를 선택하세요.',
          hint: `국문 의미: "${pat.meaning}"`,
          sentence: questionSentence,
          answer: blankWord,
          options
        });
      } else {
        // Translation matching style
        const correctText = pat.pattern;
        const otherPatterns = OPIC_PATTERNS.filter(p => p.id !== pat.id).sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.pattern);
        const options = [correctText, ...otherPatterns].sort(() => 0.5 - Math.random());

        questionPool.push({
          type: 'translate',
          prompt: '다음 우리말 의미를 표현할 가장 알맞은 OPIc 패턴을 고르세요.',
          hint: `"${pat.meaning}"`,
          sentence: '',
          answer: correctText,
          options
        });
      }
    });

    // Shuffle and cap at 5 questions
    setQuestions(questionPool.sort(() => 0.5 - Math.random()).slice(0, 5));
  };

  const handleAnswerSelect = (option, optIdx) => {
    if (answeredState) return; // Prevent multi-click

    const q = questions[currentIdx];
    const isCorrect = option === q.answer;

    setAnsweredState({
      selectedIdx: optIdx,
      isCorrect
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
      playBeep(true);
    } else {
      playBeep(false);
    }

    // Go to next question after 1.5 seconds
    setTimeout(async () => {
      setAnsweredState(null);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        // Save stats to cloud/localStorage
        const currentStats = await syncStorage.getStats();
        const newScore = isCorrect ? score + 1 : score;
        await syncStorage.saveStats(currentStats.quizzes + 1, currentStats.speaking);
        
        setQuizMode('finished');
        if (newScore === questions.length) {
          triggerConfetti();
        }
        refreshStats();
      }
    }, 1500);
  };

  // Web Audio SFX
  const playBeep = (isSuccess) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isSuccess) {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(147, audioCtx.currentTime + 0.1); // D3
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (err) {
      // Ignored if blocks autoplay
    }
  };

  // Custom Confetti System in React
  const triggerConfetti = () => {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#ec4899', '#f59e0b'];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.width = `${Math.random() * 8 + 6}px`;
      div.style.height = `${Math.random() * 12 + 6}px`;
      div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      div.style.left = `${Math.random() * 100}vw`;
      div.style.top = `-20px`;
      div.style.borderRadius = '2px';
      div.style.opacity = Math.random() * 0.7 + 0.3;
      
      const speed = Math.random() * 5 + 3;
      const angle = Math.random() * Math.PI * 2;
      const spinSpeed = Math.random() * 360;
      
      container.appendChild(div);

      let topPos = -20;
      let leftPos = parseFloat(div.style.left);
      let rotation = 0;

      const fall = () => {
        topPos += speed;
        leftPos += Math.sin(angle) * 1.5;
        rotation += spinSpeed / 60;

        div.style.top = `${topPos}px`;
        div.style.left = `${leftPos}px`;
        div.style.transform = `rotate(${rotation}deg)`;

        if (topPos < window.innerHeight) {
          requestAnimationFrame(fall);
        } else {
          div.remove();
        }
      };
      requestAnimationFrame(fall);
    }

    setTimeout(() => container.remove(), 6000);
  };

  const activeCategoryData = OPIC_CATEGORIES.find(c => c.id === selectedCategory);
  const q = questions[currentIdx];

  return (
    <div class="tab-content">
      {/* 1. SETUP CONFIG PANEL */}
      {quizMode === 'setup' && (
        <div class="quiz-config-card">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
          <h2>패턴 마스터리 퀴즈 아레나</h2>
          <p class="quiz-config-desc">각 영역별 빈출 패턴을 제대로 암기했는지 재미있게 확인해보세요.<br />빈칸 채우기 및 문장 매칭 등 총 5문제가 출제됩니다.</p>
          
          <div class="quiz-category-select-group">
            {OPIC_CATEGORIES.map(cat => (
              <label 
                key={cat.id} 
                class={`quiz-cat-option ${cat.id === selectedCategory ? 'active' : ''}`}
              >
                <span>{cat.icon} &nbsp;<strong>{cat.name}</strong> ({cat.engName})</span>
                <input 
                  type="radio" 
                  name="quiz-cat" 
                  value={cat.id} 
                  class="quiz-cat-radio" 
                  checked={cat.id === selectedCategory}
                  onChange={() => setSelectedCategory(cat.id)}
                />
              </label>
            ))}
          </div>

          <button class="action-btn" onClick={startQuiz}>퀴즈 도전하기</button>
        </div>
      )}

      {/* 2. ACTIVE QUIZ PLAYROOM */}
      {quizMode === 'playing' && q && (
        <div class="quiz-playroom active">
          <div class="quiz-hud">
            <span class="quiz-category-title">{activeCategoryData ? `${activeCategoryData.icon} ${activeCategoryData.name} Quiz` : 'Quiz'}</span>
            <span class="quiz-progress-lbl">Question {currentIdx + 1} of {questions.length}</span>
          </div>
          <div class="quiz-progress-bar-container">
            <div 
              class="quiz-progress-fill" 
              style={{ width: `${(currentIdx / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div class="quiz-question-box">
            <h3 class="quiz-question-prompt">{q.prompt}</h3>
            <p class="quiz-question-hint">{q.hint}</p>
          </div>

          <div class="quiz-interactive-area">
            {q.type === 'blank' ? (
              <div class="gap-fill-sentence">
                {q.sentence.split('_______').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span class="quiz-blank-input" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--accent-purple)', borderRadius: '8px', padding: '2px 14px', color: 'var(--accent-cyan)' }}>
                        {answeredState ? q.answer : '?'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '54px', filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.4))' }}>🧐</div>
            )}
          </div>

          <div class="quiz-options-grid">
            {q.options.map((opt, idx) => {
              // Styling dynamic states on answers
              let btnClass = 'quiz-option-btn';
              if (answeredState) {
                if (opt === q.answer) {
                  btnClass += ' correct';
                } else if (answeredState.selectedIdx === idx) {
                  btnClass += ' incorrect';
                }
              }

              return (
                <button 
                  key={idx}
                  class={btnClass}
                  onClick={() => handleAnswerSelect(opt, idx)}
                  disabled={answeredState !== null}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. FINISHED SCOREBOARD SUMMARY */}
      {quizMode === 'finished' && (
        <div class="quiz-finished-panel active">
          <div class="quiz-finished-trophy">🏆</div>
          <h2 class="quiz-finished-title">테스트 완료!</h2>
          <p class="quiz-finished-subtitle">
            {score === questions.length 
              ? '🥳 Perfect score! You have completely mastered this category!'
              : score >= 3
                ? '👏 Great job! Just a little more review to get a perfect score!'
                : '💪 Keep practicing! Review the patterns in the Study Hub and try again.'}
          </p>
          
          <div class="quiz-score-circle">
            <span class="quiz-score-val">{score} / {questions.length}</span>
            <span class="quiz-score-lbl">최종 점수</span>
          </div>

          <button class="action-btn" onClick={() => setQuizMode('setup')}>다시 도전하기</button>
        </div>
      )}

    </div>
  );
}
