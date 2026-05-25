import React, { useState, useEffect } from 'react';
import { syncStorage } from '../firebase';
import Dashboard from './Dashboard';
import PatternHub from './PatternHub';
import FillerSoundboard from './FillerSoundboard';
import QuizArena from './QuizArena';
import MyNotes from './MyNotes';
import Strategies from './Strategies';
import VoiceRecorderModal from './VoiceRecorderModal';

export default function Layout() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [stats, setStats] = useState({ progress: 0, bookmarks: 0, quizzes: 0, speaking: 0 });
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [showFirebaseBanner, setShowFirebaseBanner] = useState(true);
  
  // Global Voice Recorder Modal State
  const [recorderConfig, setRecorderConfig] = useState({
    isOpen: false,
    pattern: null,
    example: null
  });

  // Load stats and Firebase connection status
  useEffect(() => {
    // Check Firebase configuration state
    setIsFirebaseConnected(syncStorage.isConfigured());

    // Listen for Auth ready to sync stats
    const unsubscribe = syncStorage.onAuthReady(() => {
      refreshStats();
    });

    refreshStats();
    return () => unsubscribe();
  }, []);

  const refreshStats = async () => {
    const bookmarkedList = await syncStorage.getBookmarks();
    const statCounts = await syncStorage.getStats();

    const bookmarkCount = bookmarkedList.length;
    const completedQuizzesCount = statCounts.quizzes;
    const speakingPracticeCount = statCounts.speaking;

    const progressPercent = Math.min(
      100,
      Math.round(bookmarkCount * 1.5 + completedQuizzesCount * 15 + speakingPracticeCount * 5)
    );

    setStats({
      progress: progressPercent,
      bookmarks: bookmarkCount,
      quizzes: completedQuizzesCount,
      speaking: speakingPracticeCount
    });
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    refreshStats();
  };

  const openRecorder = (pattern, example) => {
    setRecorderConfig({
      isOpen: true,
      pattern,
      example
    });
  };

  const closeRecorder = () => {
    setRecorderConfig({
      isOpen: false,
      pattern: null,
      example: null
    });
    refreshStats();
  };

  return (
    <div class="app-container">
      {/* Premium Header */}
      <header>
        <div class="logo-section" onClick={() => handleTabChange('dashboard')} style={{ cursor: 'pointer' }}>
          <div class="logo-icon">🔥</div>
          <div>
            <h1 class="logo-title">
              OPIc <span style={{ fontWeight: 300 }}>Study Master</span>
              <span class="logo-badge">PRO</span>
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav class="nav-tabs">
          <button 
            class={`tab-btn ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            <span>🏠</span> 대시보드
          </button>
          <button 
            class={`tab-btn ${currentTab === 'hub' ? 'active' : ''}`}
            onClick={() => handleTabChange('hub')}
          >
            <span>📚</span> 패턴 학습
          </button>
          <button 
            class={`tab-btn ${currentTab === 'filler' ? 'active' : ''}`}
            onClick={() => handleTabChange('filler')}
          >
            <span>🗣️</span> 만능 필러
          </button>
          <button 
            class={`tab-btn ${currentTab === 'quiz' ? 'active' : ''}`}
            onClick={() => handleTabChange('quiz')}
          >
            <span>🎮</span> 퀴즈 아레나
          </button>
          <button 
            class={`tab-btn ${currentTab === 'mynotes' ? 'active' : ''}`}
            onClick={() => handleTabChange('mynotes')}
          >
            <span>⭐️</span> 나의 단어장
          </button>
          <button 
            class={`tab-btn ${currentTab === 'strategies' ? 'active' : ''}`}
            onClick={() => handleTabChange('strategies')}
          >
            <span>🛡️</span> 만능 템플릿
          </button>
        </nav>
      </header>

      {/* Main Study Arena */}
      <main>
        {/* Firebase Config Notification Helper */}
        {!isFirebaseConnected && showFirebaseBanner && (
          <div class="firebase-warning-banner">
            <div>
              <strong>ℹ️ 로컬 학습 모드 활성화됨:</strong> Firebase 설정이 아직 활성화되지 않았습니다. 로컬 캐시(LocalStorage)에 북마크 및 퀴즈 현황이 완벽하게 자동 보존됩니다. 디바이스 간 동기화를 원하시면 프로젝트 루트의 <code>.env</code> 파일에 credentials 키를 입력해 주세요!
            </div>
            <button onClick={() => setShowFirebaseBanner(false)}>확인했습니다</button>
          </div>
        )}

        {/* Tab Router Switch */}
        {currentTab === 'dashboard' && (
          <Dashboard 
            stats={stats} 
            onNavigate={handleTabChange} 
          />
        )}
        {currentTab === 'hub' && (
          <PatternHub 
            openRecorder={openRecorder} 
            refreshStats={refreshStats}
          />
        )}
        {currentTab === 'filler' && (
          <FillerSoundboard />
        )}
        {currentTab === 'quiz' && (
          <QuizArena 
            refreshStats={refreshStats}
          />
        )}
        {currentTab === 'mynotes' && (
          <MyNotes 
            openRecorder={openRecorder}
            refreshStats={refreshStats}
            onNavigate={handleTabChange}
          />
        )}
        {currentTab === 'strategies' && (
          <Strategies />
        )}
      </main>

      {/* Global Speaking Voice Recorder Modal */}
      {recorderConfig.isOpen && (
        <VoiceRecorderModal 
          pattern={recorderConfig.pattern}
          example={recorderConfig.example}
          onClose={closeRecorder}
        />
      )}

      {/* Footer */}
      <footer>
        <div>&copy; 2026 OPIc Study Master Pro. Powered by React + Firebase Suite. All Rights Reserved.</div>
        <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
          You can navigate directly to OPIc strategies via our custom study panels. Practice speaking every day to score AL!
        </div>
      </footer>
    </div>
  );
}
