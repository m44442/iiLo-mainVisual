'use client'

import React from 'react';

const CompanySectionNew = () => {
  return (
    <section className="pt-[180px] pb-[180px] bg-[#E7E7E7] m-0">
      <div className="flex items-center ml-[183px] mb-10">
        <div className="w-2 h-2 bg-black rounded-full mr-[15px]"></div>
        <h2 className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-black m-0">Company</h2>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-[414px]">
        <div className="flex mb-7 items-center">
          <div className="min-w-[120px] mr-10">
            <span className="inline-block bg-white text-black font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap">会社名</span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1">合同会社IILo</div>
        </div>
        <div className="flex mb-7 items-center">
          <div className="min-w-[120px] mr-10">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap">代表</span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1">名前 名前</div>
        </div>
        <div className="flex mb-7 items-center">
          <div className="min-w-[120px] mr-10">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap">設立</span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1">2025年◯月</div>
        </div>
        <div className="flex mb-7 items-center">
          <div className="min-w-[120px] mr-10">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap">住所</span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1">〒000-0000　住所住所住所住所住所住所</div>
        </div>
        <div className="flex mb-7 items-center">
          <div className="min-w-[120px] mr-10">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap">電話</span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1">00-0000-0000</div>
        </div>
      </div>
    </section>
  );
};

export default CompanySectionNew;