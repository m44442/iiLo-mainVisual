"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./AnimationTest.module.css";

const AnimationTest = () => {
  const missionHeaderRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showMissionText, setShowMissionText] = useState(false);

  useEffect(() => {
    let hasAnimated = false;

    const startAnimation = () => {
      setCurrentPhase(1);
      setTimeout(() => setCurrentPhase(3), 300);
      setTimeout(() => setCurrentPhase(4), 1000);
      setTimeout(() => setCurrentPhase(5), 1300);

      setTimeout(() => {
        setShowMissionText(true);
      }, 2000);

      setTimeout(() => {
        if (missionHeaderRef.current) {
          missionHeaderRef.current.style.animation =
            "float 3s ease-in-out infinite alternate";
        }
      }, 3000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            startAnimation();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    if (missionHeaderRef.current) {
      observer.observe(missionHeaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-[100px] bg-[#f0f0f0]">
      <h2 className="text-center mb-[50px] text-2xl font-bold">
        Animation Test
      </h2>
      <div
        className={`flex flex-col justify-center items-center mb-5 mt-5 relative ${styles.missionHeader}`}
        ref={missionHeaderRef}
      >
        <div
          className={`w-full h-[300px] flex items-center justify-center overflow-hidden relative mb-10 ${styles.iiloAnimationContainer}`}
        >
          {currentPhase === 1 && (
            <div className="relative">
              <div
                className={`${styles.afterimage1} absolute bg-black py-2 px-4 top-[-100px]`}
              >
                <div
                  className={`flex items-end gap-[20px] ${styles.compressedLogoContainer}`}
                >
                  <div
                    className={`${styles.compressedI1} bg-[#E7E7E7] mr-[20px]`}
                  />
                  <div
                    className={`${styles.compressedI2} bg-[#E7E7E7] mr-[20px]`}
                  />
                  <div
                    className={`${styles.compressedL} bg-[#E7E7E7] relative`}
                  />
                  <div className={`${styles.compressedO} ml-[-20px]`} />
                </div>
              </div>
              <div
                className={`${styles.afterimage2} absolute bg-black py-2 px-4 top-[-100px]`}
              >
                <div
                  className={`flex items-end gap-[20px] ${styles.compressedLogoContainer}`}
                >
                  <div
                    className={`${styles.compressedI1} bg-[#E7E7E7] mr-[20px]`}
                  />
                  <div
                    className={`${styles.compressedI2} bg-[#E7E7E7] mr-[20px]`}
                  />
                  <div
                    className={`${styles.compressedL} bg-[#E7E7E7] relative`}
                  />
                  <div className={`${styles.compressedO} ml-[-20px]`} />
                </div>
              </div>
              <div
                className={`${styles.mainSlide} absolute bg-black py-2 px-4 top-[-100px]`}
              >
                <div
                  className={`flex items-end gap-[20px] ${styles.compressedLogoContainer}`}
                >
                  <div
                    className={`${styles.compressedI1} bg-[#E7E7E7] mr-[20px]`}
                  />
                  <div
                    className={`${styles.compressedI2} bg-[#E7E7E7] mr-[20px]`}
                  />
                  <div
                    className={`${styles.compressedL} bg-[#E7E7E7] relative`}
                  />
                  <div className={`${styles.compressedO} ml-[-20px]`} />
                </div>
              </div>
            </div>
          )}

          {currentPhase === 3 && (
            <div className={`relative ${styles.phase3Container}`}>
              <div className={styles.effectsContainer}>
                <div className={styles.effectLine1}></div>
                <div className={styles.effectLine2}></div>
                <div className={styles.effectCircle1}></div>
                <div className={styles.effectLine3}></div>
                <div className={styles.effectLine4}></div>
                <div className={styles.effectCircle2}></div>
                <div className={styles.effectLine5}></div>
                <div className={styles.effectLine6}></div>
                <div className={styles.effectLine7}></div>
                <div className={styles.effectCircle3}></div>
              </div>
              <div
                className={`flex items-end gap-[20px] ${styles.lettersContainer}`}
              >
                <div className={styles.letterI1}></div>
                <div className={styles.letterI2}></div>
                <div className={styles.letterL}></div>
                <div className={styles.letterO}></div>
              </div>
            </div>
          )}

          {currentPhase === 4 && (
            <div
              className={`scale-100 transition-transform duration-500 ease-in-out ${styles.phase4Container}`}
            >
              <div
                className={`flex items-end gap-[20px] ${styles.normalLogoContainer}`}
              >
                <div className={styles.normalI1}></div>
                <div className={styles.normalI2}></div>
                <div className={styles.normalL}></div>
                <div className={styles.normalO}></div>
              </div>
            </div>
          )}

          {currentPhase === 5 && (
            <div
              className={`flex items-end gap-[20px] ${styles.phase5Container} ${styles.finalLetters}`}
            >
              <div className={styles.letterSplitI1}>
                <div className={styles.splitLeftI1}></div>
                <div className={styles.splitRightI1}></div>
              </div>
              <div className={styles.letterSplitI2}>
                <div className={styles.splitLeftI2}></div>
                <div className={styles.splitRightI2}></div>
              </div>
              <div className={styles.letterSplitL}>
                <div className={styles.splitLeftL}></div>
                <div className={styles.splitRightL}></div>
              </div>
              <div className={styles.letterSplitO}>
                <div className={styles.splitLeftO}></div>
                <div className={styles.splitRightO}></div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`absolute left-0 right-0 top-[270px] ${styles.missionTextContainer}`}
        >
          <div
            className={`font-bold text-[30px] text-black tracking-[0.5px] mb-[3px] text-left ml-[510px] mt-[-10px] font-sans ${showMissionText ? styles.fadeInUp : styles.hiddenText} ${styles.missionSubtitle}`}
          >
            イーロの
          </div>
          <div
            className={`font-bold text-[40px] text-black tracking-[1px] text-left ml-[685px] mt-[-10px] font-sans ${showMissionText ? styles.fadeInUp : styles.hiddenText} ${styles.missionMainTitle}`}
          >
            Mission
            <span
              className={`text-[48px] ${showMissionText ? styles.fadeInUp : styles.hiddenText} ${styles.missionTitleSmall}`}
            >
              は
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationTest;
