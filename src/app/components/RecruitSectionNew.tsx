"use client";

import React, { useState, useEffect } from "react";
import EngineerRecruitModal from "./EngineerRecruitModal";
import StaffRecruitModal from "./StaffRecruitModal";
import { HoverButton } from "../../../components/ui/hover-button";

const RecruitSectionNew = () => {
  const [engineerModalOpen, setEngineerModalOpen] = useState(false);
  const [staffModalOpen, setStaffModalOpen] = useState(false);

  const switchToStaffModal = () => {
    setEngineerModalOpen(false);
    setStaffModalOpen(true);
  };

  const switchToEngineerModal = () => {
    setStaffModalOpen(false);
    setEngineerModalOpen(true);
  };

  const handleEngineerRecruitClick = () => {
    setEngineerModalOpen(true);
  };

  const handleStaffRecruitClick = () => {
    setStaffModalOpen(true);
  };

  // モーダル表示時の背景スクロール制御
  useEffect(() => {
    const isAnyModalOpen = engineerModalOpen || staffModalOpen;

    if (isAnyModalOpen) {
      // モーダルが開いているときは背景のスクロールを無効化
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // モーダルが閉じているときはスクロールを復元
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [engineerModalOpen, staffModalOpen]);

  return (
    <>
      <section
        id="recruit"
        className="pt-[220px] pb-[220px] px-6 bg-[#E7E7E7] m-0"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-[260px] mb-[60px]">
            {/* Title with dot */}
            <div className="absolute left-[53px] top-0 flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-[15px]"></div>
              <h2 className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-black">
                Recruit
              </h2>
            </div>

            {/* Text content */}
            <p className="absolute w-100% h-[27px] left-[calc(50%-729px/2-85.5px)] top-1 font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black">
              IILoは、医療やサービス業など"現場で働く人たち"の手間と課題をテクノロジーで解決する会社です。
            </p>

            <p className="absolute w-[686px] h-[54px] left-[calc(50%-676px/2-112px)] top-[55px] font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black">
              第一弾プロダクト「DIILo」は、歯科クリニック向けのLINEマーケティングSaaS。
              <br />
              予約・保険証・決済・配信すべてを1つの仕組みでつなげ、現場を驚くほどシンプルにします。
            </p>

            <p className="absolute w-100% h-[27px] left-[calc(50%-543px/2-178.5px)] top-[134px] font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black">
              今後も、AIとWebの力で「現場を支えるプロダクト」を多業界に展開予定。
            </p>

            <p className="absolute w-100%h-[54px] left-[calc(50%-495px/2-202.5px)] top-[186px] font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black">
              スタートアップの熱量の中で、業界の課題を根本から変えてみたい。
              <br />
              そんな人を、私たちは探しています。
            </p>
          </div>

          {/* Cards section */}
          <div className="relative h-[350px]">
            {/* Engineer Card */}
            <div className="absolute w-[436px] h-[350px] left-[calc(50%-436px/2-232px)] top-0 bg-[#D0D0D0] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="relative z-10 h-full">
                <h3 className="absolute left-[34px] top-[61px] font-['Noto_Sans_JP'] font-bold text-lg leading-[21px] text-white">
                  正社員・インターン採用
                </h3>
                <p className="absolute left-[34px] top-[99px] font-['Noto_Sans_JP'] font-bold text-[28px] leading-[21px] text-white">
                  エンジニア
                </p>
                <HoverButton
                  onClick={handleEngineerRecruitClick}
                  normalBg="#ffffff"
                  normalText="#000000"
                  hoverBg="#000000"
                  hoverText="#ffffff"
                  className="absolute left-[35px] top-[268px] w-[120px] h-[45px] rounded-[35px] font-['General_Sans_Variable'] font-medium text-base leading-[45px] text-center"
                >
                  More
                </HoverButton>
              </div>
            </div>

            {/* Staff Card */}
            <div className="absolute w-[436px] h-[350px] left-[calc(50%-436px/2+232px)] top-0 bg-[#D0D0D0] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="relative z-10 h-full">
                <h3 className="absolute left-[32px] top-[61px] font-['Noto_Sans_JP'] font-bold text-lg leading-[21px] text-white">
                  アルバイト採用
                </h3>
                <p className="absolute left-[32px] top-[99px] font-['Noto_Sans_JP'] font-bold text-[28px] leading-[21px] text-white">
                  DIILOスタッフ
                </p>
                <HoverButton
                  onClick={handleStaffRecruitClick}
                  normalBg="#ffffff"
                  normalText="#000000"
                  hoverBg="#000000"
                  hoverText="#ffffff"
                  className="absolute left-[32px] top-[268px] w-[120px] h-[45px] rounded-[35px] font-['General_Sans_Variable'] font-medium text-base leading-[45px] text-center"
                >
                  More
                </HoverButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <EngineerRecruitModal
        isOpen={engineerModalOpen}
        onClose={() => setEngineerModalOpen(false)}
        onSwitchToStaff={switchToStaffModal}
      />
      <StaffRecruitModal
        isOpen={staffModalOpen}
        onClose={() => setStaffModalOpen(false)}
        onSwitchToEngineer={switchToEngineerModal}
      />
    </>
  );
};

export default RecruitSectionNew;
