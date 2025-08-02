"use client";

import React, { useState, useEffect, useRef } from "react";
import { HoverButton } from "../../../components/ui/hover-button";
import MorphingText from "./MorphingText";

const NewsSectionNew = () => {
  const [startTitleMorphing, setStartTitleMorphing] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartTitleMorphing(true);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(titleRef.current);

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <section
      id="news"
      className="font-sans pt-[200px] pb-[200px] bg-[#000000] text-[#ffffff] m-0 w-full relative block max-[480px]:pt-[60px] max-[480px]:pb-[60px]"
    >
      <div ref={titleRef} className={`flex items-center ml-[183px] mb-10 max-[480px]:ml-[19px] max-[480px]:mb-4 transition-opacity duration-500 ease-in-out ${startTitleMorphing ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-2 h-2 bg-white rounded-full mr-[15px] max-[480px]:w-1.5 max-[480px]:h-1.5 max-[480px]:mr-2"></div>
        <MorphingText
          targetText="News"
          speed={60}
          autoStart={startTitleMorphing}
          className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-white m-0 max-[480px]:text-3xl max-[480px]:leading-[38px]"
          chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>?!"
          incrementRate={0.4}
        />
      </div>

      <div className="max-w-[900px] mx-auto px-10 max-[480px]:px-5 max-[480px]:max-w-full">
        <div className="flex items-center py-5 max-[480px]:py-3">
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white mr-10 whitespace-nowrap min-w-[90px] max-[480px]:text-[13px] max-[480px]:leading-[22px] max-[480px]:min-w-[70px] max-[480px]:mr-2">
            YYYY.MM.DD
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white flex-1 max-[480px]:text-[13px] max-[480px]:leading-[22px]">
            最新情報タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイ…
          </div>
        </div>
        <div className="w-full h-px bg-[#E7E7E7] m-0 max-[480px]:w-full"></div>
        <div className="flex items-center py-5 max-[480px]:py-3">
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white mr-10 whitespace-nowrap min-w-[90px] max-[480px]:text-[13px] max-[480px]:leading-[22px] max-[480px]:min-w-[70px] max-[480px]:mr-2">
            YYYY.MM.DD
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white flex-1 max-[480px]:text-[13px] max-[480px]:leading-[22px]">
            最新情報タイトル
          </div>
        </div>
        <div className="w-full h-px bg-[#E7E7E7] m-0 max-[480px]:w-full"></div>
        <div className="flex items-center py-5 max-[480px]:py-3">
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white mr-10 whitespace-nowrap min-w-[90px] max-[480px]:text-[13px] max-[480px]:leading-[22px] max-[480px]:min-w-[70px] max-[480px]:mr-2">
            YYYY.MM.DD
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white flex-1 max-[480px]:text-[13px] max-[480px]:leading-[22px]">
            最新情報タイトル
          </div>
        </div>
        <div className="w-full h-px bg-[#E7E7E7] m-0 max-[480px]:w-full"></div>
      </div>
      <div className="text-left mt-10 pl-[414px] max-[480px]:pl-[19px] max-[480px]:mt-4">
        <HoverButton
          normalBg="#E7E7E7"
          normalText="#000000"
          hoverBg="transparent"
          hoverText="#FFFFFF"
          className="w-[120px] h-[45px] rounded-[35px] font-['General_Sans_Variable'] font-medium text-base leading-[26px] flex items-center justify-center border border-transparent hover:border-white max-[480px]:w-[80px] max-[480px]:h-[32px] max-[480px]:rounded-[16px] max-[480px]:text-[11px] max-[480px]:leading-[32px]"
        >
          More
        </HoverButton>
      </div>
    </section>
  );
};

export default NewsSectionNew;
