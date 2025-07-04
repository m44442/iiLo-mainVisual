"use client";

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const X_LINES = 40;
const INITIAL_WIDTH = 20;

const ScrollWaveBars: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // スクロール検知とタイムアウト管理
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(currentScrollY / maxScroll, 1);
      
      setScrollY(scrollProgress);
      setIsScrolling(true);

      // 既存のタイムアウトをクリア
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // 500ms後にスクロール停止と判定
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
      
      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // バー表示/非表示のアニメーション
  const [barContainerStyles] = useSpring(() => ({
    opacity: isScrolling ? 1 : 0,
    config: { tension: 280, friction: 20 }
  }), [isScrolling]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* 左側のバー */}
      <animated.div 
        style={{
          ...barContainerStyles,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingRight: '2vw',
        }}
      >
        {Array.from({ length: X_LINES }).map((_, i) => {
          const percentilePosition = (i + 1) / X_LINES;
          const width = INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - scrollY) * Math.PI) / 1.5) ** 32;
          
          return (
            <div
              key={i}
              style={{
                height: '1vh',
                width: `${Math.max(width, 5)}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                transition: 'width 0.1s ease-out',
              }}
            />
          );
        })}
      </animated.div>

      {/* 右側のバー（反転） */}
      <animated.div 
        style={{
          ...barContainerStyles,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingLeft: '2vw',
        }}
      >
        {Array.from({ length: X_LINES }).map((_, i) => {
          const percentilePosition = 1 - (i + 1) / X_LINES;
          const width = INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - scrollY) * Math.PI) / 1.5) ** 32;
          
          return (
            <div
              key={i}
              style={{
                height: '1vh',
                width: `${Math.max(width, 5)}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                transition: 'width 0.1s ease-out',
              }}
            />
          );
        })}
      </animated.div>
    </div>
  );
};

export default ScrollWaveBars;