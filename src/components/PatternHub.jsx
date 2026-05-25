import React, { useState, useEffect } from 'react';
import { OPIC_CATEGORIES, OPIC_PATTERNS } from '../data';
import { syncStorage } from '../firebase';

export default function PatternHub({ openRecorder, refreshStats }) {
  // Read category selection from cache (saved when clicked on Dashboard), fallback to 'intro'
  const [activeCategory, setActiveCategory] = useState(
    localStorage.getItem('opic_active_category') || 'intro'
  );
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks on mount
  useEffect(() => {
    const fetchBookmarks = async () => {
      const list = await syncStorage.getBookmarks();
      setBookmarks(list);
    };
    fetchBookmarks();
  }, []);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    localStorage.setItem('opic_active_category', catId);
  };

  const handleBookmarkToggle = async (patternId) => {
    let updated = [...bookmarks];
    const index = updated.indexOf(patternId);
    if (index === -1) {
      updated.push(patternId);
    } else {
      updated.splice(index, 1);
    }

    setBookmarks(updated);
    await syncStorage.saveBookmarks(updated);
    refreshStats();
  };

  // Text-To-Speech Playback
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

  const filteredPatterns = OPIC_PATTERNS.filter(p => p.categoryId === activeCategory);

  return (
    <div class="tab-content">
      <div class="hub-layout">
        
        {/* Category Sidebar Selector */}
        <div class="hub-sidebar">
          {OPIC_CATEGORIES.map(cat => {
            const count = OPIC_PATTERNS.filter(p => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                class={`hub-sidebar-btn ${cat.id === activeCategory ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat.id)}
              >
                <span>{cat.icon} &nbsp;{cat.name}</span>
                <span class="hub-sidebar-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Main Patterns Listing */}
        <div class="hub-main">
          {filteredPatterns.length === 0 ? (
            <div class="notes-empty-state">No patterns found for this category.</div>
          ) : (
            filteredPatterns.map(pat => {
              const isBookmarked = bookmarks.includes(pat.id);
              return (
                <div key={pat.id} class="pattern-card-box">
                  <div class="pat-card-header">
                    <div class="pat-title-group">
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
                        class={`action-circle-btn ${isBookmarked ? 'active-bookmark' : ''}`}
                        onClick={() => handleBookmarkToggle(pat.id)}
                        title="즐겨찾기 추가"
                      >
                        ⭐️
                      </button>
                    </div>
                  </div>
                  <p class="pat-description-text">{pat.explanation}</p>
                  
                  {pat.tip && (
                    <div class="pat-tip-box">
                      💡 <strong>Tip:</strong> {pat.tip}
                    </div>
                  )}

                  <div class="pat-examples-section">
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Essential Practice Sentences
                    </h5>
                    {pat.examples.map((ex, i) => (
                      <div key={i} class="pat-ex-row">
                        <div class="pat-ex-text">
                          <div class="pat-ex-en-txt">{ex.en}</div>
                          <div class="pat-ex-ko-txt">{ex.ko}</div>
                        </div>
                        <div class="practice-btn-group">
                          <button 
                            class="ex-small-play" 
                            onClick={() => handlePlayTTS(ex.en)}
                            title="원어민 발음 듣기"
                          >
                            ▶
                          </button>
                          <button 
                            class="ex-small-record" 
                            onClick={() => openRecorder(pat, ex)}
                            title="내 목소리 연습하기"
                          >
                            🎙️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
