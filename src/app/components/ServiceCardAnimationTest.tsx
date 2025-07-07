"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedTitle from "./AnimatedTitle";

const ServiceCardAnimationTest = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 1.0, // タイトルアニメーションと同じタイミング
      }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section className="font-sans bg-black min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-[1200px]">
        {/* Service タイトル */}
        <div className="flex items-center mb-12">
          <div className="w-2 h-2 bg-white rounded-full mr-4"></div>
          <AnimatedTitle
            textColor="white"
            animationType="once"
            className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-white"
          >
            Service Animation Test
          </AnimatedTitle>
        </div>

        {/* DIILoカードコンテナ */}
        <div className="relative w-full h-[400px] flex justify-center">
          {/* アニメーション付きDIILoカード */}
          <div
            ref={cardRef}
            className={`
              relative w-[800px] h-[310px] overflow-hidden
              transition-transform duration-600 ease-out
              ${isVisible ? 'animate-expand-right' : 'scale-x-0'}
            `}
            style={{
              transformOrigin: 'left center', // 左端から展開
            }}
          >
            {/* 背景 */}
            <div className="absolute inset-0 bg-[#E7E7E7] rounded-[12px]" />

            {/* 歯科クリニック特化 LINEマーケティングSaaS */}
            <div className="absolute left-[53px] top-[40px] w-[255px] h-[60px] font-['Noto_Sans_JP'] font-normal text-[15px] leading-[30px] text-black">
              歯科クリニック特化
              <br />
              LINEマーケティングSaaS
            </div>

            {/* DIILoロゴ */}
            <div className="absolute left-[54px] top-[119px] w-[160px] h-[78px]">
              <Image
                src="/images/IILo-DIILo_logo_DIILo_logo-b.png"
                alt="DIILo Logo"
                width={160}
                height={78}
                className="w-full h-full object-contain"
              />
            </div>

            {/* ディーロ */}
            <div className="absolute left-[225px] top-[176px] w-[63px] h-[21px] font-['Noto_Sans_JP'] font-normal text-[16px] leading-[21px] text-black">
              ディーロ
            </div>

            {/* PCオブジェクト */}
            <div className="absolute left-[361px] top-[46px] w-[401px] h-[208px]">
              <Image
                src="/object-pc.svg"
                alt="PC Object"
                width={401}
                height={208}
                className="w-full h-full object-contain"
              />
            </div>

            {/* スマホオブジェクト */}
            <div className="absolute left-[325px] top-[115px] w-[80px] h-[143px]">
              <Image
                src="/object-sp.svg"
                alt="Smartphone Object"
                width={80}
                height={143}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Moreボタン */}
            <div className="absolute left-[75px] top-[233px] w-[100px] h-[35px]">
              <Button
                variant="pagetop"
                size="lg"
                className="w-full h-full"
              >
                More
              </Button>
            </div>

            {/* PC反射 */}
            <div 
              className="absolute left-[382px] top-[208px] w-[358px] h-[129px] overflow-hidden opacity-30"
            >
              <Image
                src="/object-pc (1).svg"
                alt="PC Reflection"
                width={358}
                height={129}
                className="w-full h-full object-contain"
              />
            </div>

            {/* スマホ反射 */}
            <div 
              className="absolute left-[330px] top-[236px] w-[71px] h-[81px] opacity-30"
            >
              <Image
                src="/object-sp re.svg"
                alt="Smartphone Reflection"
                width={71}
                height={81}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCardAnimationTest;