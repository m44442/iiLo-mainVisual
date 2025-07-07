"use client";

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const X_LINES = 60;
const INITIAL_WIDTH = 40;

// セクション情報の定義
const SECTIONS = [
  { id: 'hero', isDark: false },
  { id: 'mission', isDark: false },
  { id: 'service', isDark: true },    // 黒背景
  { id: 'recruit', isDark: false },
  { id: 'company', isDark: false },
  { id: 'news', isDark: true },       // 黒背景
  { id: 'contact', isDark: true },    // 黒背景
];

const ScrollWaveBars: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  // 初期化とリサイズ対応
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // 指定された縦位置のセクションが黒背景かどうかを判定
  const getSectionAtPosition = (yPosition: number): boolean => {
    if (typeof window === 'undefined') return false; // SSR対応
    
    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (yPosition >= rect.top && yPosition <= rect.bottom) {
          return section.isDark;
        }
      }
    }
    return false; // デフォルトは明るい背景
  };

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
          paddingRight: '0',
        }}
      >
        {Array.from({ length: X_LINES }).map((_, i) => {
          const percentilePosition = (i + 1) / X_LINES;
          const width = INITIAL_WIDTH / 4 + 80 * Math.cos(((percentilePosition - scrollY) * Math.PI) / 1.5) ** 32;
          
          // 各バーの縦位置を計算
          const barVerticalPosition = (i / X_LINES) * windowHeight;
          
          // その位置のセクションが黒背景かどうかで色を決定
          const isDarkSection = windowHeight > 0 ? getSectionAtPosition(barVerticalPosition) : false;
          const barColor = isDarkSection 
            ? 'rgba(255, 255, 255, 1)'    // 真っ白
            : 'rgba(0, 0, 0, 1)';         // 真っ黒
          
          return (
            <div
              key={i}
              style={{
                height: '1vh',
                width: `${Math.max(width, 5)}px`,
                backgroundColor: barColor,
                transition: 'background-color 0.3s ease-out',
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
          paddingLeft: '0',
        }}
      >
        {Array.from({ length: X_LINES }).map((_, i) => {
          const percentilePosition = 1 - (i + 1) / X_LINES;
          const width = INITIAL_WIDTH / 4 + 80 * Math.cos(((percentilePosition - scrollY) * Math.PI) / 1.5) ** 32;
          
          // 各バーの縦位置を計算
          const barVerticalPosition = (i / X_LINES) * windowHeight;
          
          // その位置のセクションが黒背景かどうかで色を決定
          const isDarkSection = windowHeight > 0 ? getSectionAtPosition(barVerticalPosition) : false;
          const barColor = isDarkSection 
            ? 'rgba(255, 255, 255, 1)'    // 真っ白
            : 'rgba(0, 0, 0, 1)';         // 真っ黒
          
          return (
            <div
              key={i}
              style={{
                height: '1vh',
                width: `${Math.max(width, 5)}px`,
                backgroundColor: barColor,
                transition: 'background-color 0.3s ease-out',
              }}
            />
          );
        })}
      </animated.div>
    </div>
  );
};

export default ScrollWaveBars;