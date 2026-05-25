import React, { useState } from 'react';
import { OPIC_CATEGORIES, OPIC_PATTERNS } from '../data';

export default function Dashboard({ stats, onNavigate }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Consistent daily pattern rotation
  const day = new Date().getDate();
  const index = day % OPIC_PATTERNS.length;
  const potd = OPIC_PATTERNS[index];

  const handleCategoryClick = (catId) => {
    // Cache the chosen category in localStorage so the Hub component can read it on mount
    localStorage.setItem('opic_active_category', catId);
    onNavigate('hub');
  };

  return (
    <div class="tab-content">
      <div class="dashboard-grid">
        
        {/* Left side: Welcome Banner & Categories */}
        <div class="dashboard-left">
          <div class="welcome-banner">
            <div class="welcome-banner-content">
              <h1>오늘의 OPIc 스피킹 학습을 시작해볼까요?</h1>
              <p>자주 쓰이는 빈출 패턴과 원어민식 징검다리 필러 단어를 숙달하면 자연스러운 대답이 가능해집니다. IH를 넘어 AL까지 함께 도전하세요!</p>
            </div>
            
            <div class="welcome-stats">
              <div class="stat-item">
                <span class="stat-val">{stats.progress}%</span>
                <span class="stat-lbl">학습 달성률</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">{stats.bookmarks}</span>
                <span class="stat-lbl">저장한 패턴</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">{stats.quizzes}</span>
                <span class="stat-lbl">퀴즈 완료수</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">{stats.speaking}</span>
                <span class="stat-lbl">스피킹 훈련수</span>
              </div>
            </div>
          </div>

          <h2 class="category-selection-title">원하시는 학습 영역을 선택하세요</h2>
          <div class="categories-grid">
            {OPIC_CATEGORIES.map(cat => {
              const count = OPIC_PATTERNS.filter(p => p.categoryId === cat.id).length;
              return (
                <div 
                  key={cat.id} 
                  class="category-card"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div class="cat-card-header">
                    <span class="cat-icon">{cat.icon}</span>
                    <span class="cat-difficulty">{cat.difficulty}</span>
                  </div>
                  <h3 class="cat-name-ko">{cat.name}</h3>
                  <h4 class="cat-name-en">{cat.engName}</h4>
                  <p class="cat-desc">{cat.description}</p>
                  <div style={{ fontSize: '11px', marginTop: '12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {count} Patterns Available
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Sidebar with POTD & Strategies Link */}
        <div class="dashboard-sidebar">
          
          {/* Pattern of the Day (3D Flip Card) */}
          <div class="potd-container">
            <h3 class="potd-header"><span>🔥</span> Pattern of the Day</h3>
            <div 
              class={`potd-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front View */}
              <div class="potd-side potd-front">
                <div class="potd-label">Daily Challenge</div>
                <div class="potd-expression">"{potd.pattern}"</div>
                <div class="potd-hint">
                  <span>💡</span> Click card to reveal translation & example
                </div>
              </div>

              {/* Back View */}
              <div class="potd-side potd-back">
                <div>
                  <div class="potd-label">Korean Meaning</div>
                  <div class="potd-meaning">{potd.meaning}</div>
                </div>
                <div class="potd-example-box">
                  <div class="potd-ex-en">"{potd.examples[0].en}"</div>
                  <div class="potd-ex-ko">{potd.examples[0].ko}</div>
                </div>
                <div class="potd-hint" style={{ color: 'var(--accent-cyan)' }}>
                  <span>🔄</span> Click to flip back
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips Panel */}
          <div class="tips-panel">
            <h3 class="tips-title">💡 OPIc 고득점 치트키</h3>
            <ul class="tips-list">
              <li class="tip-item-li">
                <span class="tip-bullet">1.</span>
                <div><strong>정적(Silence)은 절대 금지!</strong> 생각할 시간이 필요할 땐 "Well, you know..." 필러로 공백을 메우세요.</div>
              </li>
              <li class="tip-item-li">
                <span class="tip-bullet">2.</span>
                <div><strong>감정을 과장해서 연기하세요!</strong> "It was absolutely breathtaking!" 처럼 연기력이 점수를 좌우합니다.</div>
              </li>
              <li class="tip-item-li">
                <span class="tip-bullet">3.</span>
                <div><strong>나만의 만능 템플릿 장착!</strong> 갑작스러운 질문을 만나더라도 서론-본론-결론의 고정 패턴으로 순발력 있게 빠져나가세요.</div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
