"use client";

import { useEffect, useRef } from "react";

let lockCount = 0;

export const useScrollLock = (isLocked: boolean) => {
  const wasLocked = useRef(false);

  useEffect(() => {
    if (isLocked && !wasLocked.current) {
      lockCount++;
      wasLocked.current = true;
      
      if (lockCount === 1) {
        // 最初のロック - スクロール無効化
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }
    } else if (!isLocked && wasLocked.current) {
      lockCount = Math.max(0, lockCount - 1);
      wasLocked.current = false;
      
      if (lockCount === 0) {
        // 最後のアンロック - スクロール有効化
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
    }

    // アンマウント時のクリーンアップ
    return () => {
      if (wasLocked.current) {
        lockCount = Math.max(0, lockCount - 1);
        wasLocked.current = false;
        
        if (lockCount === 0) {
          document.body.style.overflow = "auto";
          document.documentElement.style.overflow = "auto";
        }
      }
    };
  }, [isLocked]);
};