
import React, { useState, useRef, useEffect } from 'react';
import { askAIGuide } from '../services/gemini';
import { audioService } from '../services/audio';
import { DragonMascot } from './DragonMascot';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Chào bạn! Mình là TenLing, người hộ vệ tri thức Di sản Việt. Hãy để mình dẫn dắt bạn qua những vùng đất huyền thoại của dải đất hình chữ S nhé!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    audioService.play('CHAT_OPEN');
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    audioService.play('CLICK');
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askAIGuide(userMsg, "Người chơi đang tự do đặt câu hỏi về kiến thức văn hóa di sản và ngôn ngữ Việt Nam.");
    setMessages(prev => [...prev, { role: 'bot', text: response || 'Lỗi kết nối AI.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-amber-300 animate-fadeIn">
          <div className="bg-amber-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <DragonMascot size="sm" className="bg-white rounded-full p-1" animate={false} />
              <div>
                <span className="font-bold block text-sm">TenLing - AI Guide</span>
                <span className="text-[10px] opacity-80 uppercase tracking-widest">Hộ Thần Di Sản</span>
              </div>
            </div>
            <button onClick={toggleChat} className="hover:bg-amber-700 rounded-full p-2 transition-colors">✕</button>
          </div>
          
          <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-amber-50/50 backdrop-blur-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-tr-none shadow-lg' 
                    : 'bg-white text-gray-800 shadow-md rounded-tl-none border border-amber-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-600 animate-pulse font-bold italic">
                <span className="text-xl">📜</span> TenLing đang tra cứu bí tịch di sản...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-amber-100 bg-white flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi về đặc sản, làng nghề, ngữ pháp..."
              className="flex-1 bg-amber-50 border-2 border-amber-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-amber-600 text-white rounded-2xl px-4 hover:bg-amber-700 transition-all shadow-md disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={toggleChat}
          className="bg-amber-600 text-white p-3 rounded-full shadow-2xl hover:scale-110 hover:rotate-3 transition-all flex items-center gap-3 border-2 border-white group"
        >
          <span className="text-2xl group-hover:animate-bounce">🐉</span>
          <span className="font-bold hidden md:inline pr-2">Hỏi TenLing về Di Sản</span>
        </button>
      )}
    </div>
  );
};
