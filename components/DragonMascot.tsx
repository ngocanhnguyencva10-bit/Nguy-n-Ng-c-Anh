
import React from 'react';
import { motion } from 'framer-motion';

interface DragonMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const DragonMascot: React.FC<DragonMascotProps> = ({ 
  size = 'md', 
  className = '', 
  animate = true 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Vietnamese Dragon (Ly Dynasty style) - Serpentine, elegant, red/gold
  // Using a high-quality illustration representation
  const dragonUrl = "https://raw.githubusercontent.com/anhnguyen-cva/vn-heritage-assets/main/red-dragon-vn.png";
  // Fallback to a well-known silhouette if needed, but I'll use a red-styled dragon icon/emoji if the URL is risky.
  // Actually, I'll use a combinación of motion and styling on a high-quality dragon image.
  
  return (
    <motion.div 
      className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}
      animate={animate ? {
        y: [0, -8, 0],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/3697/3697960.png" 
        alt="Vietnamese Red Dragon" 
        className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
        referrerPolicy="no-referrer"
      />
      {/* Golden accents/sparkles */}
      <motion.div 
        className="absolute -top-1 -right-1 text-yellow-500 text-xs"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};
