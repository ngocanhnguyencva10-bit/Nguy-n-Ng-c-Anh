
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AvatarPreview } from './AvatarPreview';

interface AvatarSelectorProps {
  onSelect: (imageUrl: string) => void;
  username: string;
  onUsernameChange: (name: string) => void;
  onConfirm: () => void;
  selectedImageUrl: string;
}

export const AvatarCustomizer: React.FC<AvatarSelectorProps> = ({ 
  onSelect, 
  username, 
  onUsernameChange, 
  onConfirm,
  selectedImageUrl 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto p-4 animate-screen-transition gap-8 overflow-hidden">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-6xl opacity-10 blur-[1px] animate-floating-slow">🐉</div>
        <div className="absolute top-[60%] left-[10%] text-7xl opacity-10 blur-[2px] animate-floating">🏮</div>
        <div className="absolute top-[20%] right-[10%] text-8xl opacity-10 blur-[3px] animate-floating-slow" style={{ animationDelay: '-2s' }}>🛶</div>
        <div className="absolute bottom-[15%] right-[5%] text-7xl opacity-10 blur-[1px] animate-floating" style={{ animationDelay: '-4s' }}>🏯</div>
        <div className="absolute top-[45%] left-[80%] text-5xl opacity-10 blur-[4px] animate-floating-slow" style={{ animationDelay: '-1s' }}>🍜</div>
        <div className="absolute bottom-[40%] left-[15%] text-6xl opacity-10 blur-[2px] animate-floating" style={{ animationDelay: '-3s' }}>🌸</div>
        <div className="absolute top-[5%] right-[25%] text-5xl opacity-5 blur-[5px] animate-floating">🎋</div>
      </div>

      <div className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border border-white w-full text-center space-y-8 relative z-10">
        <h2 className="text-3xl font-black text-amber-900 uppercase tracking-tighter leading-tight">Đăng nhập</h2>
        
        <div className="max-w-md mx-auto space-y-3">
          <label className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] block text-left ml-2">Tên của bạn</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Nhập tên của bạn..." 
            className="w-full px-8 py-4 rounded-3xl bg-amber-50/50 border-2 border-amber-100 focus:border-amber-500 outline-none transition-all shadow-inner font-extrabold text-amber-900 text-lg"
          />
        </div>

        <div className="flex flex-col items-center gap-6 py-4">
          <div 
            onClick={triggerFileUpload}
            className="cursor-pointer group relative"
          >
            <AvatarPreview imageUrl={selectedImageUrl} size={220} />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm uppercase tracking-widest">
              Thay đổi ảnh
            </div>
            {!selectedImageUrl && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-amber-500 text-white p-2 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </span>
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <button 
            onClick={triggerFileUpload}
            className="text-amber-700 font-bold text-sm uppercase tracking-widest hover:text-amber-900 transition-colors flex items-center gap-2"
          >
            <span>🐉📸</span> Bạn hãy tải lên ảnh đại diện
          </button>
        </div>

        <div className="pt-4">
          <button 
            onClick={onConfirm}
            disabled={!username.trim() || !selectedImageUrl}
            className="group relative overflow-hidden bg-red-700 text-white font-black py-5 px-16 rounded-[2rem] hover:bg-red-800 transition-all shadow-xl active:scale-95 text-xl uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-red-900"
          >
            <span className="relative z-10">Bắt đầu hành trình</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          {!selectedImageUrl && username.trim() && (
            <p className="mt-4 text-xs text-amber-800/60 font-medium">Vui lòng tải ảnh lên để tiếp tục</p>
          )}
        </div>
      </div>
      
      <p className="text-amber-800/60 font-bold text-sm uppercase tracking-widest">
        Khám phá văn hóa Việt Nam cùng <span className="text-red-600">TenLing</span>
      </p>
    </div>
  );
};
