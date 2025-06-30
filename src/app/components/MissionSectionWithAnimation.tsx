"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import styles from './AnimationTest.module.css';

interface MissionSectionWithAnimationProps {
  showMoreButton?: boolean;
  onMissionMoreClick?: () => void;
}

const MissionSectionWithAnimation: React.FC<
  MissionSectionWithAnimationProps
> = ({ showMoreButton = true, onMissionMoreClick }) => {
  const router = useRouter();

  const missionSectionRef = useRef<HTMLElement>(null);
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
        threshold: 0.7
      }
    );

    if (missionHeaderRef.current) {
      observer.observe(missionHeaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      className="py-20 px-6 bg-[#E7E7E7] m-0 lg:py-[60px] lg:px-4 md:py-10 md:px-3 max-md:py-8 max-md:px-4"
      ref={missionSectionRef}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          className={`flex flex-col justify-center items-center mb-5 mt-5 relative lg:mt-10 lg:mb-5 max-md:mt-8 max-md:mb-4 ${styles.missionHeader}`}
          ref={missionHeaderRef}
        >
          <div className={`w-full h-[300px] flex items-center justify-center overflow-hidden relative mb-10 ${styles.iiloAnimationContainer}`}>
            {currentPhase === 1 && (
              <div className="relative">
                <div className={`${styles.afterimage1} absolute bg-black py-2 px-4 top-[-100px]`}>
                  <div className={`flex items-end gap-[20px] ${styles.compressedLogoContainer}`}>
                    <div className={`${styles.compressedI1} bg-[#E7E7E7] mr-[20px]`} />
                    <div className={`${styles.compressedI2} bg-[#E7E7E7] mr-[20px]`} />
                    <div className={`${styles.compressedL} bg-[#E7E7E7] relative`} />
                    <div className={`${styles.compressedO} ml-[-20px]`} />
                  </div>
                </div>
                <div className={`${styles.afterimage2} absolute bg-black py-2 px-4 top-[-100px]`}>
                  <div className={`flex items-end gap-[20px] ${styles.compressedLogoContainer}`}>
                    <div className={`${styles.compressedI1} bg-[#E7E7E7] mr-[20px]`} />
                    <div className={`${styles.compressedI2} bg-[#E7E7E7] mr-[20px]`} />
                    <div className={`${styles.compressedL} bg-[#E7E7E7] relative`} />
                    <div className={`${styles.compressedO} ml-[-20px]`} />
                  </div>
                </div>
                <div className={`${styles.mainSlide} absolute bg-black py-2 px-4 top-[-100px]`}>
                  <div className={`flex items-end gap-[20px] ${styles.compressedLogoContainer}`}>
                    <div className={`${styles.compressedI1} bg-[#E7E7E7] mr-[20px]`} />
                    <div className={`${styles.compressedI2} bg-[#E7E7E7] mr-[20px]`} />
                    <div className={`${styles.compressedL} bg-[#E7E7E7] relative`} />
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
                <div className={`flex items-end gap-[20px] ${styles.lettersContainer}`}>
                  <div className={styles.letterI1}></div>
                  <div className={styles.letterI2}></div>
                  <div className={styles.letterL}></div>
                  <div className={styles.letterO}></div>
                </div>
              </div>
            )}

            {currentPhase === 4 && (
              <div className={`scale-100 transition-transform duration-500 ease-in-out ${styles.phase4Container}`}>
                <div className={`flex items-end gap-[20px] ${styles.normalLogoContainer}`}>
                  <div className={styles.normalI1}></div>
                  <div className={styles.normalI2}></div>
                  <div className={styles.normalL}></div>
                  <div className={styles.normalO}></div>
                </div>
              </div>
            )}

            {currentPhase === 5 && (
              <div className={`flex items-end gap-[20px] ${styles.phase5Container} ${styles.finalLetters}`}>
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

          <div className={`absolute left-0 right-0 top-[270px] md:top-[180px] ${styles.missionTextContainer}`}>
            <div className={`font-bold text-[30px] text-black tracking-[0.5px] mb-[3px] text-left ml-[510px] mt-[-10px] font-sans md:text-base md:mb-px md:font-bold md:ml-[150px] ${showMissionText ? styles.fadeInUp : styles.hiddenText} ${styles.missionSubtitle}`}>
              イーロの
            </div>
            <div className={`font-bold text-[40px] text-black tracking-[1px] text-left ml-[685px] mt-[-10px] font-sans md:text-[28px] md:font-bold md:ml-[240px] ${showMissionText ? styles.fadeInUp : styles.hiddenText} ${styles.missionMainTitle}`}>
              Mission
              <span className={`text-[48px] md:text-[28px] ${showMissionText ? styles.fadeInUp : styles.hiddenText} ${styles.missionTitleSmall}`}>
                は
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center mt-20 lg:mt-10 lg:px-4 max-md:mt-8 max-md:px-2">
          {/* Dotted Line Background - 適切な長さで矢印が表示されるように */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-0 hidden md:block">
            <div className="w-[1400px] h-[1px] relative flex items-center justify-center lg:w-[1100px] md:w-[800px] max-md:w-[600px]">
              <Image
                src="/images/service-dotted-line.svg"
                alt="Dotted Line"
                width={2807}
                height={1}
                className="w-full h-auto"
              />
              {/* Arrow */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                <Image
                  src="/images/arrow-tip.svg"
                  alt="Arrow"
                  width={20}
                  height={39}
                />
              </div>
            </div>
          </div>

          {/* Circles container - PC/タブレット版 */}
          <div className="hidden max-md:hidden md:flex justify-center items-center flex-nowrap lg:flex-wrap md:flex-wrap relative z-10">
            {/* Circle 1 - AI */}
            <div className="w-[270px] h-[270px] flex items-center justify-center relative lg:w-[210px] lg:h-[210px] md:w-[180px] md:h-[180px] max-md:w-[144px] max-md:h-[144px] -mr-[35px] lg:-mr-[30px] md:-mr-[25px] max-md:-mr-[20px]">
              <Image
                src="/images/circle-path.svg"
                alt="Circle"
                width={308}
                height={308}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg lg:text-base md:text-sm">
                AI
              </div>
            </div>
            {/* Circle 2 - Web アプリケーション開発 */}
            <div className="w-[270px] h-[270px] flex items-center justify-center relative lg:w-[210px] lg:h-[210px] md:w-[180px] md:h-[180px] -mr-[35px] lg:-mr-[30px] md:-mr-[25px]">
              <Image
                src="/images/circle-path.svg"
                alt="Circle"
                width={308}
                height={308}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg text-center lg:text-base md:text-sm">
                Web
                <br />
                アプリケーション
                <br />
                開発
              </div>
            </div>
            {/* Circle 3 - クラウド インフラ */}
            <div className="w-[270px] h-[270px] flex items-center justify-center relative lg:w-[210px] lg:h-[210px] md:w-[180px] md:h-[180px] -mr-[35px] lg:-mr-[30px] md:-mr-[25px]">
              <Image
                src="/images/circle-path.svg"
                alt="Circle"
                width={308}
                height={308}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg text-center lg:text-base md:text-sm">
                クラウド
                <br />
                インフラ
              </div>
            </div>
            {/* Circle 4 - セキュリティ・コンプライアンス */}
            <div className="w-[270px] h-[270px] flex items-center justify-center relative lg:w-[210px] lg:h-[210px] md:w-[180px] md:h-[180px] -mr-[35px] lg:-mr-[30px] md:-mr-[25px]">
              <Image
                src="/images/circle-path.svg"
                alt="Circle"
                width={308}
                height={308}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg text-center lg:text-base md:text-sm">
                セキュリティ・
                <br />
                プライバシー設計
              </div>
            </div>
            <div className="w-[270px] h-[270px] flex items-center justify-center relative lg:w-[210px] lg:h-[210px] md:w-[180px] md:h-[180px]">
              <Image
                src="/images/circle-path.svg"
                alt="Circle"
                width={308}
                height={308}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg text-center lg:text-base md:text-sm">
                API・
                <br />
                外部連携基盤
              </div>
            </div>
          </div>

          {/* Circles container - スマホ版 */}
          <div className="block md:hidden relative z-10">
            {/* 点線SVG - 上段の円の中心を通る線 */}
            <div className="absolute top-[60px] left-0 right-0 flex justify-center z-0">
              <Image
                src="/images/service-dotted-line.svg"
                alt="Dotted Line"
                width={300}
                height={20}
                className="object-contain"
              />
            </div>

            {/* 点線SVG - 下段の円の中心を通る線 */}
            <div className="absolute bottom-[60px] left-0 right-0 flex justify-center z-0">
              <Image
                src="/images/service-dotted-line.svg"
                alt="Dotted Line"
                width={300}
                height={20}
                className="object-contain"
              />
            </div>

            {/* 上段 - 2個の円 */}
            <div className="flex justify-center items-center mb-[-33px]">
              {/* Circle 1 - AI */}
              <div className="w-[120px] h-[120px] flex items-center justify-center relative mr-[-18px]">
                <Image
                  src="/images/circle-path.svg"
                  alt="Circle"
                  width={308}
                  height={308}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm">
                  AI
                </div>
              </div>
              {/* Circle 2 - Web アプリケーション開発 */}
              <div className="w-[120px] h-[120px] flex items-center justify-center relative">
                <Image
                  src="/images/circle-path.svg"
                  alt="Circle"
                  width={308}
                  height={308}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs text-center">
                  Web
                  <br />
                  アプリケーション
                  <br />
                  開発
                </div>
              </div>
            </div>

            {/* 下段 - 3個の円 */}
            <div className="flex justify-center items-center">
              {/* Circle 3 - クラウド インフラ */}
              <div className="w-[120px] h-[120px] flex items-center justify-center relative mr-[-18px]">
                <Image
                  src="/images/circle-path.svg"
                  alt="Circle"
                  width={308}
                  height={308}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs text-center">
                  クラウド
                  <br />
                  インフラ
                </div>
              </div>
              {/* Circle 4 - セキュリティ・プライバシー設計 */}
              <div className="w-[120px] h-[120px] flex items-center justify-center relative mr-[-18px]">
                <Image
                  src="/images/circle-path.svg"
                  alt="Circle"
                  width={308}
                  height={308}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs text-center">
                  セキュリティ・
                  <br />
                  プライバシー設計
                </div>
              </div>
              {/* Circle 5 - API・外部連携基盤 */}
              <div className="w-[120px] h-[120px] flex items-center justify-center relative">
                <Image
                  src="/images/circle-path.svg"
                  alt="Circle"
                  width={308}
                  height={308}
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs text-center">
                  API・
                  <br />
                  外部連携基盤
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 mb-8 lg:mt-12 lg:mb-6">
          <h3 className="text-[32px] font-bold text-black mb-3 lg:text-2xl md:text-xl">
            <span className="bg-white px-2 py-1 rounded-sm">
              すべての業界に
            </span>
          </h3>
          <h3 className="text-[32px] font-bold text-black mb-4 lg:text-2xl md:text-xl">
            <span className="bg-white px-2 py-1 rounded-sm">
              "もうひとりのAIスタッフ"を提供する
            </span>
          </h3>
        </div>

        <div className="max-w-4xl mx-auto px-8 text-center lg:px-6 md:px-4">
          <p className="text-[18px] leading-[1.8] text-black mb-6 lg:text-base lg:mb-4 md:text-sm max-md:text-xs">
            IILo（イーロ）は、AI・Web技術・クラウドインフラを用いて、
            <br className="hidden md:block" />
            業界特化型のスマートSaaSを開発・提供するテクノロジーカンパニーです。
          </p>

          <p className="text-[18px] leading-[1.8] text-black mb-6 lg:text-base lg:mb-4 md:text-sm max-md:text-xs">
            私たちは、現場で本当に使われるプロダクトにこだわり、
            <br className="hidden md:block" />
            医療・教育・店舗業などの現場に寄り添ったプロダクト設計を行っています。
          </p>

          <p className="text-[18px] leading-[1.8] text-black mb-6 lg:text-base lg:mb-4 md:text-sm max-md:text-xs">
            第一弾として、歯科業界に特化したLINE連携型SaaS「DiiLo（ディーロ）」をリリース。
          </p>

          <p className="text-[18px] leading-[1.8] text-black mb-1 lg:text-base lg:mb-1 md:text-sm max-md:text-xs">
            <span className="bg-white px-2 py-1 rounded-sm">
              今後も、現場に根ざしたテクノロジーを届けることで、
            </span>
          </p>
          <p className="text-[18px] leading-[1.8] text-black mb-8 lg:text-base lg:mb-6 md:text-sm max-md:text-xs">
            <span className="bg-white px-2 py-1 rounded-sm">
              すべての業界に"もうひとりのAIスタッフ"を提供することを目指しています。
            </span>
          </p>
        </div>

        {showMoreButton && (
          <div className="text-center mt-12 lg:mt-8">
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
