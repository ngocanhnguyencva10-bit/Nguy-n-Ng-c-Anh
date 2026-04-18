
import React from 'react';

interface AvatarPreviewProps {
  imageUrl: string;
  size?: number;
  className?: string;
}

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({ imageUrl, size = 150, className = '' }) => {
  const isEmoji = (str: string) => {
    return /\p{Emoji}/u.test(str) && str.length <= 4;
  };

  return (
    <div 
      className={`relative rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-amber-50 ${className}`}
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        isEmoji(imageUrl) ? (
          <span style={{ fontSize: size * 0.6 }}>{imageUrl}</span>
        ) : (
          <img 
            src={imageUrl} 
            alt="Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )
      ) : (
        <div className="text-amber-200">
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 fill-current">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}
    </div>
  );
};
