"use client";

import React, { useState, useEffect, useRef } from 'react';

interface MorphingTextProps {
  targetText: string;
  speed?: number;
  autoStart?: boolean;
  className?: string;
  chars?: string;
  incrementRate?: number;
  onComplete?: () => void;
}

const MorphingText: React.FC<MorphingTextProps> = ({
  targetText,
  speed = 50,
  autoStart = true,
  className = '',
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>?!',
  incrementRate = 1/3,
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
  
  const startMorphing = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let iteration = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) return targetText[index];
            return getRandomChar();
          })
          .join('')
      );
      
      if (iteration >= targetText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(targetText);
        setIsAnimating(false);
        if (onComplete) onComplete();
      }
      
      iteration += incrementRate;
    }, speed);
  };
  
  useEffect(() => {
    if (autoStart) {
      // 初期ランダム文字を設定して即座に開始
      setDisplayText(targetText.split('').map(() => getRandomChar()).join(''));
      startMorphing();
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetText, autoStart]);
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  return (
    <span className={className}>
      {displayText || targetText}
    </span>
  );
};

export default MorphingText;