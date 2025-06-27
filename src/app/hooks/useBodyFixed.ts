"use client";

import { useState, useEffect } from "react";

export const useBodyFixed = () => {
  const [bodyFixed, setBodyFixed] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    // iOS判定（より確実な方法）
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (bodyFixed) {
      if (isIOS) {
        // iOS: positionを使った方法
        setScrollPosition(window.pageYOffset);
        body.style.position = "fixed";
        body.style.top = `-${window.pageYOffset}px`;
        body.style.width = "100%";
      } else {
        // その他: overflowを使った方法
        body.style.overflow = "hidden";
      }
    } else {
      if (isIOS) {
        // iOS: 元の位置に戻す
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
      } else {
        // その他: overflowを戻す
        body.style.removeProperty("overflow");
      }
    }

    // クリーンアップ関数
    return () => {
      if (isIOS) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("width");
      } else {
        body.style.removeProperty("overflow");
      }
    };
  }, [bodyFixed, scrollPosition]);

  return { bodyFixed, setBodyFixed };
};