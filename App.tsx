
import React, { useState, useEffect, useRef } from 'react';
import { UserState, StageType, Badge, Question } from './types';
import { QUESTIONS_HA_LONG, QUESTIONS_PHU_QUOC, QUESTIONS_HOI_AN, QUESTIONS_MINI_GAME, BADGES } from './constants';
import { Chatbot } from './components/Chatbot';
import { AvatarPreview } from './components/AvatarPreview';
import { AvatarCustomizer } from './components/AvatarCustomizer';
import { audioService } from './services/audio';
import { askAIGuide } from './services/gemini';

// Mock data for leaderboard
const MOCK_LEADERBOARD = [
  { username: 'Sơn Tùng M-TP', score: 450, avatar: '🎭', isUser: false },
  { username: 'Bác Ba Phi', score: 380, avatar: '🎣', isUser: false },
  { username: 'Cô Ba Sài Gòn', score: 320, avatar: '👗', isUser: false },
  { username: 'Người Bí Ẩn', score: 290, avatar: '👤', isUser: false },
  { username: 'Thánh Gióng', score: 250, avatar: '🏇', isUser: false },
];

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number, x: number, color: string, delay: number, duration: number }[]>([]);
  
  useEffect(() => {
    const colors = ['#f59e0b', '#22c55e', '#ef4444', '#3b82f6', '#ec4899'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
      {particles.map(p => (
        <div 
          key={p.id}
          className="confetti-particle"
          style={{ 
            left: `${p.x}%`, 
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserState | null>(null);
  const [screen, setScreen] = useState<'AUTH' | 'MAP' | 'GAME' | 'REWARDS' | 'LEADERBOARD'>('AUTH');
  const [currentStage, setCurrentStage] = useState<StageType>('HA_LONG');
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isMuted, setIsMuted] = useState(audioService.getIsMuted());
  const [volume, setVolume] = useState(audioService.getVolume());

  useEffect(() => {
    // Sync with service on mount
    setIsMuted(audioService.getIsMuted());
    setVolume(audioService.getVolume());
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  useEffect(() => {
    // Start or ensure continuous play through coarse controls
    if (screen === 'MAP' || screen === 'AUTH') {
      audioService.switchBgm('MAIN_THEME');
    } else {
      audioService.startBgMusic();
    }
  }, [screen]);

  useEffect(() => {
    const startMusic = () => {
      audioService.startBgMusic();
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
    window.addEventListener('click', startMusic);
    window.addEventListener('touchstart', startMusic);
    
    return () => {
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = () => {
    if (username.trim() && avatarUrl) {
      audioService.play('CLICK');
      audioService.startBgMusic(); 
      setUser({
        isLoggedIn: true,
        username,
        avatar: avatarUrl,
        score: 0,
        completedStages: []
      });
      setScreen('MAP');
    }
  };

  const startStage = (stage: StageType) => {
    audioService.play('CLICK');
    setCurrentStage(stage);
    setScreen('GAME');
  };

  const finishStage = (points: number) => {
    audioService.play('SUCCESS_SFX');
    setScore(prev => prev + points);
    setUser(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        score: prev.score + points,
        completedStages: [...new Set([...prev.completedStages, currentStage])]
      };
    });
    setScreen('MAP');
  };

  const openRewards = () => {
    audioService.play('CLICK');
    setScreen('REWARDS');
  };

  const openLeaderboard = () => {
    audioService.play('CLICK');
    setScreen('LEADERBOARD');
  };

  const toggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioService.setVolume(val);
  };

  const parallaxX = (mousePos.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePos.y - window.innerHeight / 2) / 50;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen relative z-10">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-amber-200">
        <h1 
          className="text-3xl font-extrabold text-amber-800 flex items-center gap-3 italic cursor-pointer transition-transform hover:scale-105"
          onClick={() => user && setScreen('MAP')}
        >
          <span className="text-4xl">🐉</span> 
          Chuyến Phiêu Lưu Văn Hoá
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-100 p-2 rounded-full border border-amber-300 shadow-sm px-4">
            <button 
              onClick={toggleMute}
              className="hover:scale-110 transition-transform relative group"
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? '🔇' : '🎵'}
              {!isMuted && (
                <>
                  <div className="absolute -top-1 -right-1 flex gap-0.5 h-3 items-end">
                    <div className="w-0.5 bg-amber-600 animate-music-bar-1"></div>
                    <div className="w-0.5 bg-amber-600 animate-music-bar-2"></div>
                    <div className="w-0.5 bg-amber-600 animate-music-bar-3"></div>
                  </div>
                  {/* Music Info Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-amber-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    AI Generated Theme: Vietnamese Zen 🏮
                  </div>
                </>
              )}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange} 
              className="w-16 sm:w-24 accent-amber-600 h-1.5 cursor-pointer"
            />
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <button 
                onClick={openLeaderboard}
                className="bg-amber-100 p-2 rounded-full border border-amber-300 hover:bg-amber-200 transition-colors relative group shadow-sm"
                title="Bảng xếp hạng"
              >
                <span className="text-2xl">📊</span>
              </button>
              <button 
                onClick={openRewards}
                className="bg-amber-100 p-2 rounded-full border border-amber-300 hover:bg-amber-200 transition-colors relative group shadow-sm"
                title="Thành tựu"
              >
                <span className="text-2xl">🏅</span>
                <div className="absolute -bottom-1 -right-1 bg-red-500 w-3 h-3 rounded-full border border-white animate-pulse"></div>
              </button>
              <div className="bg-amber-100 px-4 py-2 rounded-full border border-amber-300 shadow-sm">
                <span className="text-amber-700 font-bold">🏆 {score} Điểm</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="transition-all duration-500 animate-screen-transition">
        {screen === 'AUTH' && (
          <AvatarCustomizer 
            selectedImageUrl={avatarUrl}
            onSelect={setAvatarUrl}
            username={username}
            onUsernameChange={setUsername}
            onConfirm={handleLogin}
          />
        )}

        {screen === 'MAP' && user && (
          <div className="relative animate-screen-transition">
            <div className="absolute -top-20 -left-10 text-6xl opacity-20 animate-floating pointer-events-none" style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}>☁️</div>
            <div className="absolute top-40 -right-20 text-7xl opacity-20 animate-floating-slow pointer-events-none" style={{ transform: `translate(${-parallaxX}px, ${-parallaxY}px)` }}>🏮</div>
            <div className="absolute bottom-0 -left-20 text-8xl opacity-10 animate-floating pointer-events-none" style={{ transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)` }}>🛶</div>

            <div className="mb-6 flex justify-between items-center relative z-10">
               <div className="flex items-center gap-4">
                 <AvatarPreview imageUrl={user.avatar} size={64} className="border-2 border-amber-400 shadow-md" />
                 <div>
                   <h2 className="text-2xl font-bold text-amber-900">Bản Đồ Di Sản</h2>
                   <p className="text-amber-700 italic">Chào mừng {user.username}! Chọn một chặng để khám phá.</p>
                 </div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <StageCard 
                title="Vịnh Hạ Long" 
                icon="🚢"
                isCompleted={user.completedStages.includes('HA_LONG')}
                onClick={() => startStage('HA_LONG')}
              />
              <StageCard 
                title="Đảo Phú Quốc" 
                icon="🏝️"
                isCompleted={user.completedStages.includes('PHU_QUOC')}
                onClick={() => startStage('PHU_QUOC')}
              />
              <StageCard 
                title="Phố cổ Hội An" 
                icon="🏮"
                isCompleted={user.completedStages.includes('HOI_AN')}
                onClick={() => startStage('HOI_AN')}
              />
              <StageCard 
                title="Mini game" 
                icon="🎮"
                isChallenge={true}
                isCompleted={user.completedStages.includes('MINI_GAME')}
                onClick={() => startStage('MINI_GAME')}
              />
            </div>
          </div>
        )}

        {screen === 'GAME' && (
          <div className="animate-screen-transition">
            <GameEngine stage={currentStage} onFinish={finishStage} onBack={() => {
              audioService.play('CLICK');
              setScreen('MAP');
            }} />
          </div>
        )}

        {screen === 'LEADERBOARD' && user && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 max-w-2xl mx-auto animate-screen-transition">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                <span>📊</span> Bảng Xếp Hạng Di Sản
              </h2>
              <button 
                onClick={() => setScreen('MAP')}
                className="text-amber-700 font-bold hover:underline"
              >
                ← Trở lại Map
              </button>
            </div>

            <div className="space-y-4">
              {[...MOCK_LEADERBOARD, { username: user.username, score: score, avatar: user.avatar, isUser: true }]
                .sort((a, b) => b.score - a.score)
                .map((entry, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all animate-slide-in ${
                      entry.isUser 
                        ? 'bg-amber-100 border-amber-400 shadow-md ring-2 ring-amber-200 ring-offset-2' 
                        : 'bg-white border-amber-50 hover:border-amber-100'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                        index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-amber-200 text-amber-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center bg-amber-50 rounded-full border-2 border-amber-200 overflow-hidden shadow-sm">
                        <AvatarPreview imageUrl={entry.avatar} size={48} />
                      </div>
                      <div>
                        <p className={`font-bold ${entry.isUser ? 'text-amber-900' : 'text-gray-800'}`}>
                          {entry.username} {entry.isUser && '(Bạn)'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-700 font-extrabold text-xl">{entry.score}</p>
                      <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Điểm</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {screen === 'REWARDS' && user && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 max-w-2xl mx-auto animate-screen-transition">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                <span>🏅</span> Thành Tựu Của Bạn
              </h2>
              <button 
                onClick={() => setScreen('MAP')}
                className="text-amber-700 font-bold hover:underline"
              >
                ← Trở lại Map
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {BADGES.map((badge, idx) => {
                const isUnlocked = badge.check({ ...user, score });
                return (
                  <div 
                    key={badge.id}
                    className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-500 border-2 animate-fadeIn ${
                      isUnlocked 
                        ? 'bg-amber-50 border-amber-200 opacity-100 scale-100 shadow-md' 
                        : 'bg-gray-50 border-gray-100 opacity-50 grayscale'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-5xl mb-3 transform transition-transform hover:scale-110">
                      {badge.icon}
                    </div>
                    <h4 className="font-bold text-amber-900 text-sm mb-1">{badge.name}</h4>
                    <p className="text-[10px] leading-tight text-gray-500 mb-2">{badge.description}</p>
                    {isUnlocked ? (
                      <span className="text-[9px] font-extrabold text-green-600 uppercase tracking-widest">Đã mở</span>
                    ) : (
                      <span className="text-[9px] font-medium text-gray-400 italic">Yêu cầu: {badge.requirement}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Chatbot />
    </div>
  );
};

const StageCard: React.FC<{ 
  title: string, 
  icon: string, 
  isCompleted: boolean, 
  isChallenge?: boolean, 
  onClick: () => void 
}> = ({ title, icon, isCompleted, isChallenge, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-8 rounded-[2.5rem] text-center transition-all relative overflow-hidden border-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center justify-center gap-4 group ${
      isCompleted 
        ? 'bg-green-50 border-green-200 opacity-90' 
        : isChallenge 
          ? 'bg-amber-100 border-amber-400'
          : 'bg-white border-amber-100 animate-pulse-soft'
    }`}
  >
    <div className={`text-5xl transition-transform group-hover:scale-125 duration-500 ${!isCompleted ? 'animate-bounce-slow' : ''}`}>
      {icon}
    </div>
    <h3 className="text-xl font-black text-amber-900 uppercase tracking-tighter leading-tight">
      {title}
    </h3>
    
    {isCompleted && (
      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm">Xong</div>
    )}
    {isChallenge && !isCompleted && (
      <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm animate-pulse">Hot</div>
    )}
  </button>
);

const GameEngine: React.FC<{ stage: StageType, onFinish: (p: number) => void, onBack: () => void }> = ({ stage, onFinish, onBack }) => {
  // Mini Game specific states
  const [bubbles, setBubbles] = useState<{ id: number, x: number, y: number, text: string, tone: string, speed: number, isWrong?: boolean, isRight?: boolean }[]>([]);
  const [targetTone, setTargetTone] = useState<{ name: string, type: string }>({ name: 'Thanh Sắc', type: 'sac' });
  const [combo, setCombo] = useState(0);
  const [gameFeedback, setGameFeedback] = useState<{ text: string, icon: string, color: string } | null>(null);
  const [isLanternLit, setIsLanternLit] = useState(false);
  const [showCultureNote, setShowCultureNote] = useState(false);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showBurst, setShowBurst] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<number | null>(null);
  const gameLoopRef = useRef<number | null>(null);

  const [currentSentence, setCurrentSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Classification states
  const [classAssignments, setClassAssignments] = useState<Record<string, string>>({});
  const [selectedClassWord, setSelectedClassWord] = useState<string | null>(null);

  const [mistakes, setMistakes] = useState<Question[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showMistakeReview, setShowMistakeReview] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isFinished) {
      audioService.switchBgm('VICTORY_THEME');
      audioService.play('SUCCESS_SFX');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [isFinished]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQIndex, isFinished]);

  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [multipleInputs, setMultipleInputs] = useState<Record<string, string>>({});

  const stageIcons: Record<string, string> = {
    'HA_LONG': '⛵',
    'PHU_QUOC': '🏝️',
    'HOI_AN': '🏮',
    'MINI_GAME': '🎮'
  };
  const stageNames: Record<string, string> = {
    'HA_LONG': 'Cùng khám phá Vịnh Hạ Long nhé 😊',
    'PHU_QUOC': 'Cùng khám phá Phú Quốc nhé 😊',
    'HOI_AN': 'Cùng khám phá Hội An nhé 😊',
    'MINI_GAME': 'Mini Game'
  };

  const questions = 
    stage === 'HA_LONG' ? QUESTIONS_HA_LONG : 
    stage === 'PHU_QUOC' ? QUESTIONS_PHU_QUOC : 
    stage === 'HOI_AN' ? QUESTIONS_HOI_AN : 
    QUESTIONS_MINI_GAME;

  const TONE_DATA = [
    { name: 'Thanh Sắc', type: 'sac', words: ['má', 'cá', 'sóng', 'tóm'] },
    { name: 'Thanh Huyền', type: 'huyen', words: ['mà', 'cà', 'sòng', 'tòm'] },
    { name: 'Thanh Hỏi', type: 'hoi', words: ['mả', 'cả', 'sỏng'] },
    { name: 'Thanh Ngã', type: 'nga', words: ['mã', 'cã'] },
    { name: 'Thanh Nặng', type: 'nang', words: ['mạ', 'cạ'] },
    { name: 'Thanh Ngang', type: 'ngang', words: ['ma', 'ca', 'song', 'tom', 'sông', 'tôm'] }
  ];

  const WORD_POOL = [
    { text: 'ma', tone: 'ngang' }, { text: 'má', tone: 'sac' }, { text: 'mà', tone: 'huyen' }, { text: 'mả', tone: 'hoi' }, { text: 'mã', tone: 'nga' }, { text: 'mạ', tone: 'nang' },
    { text: 'ca', tone: 'ngang' }, { text: 'cá', tone: 'sac' }, { text: 'cà', tone: 'huyen' }, { text: 'cả', tone: 'hoi' }, { text: 'cã', tone: 'nga' }, { text: 'cạ', tone: 'nang' },
    { text: 'song', tone: 'ngang' }, { text: 'sóng', tone: 'sac' }, { text: 'sòng', tone: 'huyen' }, { text: 'sỏng', tone: 'hoi' }, { text: 'sông', tone: 'ngang' },
    { text: 'tom', tone: 'ngang' }, { text: 'tóm', tone: 'sac' }, { text: 'tòm', tone: 'huyen' }, { text: 'tôm', tone: 'ngang' }
  ];

  useEffect(() => {
    if (stage === 'MINI_GAME' && !isFinished) {
      // Lantern Game doesn't need the bubble timer/spawner
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      };
    } else if (stage !== 'MINI_GAME' && !isFinished) {
      // Normal Quiz Timer logic (if any)
    }
  }, [stage, isFinished]);

  const handleBubbleClick = (id: number, tone: string) => {
    if (isFinished) return;
    
    const isCorrect = tone === targetTone.type;
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, isRight: isCorrect, isWrong: !isCorrect } : b));
    
    if (isCorrect) {
      audioService.play('CORRECT');
      const bonus = (combo + 1) % 3 === 0 ? 5 : 0;
      setPoints(p => p + 10 + bonus);
      setCombo(c => c + 1);
      setGameFeedback({ text: 'Chính xác!', icon: '✨', color: 'text-green-600' });
      
      // Change target tone sometimes
      if (Math.random() > 0.7) {
        setTargetTone(TONE_DATA[Math.floor(Math.random() * TONE_DATA.length)]);
      }
    } else {
      audioService.play('INCORRECT');
      setPoints(p => Math.max(0, p - 5));
      setCombo(0);
      setGameFeedback({ text: 'Sai rồi, thử lại!', icon: '💡', color: 'text-red-600' });
    }

    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
      setGameFeedback(null);
    }, 500);
  };

  useEffect(() => {
    const q = questions[currentQIndex];
    if (q && q.type === 'REORDER') {
      let words: string[] = [];
      if (q.content && q.content.includes('/')) {
        words = q.content.split('/').map(s => s.trim());
      } else {
        words = q.answer.split(' ');
      }
      setAvailableWords([...words].sort(() => Math.random() - 0.5));
      setCurrentSentence([]);
    }
  }, [currentQIndex, stage]);

  const triggerResultAnimation = (correct: boolean) => {
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 800);
  };

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (isCorrect !== null) return;
    audioService.play('CLICK');
    if (fromAvailable) {
      setAvailableWords(prev => {
        const index = prev.indexOf(word);
        if (index > -1) {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        }
        return prev;
      });
      setCurrentSentence(prev => [...prev, word]);
    } else {
      setCurrentSentence(prev => {
        const index = prev.indexOf(word);
        if (index > -1) {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        }
        return prev;
      });
      setAvailableWords(prev => [...prev, word]);
    }
  };

  const handleReorderSubmit = () => {
    const q = questions[currentQIndex];
    const userSentence = currentSentence.join(' ');
    // Case-insensitive check to allow "nước mắm Phú Quốc" vs "Nước mắm Phú Quốc"
    const correct = userSentence.trim().toLowerCase() === (q.answer || '').trim().toLowerCase();
    setIsCorrect(correct);
    triggerResultAnimation(correct);
    if (correct) {
      audioService.play('CORRECT');
      setPoints(p => p + 20);
      setFeedback(`Tuyệt vời! ${q.explanation || 'Bạn đã sắp xếp đúng cấu trúc câu.'}`);
    } else {
      audioService.play('INCORRECT');
      setMistakes(prev => [...prev, q]);
      setFeedback(`Tiếc quá! ${q.explanation ? q.explanation : 'Trật tự đúng là: ' + q.answer}`);
    }
  };

  const handleGetHint = async () => {
    if (isHintLoading) return;
    audioService.play('CLICK');
    setIsHintLoading(true);
    const question = questions[currentQIndex];
    const prompt = `Gợi ý cho câu hỏi: "${question.prompt}". Đừng đưa ra đáp án trực tiếp, hãy đưa ra một manh mối văn hóa hoặc quy tắc ngôn ngữ giúp người dùng tự tìm ra câu trả lời.`;
    const response = await askAIGuide(prompt, `Người chơi đang ở chặng ${stage}, câu số ${currentQIndex + 1}.`);
    setHint(response || 'TenLing hiện không thể đưa ra gợi ý lúc này, hãy thử tự mình suy luận nhé!');
    setIsHintLoading(false);
    audioService.play('CHAT_OPEN');
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMCQ = (ans: string) => {
    setSelectedAnswer(ans);
    const question = questions[currentQIndex];
    const target = (question.correct_answer || question.answer).toString();
    const correct = ans === target || target.startsWith(ans) || (ans.length > 5 && target.includes(ans));
    setIsCorrect(correct);
    triggerResultAnimation(correct);
    if (correct) {
      audioService.play('CORRECT');
      setPoints(prev => prev + 10);
      setFeedback(`Tuyệt vời! ${question.explanation || 'Chính xác! 🎉'}`);
    } else {
      audioService.play('INCORRECT');
      setMistakes(prev => [...prev, question]);
      setFeedback(`Đừng nản lòng nhé! ${question.explanation ? question.explanation : 'Đáp án đúng là: ' + (question.correct_answer || question.answer)}`);
    }
  };

  const handleNext = () => {
    audioService.play('CLICK');
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setInputValue('');
      setIsCorrect(null);
      setFeedback('');
      setHint(null);
      setCurrentSentence([]);
      setAvailableWords([]);
      setClassAssignments({});
      setSelectedClassWord(null);
      setMultipleInputs({});
    } else {
      setIsFinished(true);
    }
  };

  const checkAnswer = () => {
    const question = questions[currentQIndex];
    if (question.game_type === 'fill_tone' && question.content) {
      const words = question.content.split(',').map(s => s.trim());
      const correctAnswers = (question.correct_answer as string).split(',').map(s => s.trim());
      const isAllMatch = words.every((word, idx) => {
        const userVal = multipleInputs[word]?.toLowerCase().trim();
        return userVal && (userVal === correctAnswers[idx].toLowerCase() || correctAnswers[idx].toLowerCase().includes(userVal));
      });
      setIsCorrect(isAllMatch);
      triggerResultAnimation(isAllMatch);
      if (isAllMatch) {
        audioService.play('CORRECT');
        setPoints(p => p + 25);
      } else {
        audioService.play('INCORRECT');
        setMistakes(prev => [...prev, question]);
      }
      return;
    }

    const target = (question.correct_answer || question.answer);
    const correct = inputValue.toLowerCase().trim().includes(target.toLowerCase()) || 
                    inputValue.toLowerCase().trim() === target.toLowerCase();
    setIsCorrect(correct);
    triggerResultAnimation(correct);
    if (correct) {
      audioService.play('CORRECT');
      setPoints(p => p + 15);
    } else {
      audioService.play('INCORRECT');
      setMistakes(prev => [...prev, question]);
    }
  };

  const handleErrorWordClick = (word: string) => {
    if (isCorrect !== null) return;
    const question = questions[currentQIndex];
    const target = (question.correct_answer as string).toLowerCase().trim();
    const errorTarget = question.error_word?.toLowerCase().trim();
    const cleanWord = word.replace(/[“”,.!]/g, '').toLowerCase().trim();
    const correct = cleanWord === target || (errorTarget && cleanWord === errorTarget);
    setIsCorrect(correct);
    triggerResultAnimation(correct);
    audioService.play(correct ? 'CORRECT' : 'INCORRECT');
    if (correct) setPoints(p => p + 15); else setMistakes(prev => [...prev, question]);
  };

  const handleClassificationSubmit = () => {
    const question = questions[currentQIndex];
    // For this educational game, we'll allow seeing the answer after some attempts 
    // or just check if all words are assigned. 
    // To keep it simple and robust, we'll mark it correct if they've tried to classify all.
    const words = (question.content || "").split(':').pop()?.split(',').map(s => s.trim()) || [];
    const isAllAssigned = words.every(w => classAssignments[w]);
    
    setIsCorrect(true); // Educational: reveal the correct classification mapping in feedback
    triggerResultAnimation(true);
    audioService.play('CORRECT');
    setPoints(p => p + 20);
    setFeedback(`Bạn đã hoàn thành phân loại! Hãy xem đáp án đúng bên dưới:\n\n${question.correct_answer}`);
  };

  const GameHeader = () => (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-start">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-sm font-bold border border-amber-200 transition-all shadow-sm active:scale-95 italic"
        >
          <span>←</span> <span>Thoát</span>
        </button>
        
        <div className="flex items-center gap-3">
           {!isFinished && (
             <button 
              onClick={handleGetHint}
              disabled={isHintLoading || isCorrect !== null}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border border-amber-200 text-xs font-bold transition-all active:scale-95 italic ${
                isHintLoading ? 'animate-pulse bg-amber-50 text-amber-400' : 'bg-amber-100 text-amber-700 hover:bg-amber-200 shadow-sm'
              }`}
             >
               {isHintLoading ? 'Đang nghĩ...' : '💡 Gợi ý'}
             </button>
           )}
        </div>
      </div>

      {!isFinished && (
        <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 flex items-center justify-center shadow-inner">
          <p className="text-sm font-black text-amber-900 italic flex items-center gap-2">
            “{stageNames[stage] || stage} – Câu {currentQIndex + 1}/{questions.length}”
          </p>
        </div>
      )}

      {stage === 'MINI_GAME' && !isFinished && (
        <div className="flex justify-center">
          <div className={`px-4 py-1 rounded-full border-2 font-bold transition-all ${timeLeft < 10 ? 'bg-red-100 border-red-500 text-red-600 animate-pulse' : 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm'}`}>
            ⏳ {timeLeft}s
          </div>
        </div>
      )}
    </div>
  );

  if (isFinished) {
    return (
      <div className="relative max-w-2xl mx-auto">
        {showConfetti && <Confetti />}
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-amber-200 text-center animate-screen-transition relative overflow-hidden">
          <div className="text-8xl mb-6 animate-bounce-refined">
            {stageIcons[stage] || '🎉'}
          </div>
          <h2 className="text-4xl font-black text-amber-900 mb-2 uppercase tracking-tight italic">
            {stage === 'MINI_GAME' ? '🎉 Bạn đã thắp sáng Hội An!' : '🎉 Hoàn thành!'}
          </h2>
          <p className="text-xl text-amber-700 italic mb-4">
            {stage === 'MINI_GAME' ? 'Thật tuyệt vời! Phố cổ đã rực rỡ ánh đèn.' : 'Bạn đã vượt qua chặng!'}
          </p>
          <div className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-6">✨ Rất tốt, tiếp tục phát huy nhé! ✨</div>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8 rounded-full"></div>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100 animate-glow-green">
              <p className="text-amber-600 text-xs font-black uppercase tracking-widest mb-1">Tổng điểm</p>
              <p className="text-4xl font-extrabold text-amber-900">⭐ {points}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100">
              <p className="text-amber-600 text-xs font-black uppercase tracking-widest mb-1">Số câu đúng</p>
              <p className="text-4xl font-extrabold text-amber-900">{questions.length - mistakes.length}/{questions.length}</p>
            </div>
          </div>

        {mistakes.length > 0 && !showMistakeReview && (
          <button 
            onClick={() => setShowMistakeReview(true)}
            className="w-full mb-4 py-4 bg-red-50 text-red-700 rounded-2xl font-black border-2 border-red-200 hover:bg-red-100 transition-all uppercase italic tracking-tighter"
          >
            Xem lại {mistakes.length} câu sai
          </button>
        )}

        {showMistakeReview && (
          <div className="mb-8 space-y-4 text-left">
            {mistakes.map((m, i) => (
              <div key={i} className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <p className="font-bold text-red-900 text-sm mb-1">{m.question || m.prompt}</p>
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                  <p className="text-xs font-bold text-green-700 uppercase mb-1">Đáp án đúng:</p>
                  <p className="text-green-800 font-bold italic">{m.correct_answer || m.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={() => onFinish(points)}
          className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-black shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition-all uppercase italic text-xl tracking-tighter border-b-8 border-amber-800"
        >
          Trở về Bản Đồ 🐉
        </button>
      </div>
    </div>
  );
}

  const q = questions[currentQIndex];
  const isInputType = (q.game_type === 'fill_blank' || q.type === 'SHORT_ANSWER') && q.game_type !== 'fill_tone';

  const handleLanternAnswer = (option: string) => {
    if (isCorrect !== null || isLanternLit || showCultureNote) return;
    
    const q = questions[currentQIndex];
    const correct = option === q.correct_answer;
    
    if (correct) {
      setIsLanternLit(true);
      audioService.play('CORRECT');
      setPoints(p => p + 20);
      setGameFeedback({ text: '💡 Chính xác!', icon: '✨', color: 'text-green-600' });
      
      setTimeout(() => {
        setShowCultureNote(true);
      }, 800);
    } else {
      audioService.play('INCORRECT');
      setGameFeedback({ text: '❌ Sai rồi!', icon: '💡', color: 'text-red-700' });
      const lantern = document.getElementById('active-lantern');
      if (lantern) {
        lantern.classList.add('animate-shake-refined');
        setTimeout(() => lantern.classList.remove('animate-shake-refined'), 500);
      }
      setTimeout(() => setGameFeedback(null), 1000);
    }
  };

  const handleNextLantern = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setIsLanternLit(false);
      setShowCultureNote(false);
      setGameFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  if (stage === 'MINI_GAME' && !isFinished) {
    const q = questions[currentQIndex];
    return (
      <div className="bg-orange-50 p-6 rounded-[2rem] shadow-2xl border-4 border-orange-200 w-full max-w-2xl mx-auto min-h-[640px] relative overflow-hidden flex flex-col animate-screen-transition">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6 z-20">
          <button onClick={onBack} className="px-4 py-2 bg-white text-orange-700 hover:bg-orange-50 rounded-xl text-sm font-black border-2 border-orange-100 transition-all shadow-sm active:scale-95 italic uppercase">← Thoát</button>
          <div className="text-center">
            <h3 className="text-2xl font-black text-orange-900 italic uppercase tracking-tighter flex items-center gap-2">
              🏮 THẮP ĐÈN ĐÚNG THANH 🏮
            </h3>
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest italic">Câu {currentQIndex + 1}/{questions.length}</p>
          </div>
          <div className="bg-orange-100 px-4 py-2 rounded-xl border-2 border-orange-200">
            <div className="text-orange-900 font-black text-sm uppercase italic">Điểm: <span className="text-xl">⭐{points}</span></div>
          </div>
        </div>

        {/* Lantern Area */}
        <div key={currentQIndex} className="flex-1 flex flex-col items-center justify-center relative pb-8">
          {/* Hanging Rope */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-amber-900 opacity-40"></div>
          
          <div 
            id="active-lantern"
            className={`lantern-shape ${isLanternLit ? 'lantern-lit-yellow' : 'animate-lantern-sway'} transition-all duration-500`}
            style={{ backgroundColor: currentQIndex % 3 === 0 ? '#ef4444' : currentQIndex % 3 === 1 ? '#f97316' : '#f59e0b' }}
          >
             <span className="text-white font-black text-2xl drop-shadow-md text-center px-4 leading-tight italic">
               {q.prompt}
             </span>
          </div>

          {/* Feedback Overlay */}
          {gameFeedback && !showCultureNote && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 animate-scale-punch pointer-events-none">
              <div className={`bg-white/95 backdrop-blur-md px-8 py-4 rounded-3xl shadow-2xl border-4 flex flex-col items-center gap-2 ${gameFeedback.color} border-current`}>
                <span className="text-5xl">{gameFeedback.icon}</span>
                <span className="text-2xl font-black uppercase italic tracking-tighter">{gameFeedback.text}</span>
              </div>
            </div>
          )}

          {/* Culture Note Overlay */}
          {showCultureNote && (
            <div className="absolute inset-x-0 bottom-0 z-40 animate-slideUp">
               <div className="bg-amber-50 border-t-4 border-amber-400 p-6 shadow-2xl rounded-t-3xl border-x-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">📖</div>
                    <div>
                      <h4 className="text-amber-900 font-black uppercase italic text-sm mb-1 tracking-tight underline decoration-amber-300">Chú thích văn hoá</h4>
                      <p className="text-amber-800 text-sm leading-relaxed font-medium italic">
                        {q.note}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleNextLantern}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-lg transform active:scale-95 transition-all uppercase italic tracking-tighter text-lg border-b-4 border-orange-700"
                  >
                    Tiếp tục →
                  </button>
               </div>
            </div>
          )}
        </div>

        {/* Options Area */}
        {!showCultureNote && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto mb-4 animate-fadeIn">
            {q.options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleLanternAnswer(opt)}
                disabled={isLanternLit}
                className={`py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-md border-b-4 active:border-b-0 active:translate-y-1 
                  ${isLanternLit ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-orange-900 border-orange-200 hover:bg-orange-50 hover:border-orange-300'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center opacity-60">
          <p className="text-[10px] text-orange-700 uppercase font-black tracking-widest italic">🏮 THẮP SÁNG HỘI AN – PHỐ CỔ LUNG LINH 🏮</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-8 rounded-3xl shadow-xl border border-amber-100 max-w-2xl mx-auto relative transition-all duration-300 ${isCorrect === false ? 'animate-shake-refined animate-blur-pop incorrect-container' : 'animate-screen-transition'}`}>
      {showBurst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          {isCorrect ? (
            <div className="text-8xl animate-icon-burst drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">💡</div>
          ) : (
            <div className="text-8xl animate-icon-burst drop-shadow-[0_0_10px_rgba(255,100,100,0.8)]">❌</div>
          )}
        </div>
      )}
      
      <GameHeader />

      <div key={currentQIndex} className="animate-screen-transition">
        <div className="mb-8">
          <div className="text-amber-800 text-xl font-black mb-4 uppercase italic">Câu {currentQIndex + 1}</div>
          
          <h2 className="text-xl font-bold text-amber-900 mb-6 whitespace-pre-line leading-relaxed">
            {q.question || q.prompt}
          </h2>

          {q.game_type === 'error_detection' && q.content && (
            <div className="mb-8 p-6 bg-amber-50 rounded-2xl border-2 border-amber-100 flex flex-wrap gap-2 justify-center shadow-inner">
              {q.content.replace(/[“”]/g, '').split(q.content.includes('|') ? '|' : ' ').map((word, i) => (
                <button
                  key={i}
                  onClick={() => !isCorrect && handleErrorWordClick(word)}
                  className={`px-3 py-2 rounded-xl border-2 font-bold transition-all hover:scale-105 active:scale-95 ${
                    isCorrect !== null ? (
                      word.replace(/[“”,.!]/g, '').toLowerCase().trim() === (q.correct_answer as string).toLowerCase().trim() || 
                      (q.error_word && word.replace(/[“”,.!]/g, '').toLowerCase().trim() === q.error_word.toLowerCase().trim())
                      ? 'bg-green-500 text-white border-green-600' : 'bg-white opacity-50 grayscale'
                    ) : 'bg-white border-amber-200 text-amber-900 border-b-4'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          )}

          {q.game_type === 'fill_tone' && (
            <div className="space-y-4 mb-8">
              {q.content?.split(',').map((word, i) => {
                const w = word.trim();
                return (
                  <div key={i} className="flex items-center gap-4 bg-amber-50 p-4 rounded-xl border-2 border-amber-100 shadow-sm animate-fadeIn">
                    <span className="font-bold text-amber-900 w-24">{w}:</span>
                    <input 
                      type="text" 
                      className="flex-1 p-2 rounded-lg border border-amber-300 outline-none focus:border-amber-500 shadow-inner"
                      value={multipleInputs[w] || ''}
                      onChange={(e) => setMultipleInputs(prev => ({ ...prev, [w]: e.target.value }))}
                      disabled={isCorrect !== null}
                      placeholder="..."
                    />
                  </div>
                );
              })}
              {isCorrect === null && (
                <button 
                  onClick={checkAnswer} 
                  className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 active:scale-95 transition-all shadow-md italic uppercase mt-4"
                >
                  KIỂM TRA
                </button>
              )}
            </div>
          )}

          {q.content && q.game_type !== 'error_detection' && q.game_type !== 'fill_tone' && q.game_type !== 'classification' && (
            <p className="text-lg text-amber-900 mb-6 font-medium italic p-4 bg-amber-50 rounded-xl border-2 border-amber-200 shadow-inner">
              {q.content}
            </p>
          )}

          {hint && (
            <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl shadow-sm animate-fadeIn">
              <p className="text-sm text-amber-900 italic">💡 {hint}</p>
            </div>
          )}

          {(q.game_type === 'multiple_choice' || q.game_type === 'correction' || q.game_type === 'fill_blank' || q.game_type === 'tone_recognition' || q.type === 'MCQ') && q.options && q.options.length > 0 && (
            <div className="grid grid-cols-1 gap-3">
              {(q.options || []).map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => !isCorrect && handleMCQ(opt)}
                  disabled={isCorrect !== null}
                  className={`p-4 rounded-2xl text-left border-2 transition-all transform active:scale-95 ${
                    selectedAnswer === opt 
                      ? (isCorrect ? 'bg-green-50 border-green-500 shadow-md scale-[1.01]' : 'bg-red-50 border-red-500')
                      : 'bg-white border-amber-50 hover:border-amber-200'
                  }`}
                >
                  <span className="mr-3 font-bold text-amber-400">{i + 1}.</span> {opt}
                </button>
              ))}
            </div>
          )}

          {q.game_type === 'classification' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center p-4 bg-amber-50 rounded-2xl border-2 border-amber-100">
                {(q.content?.split(':').pop()?.split(',') || []).map((w, i) => {
                  const cleaned = w.trim().replace('.', '');
                  if (!cleaned) return null;
                  return (
                    <button 
                      key={i} 
                      onClick={() => !isCorrect && setSelectedClassWord(cleaned)}
                      className={`px-4 py-2 rounded-xl font-bold shadow-sm transition-all border-2 ${
                        selectedClassWord === cleaned ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-amber-900 border-amber-200'
                      } ${classAssignments[cleaned] ? 'opacity-50 grayscale-[0.5] scale-90' : 'hover:scale-105 active:scale-95'}`}
                    >
                      {cleaned} {classAssignments[cleaned] && `→ ${classAssignments[cleaned].split(' ').pop()}`}
                    </button>
                  );
                })}
              </div>

              {selectedClassWord && !isCorrect && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn">
                  {[
                    { id: 1, name: 'Thanh Huyền' },
                    { id: 2, name: 'Thanh Sắc' },
                    { id: 3, name: 'Thanh Hỏi' },
                    { id: 4, name: 'Thanh Ngang' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setClassAssignments(prev => ({ ...prev, [selectedClassWord]: `Nhóm ${cat.id}: ${cat.name}` }));
                        setSelectedClassWord(null);
                        audioService.play('CLICK');
                      }}
                      className="p-3 bg-white border-2 border-amber-400 text-amber-800 rounded-xl font-bold hover:bg-amber-400 hover:text-white transition-all text-xs text-left"
                    >
                      Nhóm {cat.id}: {cat.name}
                    </button>
                  ))}
                </div>
              )}

              {isCorrect === null && Object.keys(classAssignments).length > 0 && (
                <button onClick={handleClassificationSubmit} className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-all shadow-md italic uppercase">HOÀN TẤT PHÂN LOẠI</button>
              )}
            </div>
          )}

          {isInputType && q.game_type !== 'fill_blank' && (
            <div className="space-y-4">
               <input 
                type="text" 
                className={`w-full p-4 rounded-xl bg-amber-50 border-2 outline-none transition-all shadow-inner italic ${isCorrect === true ? 'border-green-300' : isCorrect === false ? 'border-red-300' : 'border-amber-100 focus:border-amber-400'}`}
                placeholder="Nhập câu trả lời..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isCorrect !== null}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              />
              {isCorrect === null && (
                <button 
                  onClick={checkAnswer} 
                  className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 active:scale-95 transition-all shadow-md italic uppercase"
                >
                  KIỂM TRA
                </button>
              )}
            </div>
          )}

          {q.type === 'REORDER' && (
             <div className="space-y-6">
                <div className="min-h-[6rem] p-4 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 flex flex-wrap gap-2 items-center justify-center shadow-inner">
                  {currentSentence.map((word, idx) => (
                    <button key={idx} onClick={() => handleWordClick(word, false)} className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold shadow-md transition-all active:scale-90">{word}</button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 justify-center p-4">
                  {availableWords.map((word, idx) => (
                    <button key={idx} onClick={() => handleWordClick(word, true)} className="px-4 py-2 bg-white border-2 border-amber-200 text-amber-800 rounded-lg font-medium transition-all hover:bg-amber-50 active:scale-90">{word}</button>
                  ))}
                </div>
                {isCorrect === null && currentSentence.length > 0 && (
                  <button onClick={handleReorderSubmit} className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-all shadow-md italic uppercase">KIỂM TRA</button>
                )}
             </div>
          )}
        </div>

        {isCorrect !== null && (
          <div className={`mb-6 p-6 rounded-2xl shadow-xl border-2 transition-all duration-500 transform animate-screen-transition ${isCorrect ? 'bg-green-50 border-green-200 text-green-900 shadow-green-100 correct-container animate-bounce-refined' : 'bg-red-50 border-red-200 text-red-900 shadow-red-100 incorrect-container'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                {isCorrect ? '💡' : '❌'}
              </div>
              <p className="text-2xl font-black italic uppercase italic flex items-center gap-2">
                {isCorrect ? (
                  <><span>💡</span> Chính xác!</>
                ) : (
                  <><span>❌</span> Sai rồi!</>
                )}
              </p>
            </div>
            
            {!isCorrect && (
              <p className="font-bold text-amber-700 mb-4 animate-fadeIn flex items-center gap-2">
                <span>💪</span> Thử lại nhé!
              </p>
            )}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-black uppercase tracking-wider mb-1 opacity-70 italic">👉 Đáp án:</p>
                <p className="text-base font-bold italic">{q.correct_answer || q.answer}</p>
              </div>
              
              {q.explanation && (
                <div className="pt-2 border-t border-current border-opacity-20">
                  <p className="text-sm font-black uppercase tracking-wider mb-1 opacity-70 italic">👉 Giải thích:</p>
                  <p className="text-sm italic leading-snug">{q.explanation.replace('Giải thích:', '').replace('👉 Giải thích:', '').trim()}</p>
                </div>
              )}

              {q.note && (
                <div className="pt-2 border-t border-current border-opacity-20 animate-fadeIn">
                  <p className="text-sm font-black uppercase tracking-wider mb-1 opacity-70 italic">👉 Chú thích:</p>
                  <p className="text-sm italic leading-snug">{q.note.replace('Chú thích:', '').replace('👉 Chú thích:', '').replace('Chú thích văn hóa:', '').trim()}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {isCorrect !== null && (
          <button onClick={handleNext} className="w-full bg-amber-800 text-white font-bold py-4 rounded-2xl hover:bg-amber-900 shadow-lg mt-4 transform active:scale-95 transition-all italic uppercase">
            {currentQIndex === questions.length - 1 ? 'XEM KẾT QUẢ' : 'TIẾP TỤC'}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
