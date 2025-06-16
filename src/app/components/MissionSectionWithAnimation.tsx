'use client'

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './IiLoCorporateSite.module.css';

const MissionSectionWithAnimation = () => {
  const router = useRouter();
  
  const missionSectionRef = useRef<HTMLElement>(null);
  const missionSubtitleRef = useRef<HTMLDivElement>(null);
  const missionMainTitleRef = useRef<HTMLDivElement>(null);
  const missionTitleSmallRef = useRef<HTMLSpanElement>(null);
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
          missionHeaderRef.current.style.animation = 'float 3s ease-in-out infinite alternate';
        }
      }, 3000);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          startAnimation();
          observer.disconnect();
        }
      });
    }, { 
      threshold: 0.7
    });

    if (missionHeaderRef.current) {
      observer.observe(missionHeaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission" className={styles.section} ref={missionSectionRef}>
      <div className={styles.container1024}>
        <div className={styles.missionHeader} ref={missionHeaderRef}>
          <div className={styles.iiloAnimationContainer}>
            {currentPhase === 1 && (
              <div className={styles.phase1Container}>
                <div className={styles.afterimage1}>
                  <div className={styles.compressedLogoContainer}>
                    <div className={styles.compressedI1}></div>
                    <div className={styles.compressedI2}></div>
                    <div className={styles.compressedL}></div>
                    <div className={styles.compressedO}></div>
                  </div>
                </div>
                <div className={styles.afterimage2}>
                  <div className={styles.compressedLogoContainer}>
                    <div className={styles.compressedI1}></div>
                    <div className={styles.compressedI2}></div>
                    <div className={styles.compressedL}></div>
                    <div className={styles.compressedO}></div>
                  </div>
                </div>
                <div className={styles.mainSlide}>
                  <div className={styles.compressedLogoContainer}>
                    <div className={styles.compressedI1}></div>
                    <div className={styles.compressedI2}></div>
                    <div className={styles.compressedL}></div>
                    <div className={styles.compressedO}></div>
                  </div>
                </div>
              </div>
            )}

            {currentPhase === 3 && (
              <div className={styles.phase3Container}>
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
                
                <div className={styles.lettersContainer}>
                  <div className={styles.letterI1}></div>
                  <div className={styles.letterI2}></div>
                  <div className={styles.letterL}></div>
                  <div className={styles.letterO}></div>
                </div>
              </div>
            )}

            {currentPhase === 4 && (
              <div className={styles.phase4Container}>
                <div className={styles.normalLogoContainer}>
                  <div className={styles.normalI1}></div>
                  <div className={styles.normalI2}></div>
                  <div className={styles.normalL}></div>
                  <div className={styles.normalO}></div>
                </div>
              </div>
            )}

            {currentPhase === 5 && (
              <div className={styles.phase5Container}>
                <div className={styles.finalLetters}>
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
              </div>
            )}
          </div>
          
          <div className={styles.missionTextContainer}>
            <div className={`${styles.missionSubtitle} ${showMissionText ? styles.fadeInUp : styles.hiddenText}`} ref={missionSubtitleRef}>イーロの</div>
            <div className={`${styles.missionMainTitle} ${showMissionText ? styles.fadeInUp : styles.hiddenText}`} ref={missionMainTitleRef}>Mission<span className={`${styles.missionTitleSmall} ${showMissionText ? styles.fadeInUp : styles.hiddenText}`} ref={missionTitleSmallRef}>は</span></div>
          </div>
        </div>
        
        <div className={styles.missionCircleContainer}>
          <div className={`${styles.missionCircleRow} ${styles.missionCircleDesktop}`}>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>AI</div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                Web<br />アプリケーション<br />開発
              </div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                クラウド<br />インフラ
              </div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                セキュリティ・<br />プライバシー設計
              </div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                API・<br />外部連携基盤
              </div>
            </div>
          </div>
          
          <div className={`${styles.missionCircleMobile}`}>
            <div className={`${styles.missionCircleRow} ${styles.missionCircleRowTop}`}>
              <div className={styles.missionCircle}>
                <div className={styles.missionCircleText}>AI</div>
              </div>
              <div className={styles.missionCircle}>
                <div className={styles.missionCircleText}>
                  Web<br />アプリケーション<br />開発
                </div>
              </div>
            </div>
            <div className={`${styles.missionCircleRow} ${styles.missionCircleRowBottom}`}>
              <div className={styles.missionCircle}>
                <div className={styles.missionCircleText}>
                  クラウド<br />インフラ
                </div>
              </div>
              <div className={styles.missionCircle}>
                <div className={styles.missionCircleText}>
                  セキュリティ・<br />プライバシー設計
                </div>
              </div>
              <div className={styles.missionCircle}>
                <div className={styles.missionCircleText}>
                  API・<br />外部連携基盤
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.missionCatchphrase}>
          <h3 className={styles.missionCatchphraseText}>
            すべての業界に<br />
            "もうひとりのAIスタッフ"を提供する
          </h3>
        </div>
        
        <div className={styles.missionDescription}>
          <p className={styles.missionParagraph}>
            IILo（イーロ）は、AI・Web技術・クラウドインフラを用いて、<br />
            業界特化型のスマートSaaSを開発・提供するテクノロジーカンパニーです。
          </p>
          
          <p className={styles.missionParagraph}>
            私たちは、現場で本当に使われるプロダクトにこだわり、<br />
            医療・教育・店舗業などの現場に寄り添ったプロダクト設計を行っています。
          </p>
          
          <p className={styles.missionParagraph}>
            第一弾として、歯科業界に特化したLINE連携型SaaS「DiiLo（ディーロ）」をリリース。
          </p>
          
          <p className={styles.missionParagraph}>
            今後も、現場に根ざしたテクノロジーを届けることで、<br />
            すべての業界に"もうひとりのAIスタッフ"を提供することを目指しています。
          </p>
        </div>
        
        <div className={styles.missionFooter}>
          <a href="/mission">
            <button type="button" className={styles.missionButton}>
              More
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MissionSectionWithAnimation;