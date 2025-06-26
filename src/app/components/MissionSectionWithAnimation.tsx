"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

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
      // フェーズ1: 左からスライドイン（0秒）- 即座に開始
      setCurrentPhase(1);

      // フェーズ2: フェードイン + スケール（0.8秒後）
      setTimeout(() => {
        setCurrentPhase(2);
      }, 800);

      // フェーズ3: パルス（1.2秒後）
      setTimeout(() => {
        setCurrentPhase(3);
      }, 1200);

      // フェーズ4: 斜め分割（2.0秒後）
      setTimeout(() => {
        setCurrentPhase(4);
      }, 2000);

      // フェーズ5: 斜め合体（2.5秒後）
      setTimeout(() => {
        setCurrentPhase(5);
      }, 2500);

      // フェーズ6: 完成・安定化（2.6秒後）
      setTimeout(() => {
        setCurrentPhase(6);
      }, 2600);

      // テキスト表示（2.8秒後 - ロゴアニメーション完全終了後）
      setTimeout(() => {
        setShowMissionText(true);
      }, 2800);

      // フローティングアニメーション開始（2.8秒後）
      setTimeout(() => {
        if (missionHeaderRef.current) {
          missionHeaderRef.current.style.animation =
            "float 3s ease-in-out infinite alternate";
        }
      }, 2800);
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
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
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
          className="flex flex-col justify-center items-center mb-5 mt-5 relative lg:mt-10 lg:mb-5 max-md:mt-8 max-md:mb-4"
          ref={missionHeaderRef}
        >
          <div className="w-full h-[400px] flex items-center justify-center overflow-hidden relative mb-3 lg:h-[300px] lg:mb-2 md:h-[280px] md:mb-2 max-md:h-[200px] max-md:mb-1 [&_*]:will-change-transform">
            {/* 初期状態: アニメーション開始前は何も表示しない */}
            {currentPhase === 0 && (
              <div className="absolute flex items-center justify-center opacity-0"></div>
            )}

            {/* Phase 1: 黒い枠が残像残しながらスライド + 白文字ロゴが勢いよく現れる */}
            {currentPhase === 1 && (
              <div className="absolute flex items-center justify-center will-change-transform z-20">
                {/* 黒い枠（残像効果付き） */}
                <div
                  className="w-[420px] h-[295px] bg-black border-2 border-black flex items-center justify-center md:w-[350px] md:h-[245px] max-md:w-[280px] max-md:h-[196px]"
                  style={{
                    animation:
                      "slideFrameWithTrail 1.0s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
                  }}
                >
                  {/* 実際のロゴ画像（白色フィルタ適用で白文字化） */}
                  <div
                    style={{
                      animation:
                        "logoAppearDynamic 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards",
                      opacity: 0,
                    }}
                  >
                    <Image
                      src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                      alt="IILO Logo"
                      width={400}
                      height={275}
                      className="object-contain md:w-[330px] md:h-[230px] max-md:w-[264px] max-md:h-[184px]"
                      style={{
                        filter: "brightness(0) invert(1)",
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Phase 2: フェードイン + スケール */}
            {currentPhase === 2 && (
              <div className="absolute flex items-center justify-center will-change-transform z-20 animate-fade-in-scale">
                <Image
                  src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                  alt="IILO Logo"
                  width={320}
                  height={220}
                  className="object-contain md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                  priority
                />
              </div>
            )}

            {/* Phase 3: ロゴの周りに散らしたエフェクト */}
            {currentPhase === 3 && (
              <div className="absolute flex items-center justify-center will-change-transform z-10">
                {/* ロゴの周りに散らした線と円 */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* PC・タブレット表示 */}
                  <div className="hidden max-md:hidden md:block">
                    {/* 上部エリアの線と円 */}
                    <div className="absolute top-8 left-1/2 w-1 h-24 bg-black simple-burst-line-1 -translate-x-1/2 rotate-0"></div>
                    <div className="absolute top-4 left-1/3 w-10 h-10 border border-black rounded-full simple-burst-circle-1"></div>
                    <div className="absolute top-6 right-1/3 w-1 h-18 bg-black simple-burst-line-2 rotate-45"></div>

                    {/* 右側エリアの線と円 */}
                    <div className="absolute top-1/2 right-8 w-1 h-21 bg-black simple-burst-line-3 -translate-y-1/2 rotate-90"></div>
                    <div className="absolute top-1/3 right-4 w-12 h-12 border border-black rounded-full simple-burst-circle-2"></div>
                    <div className="absolute bottom-1/3 right-6 w-1 h-15 bg-black simple-burst-line-4 rotate-135"></div>

                    {/* 下部エリアの線と円 */}
                    <div className="absolute bottom-8 left-1/2 w-1 h-24 bg-black simple-burst-line-5 -translate-x-1/2 rotate-180"></div>
                    <div className="absolute bottom-4 left-1/4 w-14 h-14 border border-black rounded-full simple-burst-circle-3"></div>
                    <div className="absolute bottom-6 right-1/4 w-1 h-18 bg-black simple-burst-line-6 rotate-225"></div>

                    {/* 左側エリアの線と円 */}
                    <div className="absolute top-1/2 left-8 w-1 h-21 bg-black simple-burst-line-7 -translate-y-1/2 rotate-270"></div>
                    <div className="absolute top-2/3 left-4 w-10 h-10 border border-black rounded-full simple-burst-circle-4"></div>
                    <div className="absolute top-1/4 left-6 w-1 h-15 bg-black simple-burst-line-8 rotate-315"></div>
                  </div>

                  {/* スマホ表示 */}
                  <div className="block md:hidden">
                    {/* 上部の点線 */}
                    <div className="absolute top-6 left-0 right-0 h-0.5 border-t-2 border-dotted border-black"></div>

                    {/* 上部の円 2個 */}
                    <div className="absolute top-2 left-1/4 w-3 h-3 border border-black rounded-full simple-burst-circle-mobile-1"></div>
                    <div className="absolute top-2 right-1/4 w-3 h-3 border border-black rounded-full simple-burst-circle-mobile-2"></div>

                    {/* 下部の点線 */}
                    <div className="absolute bottom-6 left-0 right-0 h-0.5 border-t-2 border-dotted border-black"></div>

                    {/* 下部の円 3個 */}
                    <div className="absolute bottom-2 left-1/6 w-3 h-3 border border-black rounded-full simple-burst-circle-mobile-3"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 border border-black rounded-full simple-burst-circle-mobile-4"></div>
                    <div className="absolute bottom-2 right-1/6 w-3 h-3 border border-black rounded-full simple-burst-circle-mobile-5"></div>
                  </div>
                </div>

                {/* メインロゴ */}
                <Image
                  src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                  alt="IILO Logo"
                  width={320}
                  height={220}
                  className="object-contain animate-simple-pulse relative z-20 md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                  priority
                />
              </div>
            )}

            {/* Phase 4: 全文字の上下分割 - サイズ一貫性を保つ */}
            {currentPhase === 4 && (
              <>
                <div className="absolute flex items-center justify-center will-change-transform z-10">
                  {/* 分割前のロゴを基準として、上下分割表示 */}

                  {/* 上半分 */}
                  <div className="absolute w-[320px] h-[220px] overflow-hidden will-change-transform character-split-top z-[15] md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]">
                    <Image
                      src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                      alt="IILO Logo Top Half"
                      width={320}
                      height={220}
                      className="object-contain md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                      priority
                    />
                  </div>

                  {/* 下半分 */}
                  <div className="absolute w-[320px] h-[220px] overflow-hidden will-change-transform character-split-bottom z-[14] md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]">
                    <Image
                      src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                      alt="IILO Logo Bottom Half"
                      width={320}
                      height={220}
                      className="object-contain md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                      priority
                    />
                  </div>
                </div>
              </>
            )}

            {/* Phase 5: 文字ごとの水平合体 - サイズ一貫性を保つ */}
            {currentPhase === 5 && (
              <>
                <div className="absolute flex items-center justify-center will-change-transform z-10">
                  {/* 上半分 */}
                  <div className="absolute w-[320px] h-[220px] overflow-hidden will-change-transform character-assemble-top z-[15] md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]">
                    <Image
                      src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                      alt="IILO Logo Top Half Assembly"
                      width={320}
                      height={220}
                      className="object-contain md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                      priority
                    />
                  </div>

                  {/* 下半分 */}
                  <div className="absolute w-[320px] h-[220px] overflow-hidden will-change-transform character-assemble-bottom z-[14] md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]">
                    <Image
                      src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                      alt="IILO Logo Bottom Half Assembly"
                      width={320}
                      height={220}
                      className="object-contain md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                      priority
                    />
                  </div>
                </div>
              </>
            )}

            {/* Phase 6: 完成・安定化 - サイズ一貫性を保つ */}
            {currentPhase === 6 && (
              <div className="absolute flex items-center justify-center will-change-transform z-10">
                <Image
                  src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                  alt="IILO Logo"
                  width={320}
                  height={220}
                  className="object-contain static-complete md:w-[280px] md:h-[193px] max-md:w-[224px] max-md:h-[154px]"
                  priority
                />
              </div>
            )}
          </div>

          {/* テキストをロゴの真下に密着配置 - 左右段落揃え */}
          <div className="flex flex-col w-[400px] lg:w-[320px] md:w-[280px] max-md:w-[224px] -mt-16 lg:-mt-12 md:-mt-10 max-md:-mt-8">
            <div
              className={`font-[NotoSansJP,sans-serif] text-[58px] font-bold text-black tracking-wide mb-[3px] will-change-transform lg:text-[26px] md:text-xl max-md:text-[18px] text-left ${showMissionText ? "mission-fade-up" : "opacity-0"}`}
            >
              イーロの
            </div>
            <div
              className={`font-[NotoSansJP,sans-serif] text-[68px] font-bold text-black tracking-wide will-change-transform lg:text-[42px] md:text-[32px] max-md:text-[26px] text-right mr-[-30px] max-md:mr-[-24px] ${showMissionText ? "mission-fade-up-delayed" : "opacity-0"}`}
            >
              Missionは
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
