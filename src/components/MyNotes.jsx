import React, { useState, useEffect } from 'react';
import { OPIC_CATEGORIES, OPIC_PATTERNS } from '../data';
import { syncStorage } from '../firebase';

export default function MyNotes({ openRecorder, refreshStats, onNavigate }) {
  const [savedPatterns, setSavedPatterns] = useState([]);

  useEffect(() => {
    fetchBookmarkedPatterns();
  }, []);

  const fetchBookmarkedPatterns = async () => {
    const list = await syncStorage.getBookmarks();
    const matched = OPIC_PATTERNS.filter(p => list.includes(p.id));
    setSavedPatterns(matched);
  };

  const handleRemoveBookmark = async (patternId) => {
    const currentList = await syncStorage.getBookmarks();
    const updated = currentList.filter(id => id !== patternId);
    
    await syncStorage.saveBookmarks(updated);
    
    // Refresh local lists
    const matched = OPIC_PATTERNS.filter(p => updated.includes(p.id));
    setSavedPatterns(matched);

    refreshStats();
  };

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
      <div class="notes-container">
        
        <div class="notes-header-row">
          <h2 class="notes-title">⭐️ 나의 단어장</h2>
          <span class="notes-count">{savedPatterns.length} Patterns Saved</span>
        </div>

        {savedPatterns.length === 0 ? (
          /* Empty State */
          <div class="notes-empty-state">
            <div class="notes-empty-icon">📂</div>
            <h3 class="notes-empty-title">아직 저장된 패턴이 없습니다</h3>
            <p class="notes-empty-desc">
              패턴 학습 탭에서 헷갈리거나 자주 쓸 것 같은 예문 우측의 별표(⭐️) 아이콘을 눌러 나만의 리스트에 저장해보세요!
            </p>
            <button 
              class="action-btn" 
              onClick={() => onNavigate('hub')}
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              패턴 보러가기
            </button>
          </div>
        ) : (
          /* Bookmarks list */
          <div class="notes-list">
            {savedPatterns.map(pat => {
              const cat = OPIC_CATEGORIES.find(c => c.id === pat.categoryId);
              return (
                <div key={pat.id} class="pattern-card-box">
                  <div class="pat-card-header">
                    <div class="pat-title-group">
                      <div style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                        {cat ? `${cat.icon} ${cat.name}` : 'Pattern'}
                      </div>
                      <div class="pat-formula">{pat.pattern}</div>
                      <div class="pat-meaning-row">{pat.meaning}</div>
                    </div>
                    <div class="pat-actions">
                      <button 
                        class="action-circle-btn" 
                        onClick={() => handlePlayTTS(pat.pattern)}
                        title="전체 패턴 읽기"
                      >
                        🔊
                      </button>
                      <button 
                        class="action-circle-btn active-bookmark" 
                        onClick={() => handleRemoveBookmark(pat.id)}
                        title="즐겨찾기 해제"
                      >
                        ⭐️
                      </button>
                    </div>
                  </div>
                  <p class="pat-description-text">{pat.explanation}</p>
                  
                  <div class="pat-examples-section">
                    {/* Render first example for review */}
                    <div class="pat-ex-row">
                      <div class="pat-ex-text">
                        <div class="pat-ex-en-txt">{pat.examples[0].en}</div>
                        <div class="pat-ex-ko-txt">{pat.examples[0].ko}</div>
                      </div>
                      <div class="practice-btn-group">
                        <button 
                          class="ex-small-play" 
                          onClick={() => handlePlayTTS(pat.examples[0].en)}
                          title="원어민 발음 듣기"
                        >
                          ▶
                        </button>
                        <button 
                          class="ex-small-record" 
                          onClick={() => openRecorder(pat, pat.examples[0])}
                          title="내 목소리 연습하기"
                        >
                          🎙️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
