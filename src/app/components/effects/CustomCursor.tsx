'use client'

import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // クリック可能な要素にホバーした時にアクティブ状態にする
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.style.cursor === 'pointer' ||
          target.closest('a') ||
          target.closest('button') ||
          target.hasAttribute('onclick') ||
          getComputedStyle(target).cursor === 'pointer') {
        setIsActive(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // クリック可能な要素から離れた時にアクティブ状態を解除
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.style.cursor === 'pointer' ||
          target.closest('a') ||
          target.closest('button') ||
          target.hasAttribute('onclick') ||
          getComputedStyle(target).cursor === 'pointer') {
        setIsActive(false);
      }
    };

    // イベントリスナーを追加
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // クリーンアップ
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isActive ? 'active' : ''}`}
    />
  );
};

export default CustomCursor;