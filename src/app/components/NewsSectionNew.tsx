'use client'

import React from 'react';
import { HoverButton } from '../../../components/ui/hover-button';

const NewsSectionNew = () => {
  return (
    <section id="news" className="pt-[200px] pb-[200px] bg-[#000000] text-[#ffffff] m-0 w-full relative block">
      <div className="flex items-center ml-[183px] mb-10">
        <div className="w-2 h-2 bg-white rounded-full mr-[15px]"></div>
        <h2 className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] !text-white m-0">News</h2>
      </div>
      
      <div className="max-w-[900px] mx-auto px-10">
        <div className="flex items-center py-5">
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white mr-10 whitespace-nowrap min-w-[90px]">YYYY.MM.DD</div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white flex-1">
            最新情報タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイ…
          </div>
        </div>
        <div className="w-full h-px bg-[#E7E7E7] m-0"></div>
        
        <div className="flex items-center py-5">
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white mr-10 whitespace-nowrap min-w-[90px]">YYYY.MM.DD</div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white flex-1">
            最新情報タイトル
          </div>
        </div>
        <div className="w-full h-px bg-[#E7E7E7] m-0"></div>
        
        <div className="flex items-center py-5">
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white mr-10 whitespace-nowrap min-w-[90px]">YYYY.MM.DD</div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[22px] !text-white flex-1">
            最新情報タイトル
          </div>
        </div>
        <div className="w-full h-px bg-[#E7E7E7] m-0"></div>
      </div>
      
      <div className="text-left mt-10 pl-[414px]">
        <HoverButton
          normalBg="#E7E7E7"
          normalText="#000000"
          hoverBg="transparent"
          hoverText="#FFFFFF"
          className="w-[120px] h-[45px] rounded-[35px] font-['General_Sans_Variable'] font-medium text-base leading-[26px] flex items-center justify-center border border-transparent hover:border-white"
        >
          More
        </HoverButton>
      </div>
    </section>
  );
};

export default NewsSectionNew;