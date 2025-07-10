"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import styles from "./AnimationTest.module.css";
import pictFlowStyles from "./MissionSectionWithAnimation.module.css";

interface MissionSectionWithAnimationProps {
  showMoreButton?: boolean;
  onMissionMoreClick?: () => void;
  isInModal?: boolean;
}

const MissionSectionWithAnimation: React.FC<
  MissionSectionWithAnimationProps
> = ({ showMoreButton = true, onMissionMoreClick, isInModal = false }) => {
  const router = useRouter();

  const missionSectionRef = useRef<HTMLElement>(null);
  const missionHeaderRef = useRef<HTMLDivElement>(null);

  const [currentPhase, setCurrentPhase] = useState(0);
  const [showMissionText, setShowMissionText] = useState(false);
  const [showPictFlow, setShowPictFlow] = useState(false);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [hasMoreButtonAnimated, setHasMoreButtonAnimated] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [hasTextAnimated, setHasTextAnimated] = useState(false);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
        setShowPictFlow(true);
      }, 2500);

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
        threshold: isInModal ? 0.3 : 0.7,
        root: isInModal ? (missionHeaderRef.current?.closest('.overflow-y-auto') as Element) || null : null,
      }
    );

    if (missionHeaderRef.current) {
      observer.observe(missionHeaderRef.current);
    }

    return () => observer.disconnect();
  }, [isInModal]);

  // テキストアニメーション用のIntersectionObserver（テキスト要素監視）
  useEffect(() => {
    if (!textRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTextAnimated) {
            setIsTextVisible(true);
            setHasTextAnimated(true);
            setTimeout(() => {
              setIsMoreButtonVisible(true);
              setHasMoreButtonAnimated(true);
            }, 500);
          }
        });
      },
      {
        threshold: 0,
        root: isInModal ? (textRef.current?.closest('.overflow-y-auto') as Element) || null : null,
        rootMargin: isInModal ? '0px 0px 50px 0px' : '0px 0px 100px 0px',
      }
    );

    observer.observe(textRef.current);

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasTextAnimated, isInModal]);


  return (
    <section
      id="mission"
      className="py-20 px-6 bg-[#E7E7E7] m-0 lg:py-[60px] lg:px-4 md:py-10 md:px-3 max-md:py-8 max-md:px-4"
      ref={missionSectionRef}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          className={`flex flex-col justify-center items-center mb-5 mt-5 relative lg:mt-10 lg:mb-5 max-md:mt-8 max-md:mb-4`}
          ref={missionHeaderRef}
        >
          <div
            className={`w-full h-[300px] flex items-center justify-center overflow-hidden relative mb-10 md:h-[200px] md:mb-[10px] max-[480px]:h-[150px] max-[480px]:mb-[8px] ${styles.iiloAnimationContainer}`}
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
            className={`w-full flex flex-col items-start md:items-center lg:mt-[-90px] lg:mb-10`}>
            <div
              className={`font-bold text-[30px] lg:ml-[-240px] lg:text-[38px] text-black tracking-[0.5px] mb-[3px] mt-[-10px] font-sans m md:font-bold max-md:text-4xl max-md:ml-9 ${showMissionText ? styles.fadeInUp : styles.hiddenText}`}
            >
              イーロの
            </div>
            <div
              className={`lg:font-semibold lg:text-[50px] lg:ml-40 lg:mt-[-10px] text-black tracking-[1px] max-md:mt-[10px] font-sans max-md:text-semibold max-md:text-5xl max-md:mb-10 max-md:ml-28 ${showMissionText ? styles.fadeInUp : styles.hiddenText}`}
            >
              Missionは
            </div>
          </div>
        </div>

        {/* PictFlow アニメーション - PC/タブレット版 */}
        <div className="hidden md:block relative mt-20 lg:mt-10 lg:px-4">
          <div className={pictFlowStyles.pict} data-shown={showPictFlow ? "1" : "0"}>
            <div className={pictFlowStyles["pict-flow-wrap"]} style={{ position: "relative", height: "350px", width: "100%" }}>
              {[
                { text: "AI" },
                { text: "Web\nアプリケーション\n開発" },
                { text: "クラウド\nインフラ" },
                { text: "セキュリティ・\nプライバシー設計" },
                { text: "API・\n外部連携基盤" },
              ].map((item, i) => {
                const total = 5;
                const baseLeft = 50;
                const spacing = 210;
                const offset = (i - (total - 1) / 2) * spacing;
                return (
                  <div
                    key={i}
                    className={pictFlowStyles["pict-flow"]}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: `calc(${baseLeft}% + ${offset}px)`,
                      transform: "translate(-50%, -50%)",
                      width: "270px",
                      height: "270px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      viewBox="0 0 840 840"
                      width="270"
                      height="270"
                      style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    >
                      <circle
                        cx="420"
                        cy="420"
                        r="350"
                        className={pictFlowStyles.animatedPath}
                        transform="rotate(-90 420 420)"
                      />
                    </svg>
                    <div
                      className={pictFlowStyles["pict-flow-txt"]}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="o">
                        <div className={`${pictFlowStyles.t} text-black font-bold text-lg text-center whitespace-pre-line`}>
                          {item.text}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className={pictFlowStyles["pict-flow-arrow"]}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: "100%",
                  transform: "translateY(-50%)",
                  zIndex: 0,
                }}
              >
                <div className={pictFlowStyles["pict-flow-arrow-body"]}>
                  <svg viewBox="0 0 2811.84 52.39" width="100%" height="52">
                    <path className="cls-1" d="M3.75,26.2H2803.34" />
                    <path className="cls-2" d="M2783.64,6.5l19.7,19.7-19.7,19.69" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PictFlow アニメーション - スマホ版 */}
        <div className="block md:hidden relative mt-[-60px]">
          <div className={pictFlowStyles.pict} data-shown={showPictFlow ? "1" : "0"}>
            <div className={pictFlowStyles["pict-flow-wrap"]} style={{ position: "relative", height: "400px", width: "100%" }}>
              {/* 上段 2個の円 */}
              {[
                { text: "AI" },
                { text: "Web\nアプリケーション\n開発" },
              ].map((item, i) => {
                const spacing = 108;
                const xPosition = (i - 0.5) * spacing;
                return (
                  <div
                    key={i}
                    className={pictFlowStyles["pict-flow"]}
                    style={{
                      position: "absolute",
                      top: "calc(50% - 55px)",
                      left: "50%",
                      transform: `translate(calc(-50% + ${xPosition}px), -50%)`,
                      width: "140px",
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      viewBox="0 0 840 840"
                      width="140"
                      height="140"
                      style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    >
                      <circle
                        cx="420"
                        cy="420"
                        r="350"
                        className={pictFlowStyles.animatedPath}
                        transform="rotate(-90 420 420)"
                      />
                    </svg>
                    <div
                      className={pictFlowStyles["pict-flow-txt"]}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="o">
                        <div className={`${pictFlowStyles.t} text-black font-medium text-[10px] text-center whitespace-pre-line`}>
                          {item.text}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* 下段 3個の円 */}
              {[
                { text: "クラウド\nインフラ" },
                { text: "セキュリティ・\nプライバシー設計" },
                { text: "API・\n外部連携基盤" },
              ].map((item, i) => {
                const spacing = 108;
                const xPosition = (i - 1) * spacing;
                return (
                  <div
                    key={i + 2}
                    className={pictFlowStyles["pict-flow"]}
                    style={{
                      position: "absolute",
                      top: "calc(50% + 40px)",
                      left: "50%",
                      transform: `translate(calc(-50% + ${xPosition}px), -50%)`,
                      width: "140px",
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      viewBox="0 0 840 840"
                      width="140"
                      height="140"
                      style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    >
                      <circle
                        cx="420"
                        cy="420"
                        r="350"
                        className={pictFlowStyles.animatedPath}
                        transform="rotate(-90 420 420)"
                      />
                    </svg>
                    <div
                      className={pictFlowStyles["pict-flow-txt"]}
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="o">
                        <div className={`${pictFlowStyles.t} text-black font-medium text-[10px] text-center whitespace-pre-line`}>
                          {item.text}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* 上段の矢印 - 矢印先端なし、画面端まで突き抜け */}
              <div
                className={pictFlowStyles["pict-flow-arrow"]}
                style={{
                  position: "absolute",
                  top: "calc(50% - 40px)",
                  left: "-100vw",
                  width: "200vw",
                  transform: "translateY(-50%)",
                  zIndex: 0,
                }}
              >
                <div className={pictFlowStyles["pict-flow-arrow-body"]}>
                  <svg viewBox="0 0 2811.84 52.39" width="100%" height="20">
                    <path className="cls-1" d="M0,26.2H2811.84" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="8" />
                  </svg>
                </div>
              </div>
              
              {/* 下段の矢印 - 矢印先端あり、左端突き抜け、右端余白 */}
              <div
                className={pictFlowStyles["pict-flow-arrow"]}
                style={{
                  position: "absolute",
                  top: "calc(50% + 40px)",
                  left: "-100vw",
                  width: "calc(200vw - 15px)",
                  transform: "translateY(-50%)",
                  zIndex: 0,
                }}
              >
                <div className={pictFlowStyles["pict-flow-arrow-body"]}>
                  <svg viewBox="0 0 2811.84 52.39" width="100%" height="20">
                    <path className="cls-1" d="M0,26.2H2783.34" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="8" />
                    <path className="cls-2" d="M2763.64,6.5l19.7,19.7-19.7,19.69" stroke="#000" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`text-center mt-16 mb-8 lg:mt-12 lg:mb-6 max-md:mt-[-30px] max-md:mb-4 ${
          !isTextVisible ? '!opacity-0' : ''
        } ${
          isTextVisible ? 'animate-fade-up' : ''
        }`}>
          <h3 className="font-bold text-black mb-3 lg:text-2xl max-md:text-xl">
            <span className="bg-white px-2 py-1 rounded-sm">
              すべての業界に
            </span>
          </h3>
          <h3 className="font-bold text-black mb-4 lg:text-2xl max-md:text-xl">
            <span className="bg-white px-2 py-1 rounded-sm">
              "もうひとりのAIスタッフ"を提供する
            </span>
          </h3>
        </div>

        <div ref={textRef} className="max-w-4xl mx-auto px-8 text-center lg:px-6 md:px-4">
          <p className={`text-[18px] leading-[1.8] text-black mb-6 lg:text-base lg:mb-4 md:text-sm max-md:text-xs ${
            !isTextVisible ? '!opacity-0' : ''
          } ${
            isTextVisible ? 'animate-fade-up' : ''
          }`}>
            IILo（イーロ）は、AI・Web技術・クラウドインフラを用いて、
            <br className="hidden md:block" />
            業界特化型のスマートSaaSを開発・提供するテクノロジーカンパニーです。
          </p>

          <p className={`text-[18px] leading-[1.8] text-black mb-6 lg:text-base lg:mb-4 md:text-sm max-md:text-xs ${
            !isTextVisible ? '!opacity-0' : ''
          } ${
            isTextVisible ? 'animate-fade-up' : ''
          }`}>
            私たちは、現場で本当に使われるプロダクトにこだわり、
            <br className="hidden md:block" />
            医療・教育・店舗業などの現場に寄り添ったプロダクト設計を行っています。
          </p>

          <p className={`text-[18px] leading-[1.8] text-black mb-6 lg:text-base lg:mb-4 md:text-sm max-md:text-xs ${
            !isTextVisible ? '!opacity-0' : ''
          } ${
            isTextVisible ? 'animate-fade-up' : ''
          }`}>
            第一弾として、歯科業界に特化したLINE連携型SaaS「DiiLo（ディーロ）」をリリース。
          </p>

          <p className={`text-[18px] leading-[1.8] text-black mb-1 lg:text-base lg:mb-1 md:text-sm max-md:text-xs ${
            !isTextVisible ? '!opacity-0' : ''
          } ${
            isTextVisible ? 'animate-fade-up' : ''
          }`}>
            <span className="bg-white px-2 py-1 rounded-sm">
              今後も、現場に根ざしたテクノロジーを届けることで、
            </span>
          </p>
          <p className={`text-[18px] leading-[1.8] text-black mb-8 lg:text-base lg:mb-6 md:text-sm max-md:text-xs ${
            !isTextVisible ? '!opacity-0' : ''
          } ${
            isTextVisible ? 'animate-fade-up' : ''
          }`}>
            <span className="bg-white px-2 py-1 rounded-sm">
              すべての業界に"もうひとりのAIスタッフ"を提供することを目指しています。
            </span>
          </p>
        </div>

        {showMoreButton && (
          <div ref={moreButtonRef} className={`text-center mt-12 lg:mt-8 ${
            !isMoreButtonVisible ? '!opacity-0' : ''
          } ${
            isMoreButtonVisible ? 'animate-fade-up' : ''
          }`}>
            <Button
              type="button"
              onClick={onMissionMoreClick || (() => router.push("/mission"))}
              variant="ghost"
              className="bg-black text-white border-none rounded-[35px] py-3 px-12 text-lg cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-black hover:border hover:border-black hover:scale-105 lg:py-2 lg:px-8 lg:text-base"
            >
              More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MissionSectionWithAnimation;
