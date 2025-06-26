"use client";

import React from "react";

const CompanySectionNew = () => {
  return (
    <section className="pt-[180px] pb-[180px] bg-[#E7E7E7] m-0 max-[480px]:pt-[60px] max-[480px]:pb-[60px]">
      <div className="flex items-center ml-[183px] mb-10 max-[480px]:ml-[19px] max-[480px]:mb-4">
        <div className="w-2 h-2 bg-black rounded-full mr-[15px] max-[480px]:w-1.5 max-[480px]:h-1.5 max-[480px]:mr-2"></div>
        <h2 className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-black m-0 max-[480px]:text-3xl max-[480px]:leading-[38px]">
          Company
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-[414px] max-[480px]:px-6 max-[480px]:max-w-full">
        <div className="flex mb-7 items-center max-[480px]:mb-3">
          <div className="min-w-[120px] mr-10 max-[480px]:min-w-[70px] max-[480px]:mr-2">
            <span className="inline-block bg-white text-black font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-[12px] max-[480px]:leading-[18px] max-[480px]:px-2">
              会社名
            </span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1 max-[480px]:text-[12px] max-[480px]:leading-[18px]">
            合同会社IILo
          </div>
        </div>
        <div className="flex mb-7 items-center max-[480px]:mb-3">
          <div className="min-w-[120px] mr-10 max-[480px]:min-w-[70px] max-[480px]:mr-2">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-[12px] max-[480px]:leading-[18px] max-[480px]:px-2">
              代表
            </span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1 max-[480px]:text-[12px] max-[480px]:leading-[18px]">
            名前 名前
          </div>
        </div>
        <div className="flex mb-7 items-center max-[480px]:mb-3">
          <div className="min-w-[120px] mr-10 max-[480px]:min-w-[70px] max-[480px]:mr-2">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-[12px] max-[480px]:leading-[18px] max-[480px]:px-2">
              設立
            </span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1 max-[480px]:text-[12px] max-[480px]:leading-[18px]">
            2025年◯月
          </div>
        </div>
        <div className="flex mb-7 items-center max-[480px]:mb-3">
          <div className="min-w-[120px] mr-10 max-[480px]:min-w-[70px] max-[480px]:mr-2">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-[12px] max-[480px]:leading-[18px] max-[480px]:px-2">
              住所
            </span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1 max-[480px]:text-[12px] max-[480px]:leading-[18px]">
            〒000-0000　住所住所住所住所住所住所
          </div>
        </div>
        <div className="flex mb-7 items-center max-[480px]:mb-3">
          <div className="min-w-[120px] mr-10 max-[480px]:min-w-[70px] max-[480px]:mr-2">
            <span className="inline-block bg-black text-white font-['Noto_Sans_JP'] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-[12px] max-[480px]:leading-[18px] max-[480px]:px-2">
              電話
            </span>
          </div>
          <div className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black flex-1 max-[480px]:text-[12px] max-[480px]:leading-[18px]">
            00-0000-0000
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySectionNew;
