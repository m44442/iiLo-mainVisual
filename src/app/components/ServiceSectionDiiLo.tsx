"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedTitle from "./AnimatedTitle";
import GradientTextAnimation from "./GradientTextAnimation";

interface ServiceSectionDiiLoProps {
  isInModal?: boolean;
}

const ServiceSectionDiiLo: React.FC<ServiceSectionDiiLoProps> = ({
  isInModal = false,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [hasCardAnimated, setHasCardAnimated] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [hasTextAnimated, setHasTextAnimated] = useState(false);
  const [startGradientAnimation, setStartGradientAnimation] = useState(false);

  // デバッグ用: hasTextAnimatedの変化を監視
  useEffect(() => {
    console.log("🕵️ hasTextAnimated changed:", hasTextAnimated);
  }, [hasTextAnimated]);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      console.log("📱 Device check - window.innerWidth:", width);
      setIsDesktop(width >= 768);
      setIsMobile(width <= 480);
      setIsDeviceReady(true);
      console.log("📱 Device state:", { isDesktop: width >= 768, isMobile: width <= 480 });
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // カードアニメーション用のIntersectionObserver（スマホ・デスクトップ両対応）
  useEffect(() => {
    if (!cardRef.current || !isDeviceReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("📱 Card intersection Debug:", {
            isIntersecting: entry.isIntersecting,
            hasCardAnimated: hasCardAnimated,
            isMobile: isMobile,
            isDesktop: isDesktop,
            boundingClientRect: entry.boundingClientRect,
            intersectionRatio: entry.intersectionRatio,
            target: entry.target.className
          });
          if (entry.isIntersecting && !hasCardAnimated) {
            console.log("🚀 Card animation triggered for device:", isMobile ? "mobile" : "desktop");
            setIsCardVisible(true);
            setHasCardAnimated(true);
          }
        });
      },
      {
        threshold: isMobile ? 0.3 : 1.0,
        rootMargin: isMobile ? '0px 0px -50px 0px' : '-100px 0px -100px 0px',
      }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasCardAnimated, isMobile, isDeviceReady]);

  // テキストアニメーション用のIntersectionObserver
  useEffect(() => {
    if (!textRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("🔥 Text intersection Debug:", {
            isIntersecting: entry.isIntersecting,
            hasTextAnimated: hasTextAnimated,
            isMobile: isMobile,
            isDesktop: isDesktop,
            boundingClientRect: entry.boundingClientRect,
            intersectionRatio: entry.intersectionRatio,
            target: entry.target.className
          });
          if (entry.isIntersecting) {
            console.log("✅ Text fadeup triggered");
            setIsTextVisible(true);
            setHasTextAnimated(true);
            // fadeup完了後にグラデーションアニメーション開始
            setTimeout(() => {
              console.log("🌈 Starting one-time gradient animation");
              setStartGradientAnimation(true);
            }, 500);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 200px 0px',
      }
    );

    observer.observe(textRef.current);

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasTextAnimated]);

  return (
    <div className={isInModal ? "tw w-full overflow-hidden py-8" : ""}>
      <section
        id="service"
        className="tw font-sans relative bg-black w-full min-h-screen md:w-[1728px] md:h-[900px] md:left-[calc(50%-864px)] max-md:left-0 max-md:pb-220"
        style={
          isInModal
            ? {
                position: "relative",
                background: "#000000",
                transform: isMobile ? "none" : "scale(0.85)",
                transformOrigin: "center center",
                left: isMobile ? "auto" : "50%",
                marginLeft: isMobile ? "0" : "-864px",
                width: isMobile ? "100%" : undefined,
              }
            : {
                position: "relative",
                background: "#000000",
                ...(isDesktop && { left: "calc(50% - 864px)" }),
              }
        }
      >
        {/* Service タイトル */}
        <div className="absolute left-[263px] top-[150px] flex items-center md:left-[263px] md:top-[150px] max-md:relative max-md:left-auto max-md:top-auto max-md:pt-8 max-md:pl-6">
          <div className="w-2 h-2 bg-white rounded-full mr-[15px]"></div>
          <AnimatedTitle
            textColor="white"
            animationType="once"
            className="font-['General_Sans_Variable'] font-semibold text-[25px] leading-[45px] text-white max-md:text-3xl"
          >
            Service
          </AnimatedTitle>
        </div>

        {/* DIILoプロダクトエリア */}
        <div
          ref={cardRef}
          className={`tw absolute md:left-[490px] md:top-[162px] md:w-[800px] md:h-[310px] max-md:relative max-md:left-0 max-md:top-0 max-md:w-full max-md:ml-2 max-md:mt-8 ${
            !isCardVisible ? 'opacity-0' : 'opacity-100'
          } ${
            isCardVisible && hasCardAnimated ? 'animate-expand-right' : ''
          }`}
          style={{
            ...(isDesktop && {
              width: "800px",
              height: "310px",
              left: "490px",
              top: "162px",
            }),
            ...(!isDesktop && {
              minHeight: "330px",
            }),
            transformOrigin: 'left center',
          }}
        >
          {/* 背景 */}
          <div
            className="tw absolute bg-[#E7E7E7] rounded-[12px] md:w-[800px] md:h-[310px] max-md:w-[330px] max-md:h-[330px] max-md:left-[23px]"
            style={{
              ...(isDesktop && {
                width: "800px",
                height: "310px",
                left: "0px",
                top: "0px",
              }),
              ...(!isDesktop && {
                width: "330px",
                height: "330px",
                left: "23px",
                top: "0px",
              }),
            }}
          />

          {/* 歯科クリニック特化 LINEマーケティングSaaS */}
          <div
            className="tw absolute font-['Noto_Sans_JP'] font-normal text-[15px] leading-[30px] text-black md:w-[255px] md:h-[60px] md:left-[53px] md:top-[40px] max-md:w-[200px] max-md:h-[44px] max-md:left-[46px] max-md:top-[23px] max-md:text-[15px] max-md:leading-[22px]"
            style={{
              ...(isDesktop && {
                width: "255px",
                height: "60px",
                left: "53px",
                top: "40px",
              }),
              ...(!isDesktop && {
                width: "200px",
                height: "44px",
                left: "46px",
                top: "23px",
                fontSize: "15px",
                lineHeight: "22px",
              }),
            }}
          >
            歯科クリニック特化
            <br />
            LINEマーケティングSaaS
          </div>

          {/* DIILoロゴ */}
          <div
            className="tw absolute md:w-[160.46px] md:h-[78px] md:left-[54px] md:top-[119px] max-md:w-[129.6px] max-md:h-[63px] max-md:left-[46px] max-md:top-[81px]"
            style={{
              ...(isDesktop && {
                width: "160.46px",
                height: "78px",
                left: "54px",
                top: "119px",
              }),
              ...(!isDesktop && {
                width: "129.6px",
                height: "63px",
                left: "46px",
                top: "81px",
              }),
            }}
          >
            <Image
              src="/images/IILo-DIILo_logo_DIILo_logo-b.png"
              alt="DIILo Logo"
              width={160}
              height={78}
              className="tw w-full h-full object-contain"
            />
          </div>

          {/* ディーロ */}
          <div
            className="tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[21px] text-black md:w-[63px] md:h-[21px] md:left-[225px] md:top-[176px] max-md:w-[48px] max-md:h-[21px] max-md:left-[182px] max-md:top-[126px] max-md:text-[12px]"
            style={{
              ...(isDesktop && {
                width: "63px",
                height: "21px",
                left: "225px",
                top: "176px",
              }),
              ...(!isDesktop && {
                width: "48px",
                height: "21px",
                left: "182px",
                top: "126px",
                fontSize: "12px",
              }),
            }}
          >
            ディーロ
          </div>

          {/* PCオブジェクト */}
          <div
            className="tw absolute md:w-[401px] md:h-[208px] md:left-[361px] md:top-[46px] max-md:w-[200px] max-md:h-[104px] max-md:left-[160px] max-md:top-[170px]"
            style={{
              ...(isDesktop && {
                width: "401px",
                height: "208px",
                left: "361px",
                top: "46px",
              }),
              ...(!isDesktop && {
                width: "200px",
                height: "104px",
                left: "160px",
                top: "170px",
              }),
            }}
          >
            <Image
              src="/object-pc.svg"
              alt="PC Object"
              width={451}
              height={258}
              className="tw w-full h-full object-contain"
            />
          </div>

          {/* スマホオブジェクト */}
          <div
            className="tw absolute md:w-[80px] md:h-[143px] md:left-[325px] md:top-[115px] max-md:w-[40px] max-md:h-[72px] max-md:left-[140px] max-md:top-[204px]"
            style={{
              ...(isDesktop && {
                width: "80px",
                height: "143px",
                left: "325px",
                top: "115px",
              }),
              ...(!isDesktop && {
                width: "40px",
                height: "72px",
                left: "140px",
                top: "204px",
              }),
            }}
          >
            <Image
              src="/object-sp.svg"
              alt="Smartphone Object"
              width={80}
              height={143}
              className="tw w-full h-full object-contain"
            />
          </div>

          {/* Moreボタン */}
          <div
            className="tw absolute md:w-[100px] md:h-[35px] md:left-[75px] md:top-[233px] max-md:w-[80px] max-md:h-[35px] max-md:left-[46px] max-md:top-[273px]"
            style={{
              ...(isDesktop && {
                width: "100px",
                height: "35px",
                left: "75px",
                top: "233px",
              }),
              ...(!isDesktop && {
                width: "80px",
                height: "35px",
                left: "46px",
                top: "273px",
              }),
            }}
          >
            <Button
              variant="pagetop"
              size="lg"
              className="tw w-full h-full max-md:text-[13px] max-md:rounded-[25px] max-md:font-medium max-md:leading-[22px] max-md:bg-black max-md:text-white"
              style={{
                ...(!isDesktop && {
                  background: "#000000",
                  borderRadius: "25px",
                  fontFamily: "'General Sans Variable'",
                  fontWeight: "500",
                  fontSize: "13px",
                  lineHeight: "22px",
                  textAlign: "center",
                  color: "#FFFFFF",
                }),
              }}
            >
              More
            </Button>
          </div>

          {/* PC反射 */}
          <div
            className="tw absolute overflow-hidden md:w-[358px] md:h-[129px] md:left-[382px] md:top-[208px] max-md:w-[179px] max-md:h-[65px] max-md:left-[170px] max-md:top-[251px]"
            style={{
              transform: "scaleY(1)",
              opacity: "0.3",
              ...(isDesktop && {
                width: "358px",
                height: "129px",
                left: "382px",
                top: "208px",
              }),
              ...(!isDesktop && {
                width: "179px",
                height: "65px",
                left: "170px",
                top: "251px",
              }),
            }}
          >
            <Image
              src="/object-pc (1).svg"
              alt="PC Reflection"
              width={451}
              height={258}
              className="tw w-full h-full object-contain"
            />
          </div>

          {/* スマホ反射 */}
          <div
            className="tw absolute md:w-[71px] md:h-[81px] md:left-[330px] md:top-[236px] max-md:w-[36px] max-md:h-[41px] max-md:left-[141px] max-md:top-[266px]"
            style={{
              transform: "scaleY(1)",
              opacity: "0.3",
              ...(isDesktop && {
                width: "71px",
                height: "81px",
                left: "330px",
                top: "236px",
              }),
              ...(!isDesktop && {
                width: "36px",
                height: "41px",
                left: "141px",
                top: "266px",
              }),
            }}
          >
            <Image
              src="/object-sp re.svg"
              alt="Smartphone Reflection"
              width={80}
              height={163}
              className="tw w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 説明テキスト群 */}
        <div className={startGradientAnimation ? 'tw animate-text-gradient' : ''}>
          {/* 1行目 */}
          <div
            className={`tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white md:w-[900px] md:h-[27px] max-md:w-full max-md:px-6 max-md:text-[14px] max-md:leading-[24px] ${
              !isTextVisible ? '!opacity-0' : ''
            } ${
              isTextVisible ? 'animate-fade-up' : ''
            }`}
            style={{
              ...(isDesktop && {
                width: "900px",
                height: "27px",
                left: "calc(50% - 760px/2)",
                top: "542px",
              }),
              ...(!isDesktop && {
                top: "450px",
                left: "0",
                right: "0",
              }),
            }}
          >
            <GradientTextAnimation trigger={startGradientAnimation} delay={0}>
              DiiLoは、歯科クリニック向けに特化したLINE公式アカウント連携型のマーケティング＆患者管理ツールです。
            </GradientTextAnimation>
          </div>

          {/* 2行目 */}
          <div
            className={`tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white md:w-[900px] md:h-[54px] max-md:w-full max-md:px-6 max-md:text-[14px] max-md:leading-[24px] ${
              !isTextVisible ? '!opacity-0' : ''
            } ${
              isTextVisible ? 'animate-fade-up' : ''
            }`}
            style={{
              ...(isDesktop && {
                width: "900px",
                height: "54px",
                left: "calc(50% - 760px/2)",
                top: "584px",
              }),
              ...(!isDesktop && {
                top: "530px",
                left: "0",
                right: "0",
              }),
            }}
          >
            <GradientTextAnimation trigger={startGradientAnimation} delay={0}>
              患者データ管理、予約、保険証のアップロード、患者アンケート、セグメント別のメッセージ配信、個別チャット。
            </GradientTextAnimation>
            <br />
            <GradientTextAnimation trigger={startGradientAnimation} delay={0}>
              さらにリッチメニューの自動生成や、Stripe決済機能までを一元管理。さらにそれらを用いたマーケティング情報の獲得。
            </GradientTextAnimation>
          </div>

          {/* 3行目 */}
          <div
            className={`tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white md:w-[900px] md:h-[27px] max-md:w-full max-md:px-6 max-md:text-[14px] max-md:leading-[24px] ${
              !isTextVisible ? '!opacity-0' : ''
            } ${
              isTextVisible ? 'animate-fade-up' : ''
            }`}
            style={{
              ...(isDesktop && {
                width: "900px",
                height: "27px",
                left: "calc(50% - 760px/2)",
                top: "653px",
              }),
              ...(!isDesktop && {
                top: "680px",
                left: "0",
                right: "0",
              }),
            }}
          >
            <GradientTextAnimation trigger={startGradientAnimation} delay={0}>
              従来の汎用ツールと異なり、導入時点からテンプレートが整っており、専門知識不要で「その日から使える」設計に。
            </GradientTextAnimation>
          </div>

          {/* 4行目 */}
          <div
            ref={textRef}
            className={`tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white md:w-[900px] md:h-[54px] max-md:w-full max-md:px-6 max-md:text-[14px] max-md:leading-[24px] ${
              !isTextVisible ? '!opacity-0' : ''
            } ${
              isTextVisible ? 'animate-fade-up' : ''
            }`}
            style={{
              ...(isDesktop && {
                width: "900px",
                height: "54px",
                left: "calc(50% - 760px/2)",
                top: "695px",
              }),
              ...(!isDesktop && {
                top: "760px",
                left: "0",
                right: "0",
              }),
            }}
          >
            <GradientTextAnimation trigger={startGradientAnimation} delay={0}>
              「歯科現場への最適化」と、誰でも直感的に扱えるユーザーインターフェースを両立させた、次世代の歯秔DXプラットフォームです。
            </GradientTextAnimation>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceSectionDiiLo;
