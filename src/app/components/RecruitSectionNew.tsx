"use client";

import React, { useState, useEffect, useRef } from "react";
import EngineerRecruitModal from "./EngineerRecruitModal";
import StaffRecruitModal from "./StaffRecruitModal";
import { HoverButton } from "../../../components/ui/hover-button";
import AnimatedTitle from "./AnimatedTitle";

const RecruitSectionNew = () => {
  const [engineerModalOpen, setEngineerModalOpen] = useState(false);
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [areCardsVisible, setAreCardsVisible] = useState(false);
  const [haveCardsAnimated, setHaveCardsAnimated] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  // カードアニメーション用のIntersectionObserver
  useEffect(() => {
    if (!cardsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !haveCardsAnimated) {
            setAreCardsVisible(true);
            setHaveCardsAnimated(true);
          }
        });
      },
      {
        threshold: 1.0,
        rootMargin: '-100px 0px -100px 0px', // 上下100pxずつ遅延
      }
    );

    observer.observe(cardsRef.current);

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, [haveCardsAnimated]);

  return (
    <>
      <section
        id="recruit"
        className="font-sans w-full pt-[220px] pb-[220px] px-6 bg-[#E7E7E7] m-0 max-[480px]:pt-[30px] max-[480px]:pb-[30px] max-[480px]:px-[23px] max-[480px]:w-full"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-[260px] mb-[60px] max-[480px]:h-auto max-[480px]:mb-[30px] max-[480px]:mt-[50px]">
            {/* Title with dot */}
            <div className="absolute left-[53px] top-0 flex items-center max-[480px]:relative max-[480px]:left-[12px] max-[480px]:top-0">
              <div className="w-2 h-2 bg-black rounded-full mr-[15px]"></div>
              <AnimatedTitle
                textColor="black"
                animationType="once"
                className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-black max-[480px]:text-3xl"
              >
                Recruit
              </AnimatedTitle>
            </div>

            {/* Text content */}
            <div className="absolute w-[900px] h-[200px] left-[calc(50%-900px/2)] top-1 font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-black max-[480px]:relative max-[480px]:w-[330px] max-[480px]:h-auto max-[480px]:mt-[20px] max-[480px]:text-[13px] max-[480px]:leading-[22px] max-[480px]:left-0 max-[480px]:mx-auto">
              IILoは、医療やサービス業など"現場で働く人たち"の手間と課題をテクノロジーで解決する会社です。
              <br />
              <br />
              第一弾プロダクト「DIILo」は、歯科クリニック向けのLINEマーケティングSaaS。
              予約・保険証・決済・配信すべてを1つの仕組みでつなげ、現場を驚くほどシンプルにします。
              <br />
              <br />
              今後も、AIとWebの力で「現場を支えるプロダクト」を多業界に展開予定。
              <br />
              <br />
              スタートアップの熱量の中で、業界の課題を根本から変えてみたい。
              そんな人を、私たちは探しています。
            </div>
          </div>
          {/* Cards section */}
          <div ref={cardsRef} className="relative h-[350px] max-[480px]:h-auto max-[480px]:flex max-[480px]:flex-col max-[480px]:gap-[40px]">
            {/* Engineer Card */}
            <div className={`absolute w-[436px] h-[350px] left-[calc(50%-436px/2-232px)] top-0 bg-[url('/software-developer-6521720_1280%201%20(1).svg')] bg-cover bg-center rounded-xl overflow-hidden max-[480px]:relative max-[480px]:left-0 max-[480px]:w-[330px] max-[480px]:h-[220px] max-[480px]:mx-auto ${
              areCardsVisible ? 'animate-expand-right' : 'scale-x-0'
            }`} style={{ transformOrigin: 'left center' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="relative z-10 h-full">
                <h3 className="absolute left-[34px] top-[61px] font-['Noto_Sans_JP'] font-bold text-lg leading-[21px] text-white max-[480px]:left-[25px] max-[480px]:top-[45px] max-[480px]:text-[15px]">
                  正社員・インターン採用
                </h3>
                <p className="absolute left-[34px] top-[99px] font-['Noto_Sans_JP'] font-bold text-[28px] leading-[21px] text-white max-[480px]:left-[25px] max-[480px]:top-[75px] max-[480px]:text-[22px]">
                  エンジニア
                </p>
                <HoverButton
                  onClick={handleEngineerRecruitClick}
                  normalBg="#ffffff"
                  normalText="#000000"
                  hoverBg="#000000"
                  hoverText="#ffffff"
                  className="absolute left-[35px] top-[268px] w-[120px] h-[45px] rounded-[35px] font-['General_Sans_Variable'] font-medium text-base leading-[45px] text-center max-[480px]:left-[25px] max-[480px]:top-[150px] max-[480px]:w-[100px] max-[480px]:h-[40px] max-[480px]:text-[14px] max-[480px]:rounded-[30px]"
                >
                  More
                </HoverButton>
              </div>
            </div>

            {/* Staff Card */}
            <div className={`absolute w-[436px] h-[350px] left-[calc(50%-436px/2+232px)] top-0 bg-[url('/pc-1207886_1280%201%20(2).svg')] bg-cover bg-center rounded-xl overflow-hidden max-[480px]:relative max-[480px]:left-0 max-[480px]:w-[330px] max-[480px]:h-[220px] max-[480px]:mx-auto ${
              areCardsVisible ? 'animate-expand-right' : 'scale-x-0'
            }`} style={{ transformOrigin: 'left center' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="relative z-10 h-full">
                <h3 className="absolute left-[32px] top-[61px] font-['Noto_Sans_JP'] font-bold text-lg leading-[21px] text-white max-[480px]:left-[25px] max-[480px]:top-[45px] max-[480px]:text-[15px]">
                  アルバイト採用
                </h3>
                <p className="absolute left-[32px] top-[99px] font-['Noto_Sans_JP'] font-bold text-[28px] leading-[21px] text-white max-[480px]:left-[25px] max-[480px]:top-[75px] max-[480px]:text-[22px]">
                  DIILOスタッフ
                </p>
                <HoverButton
                  onClick={handleStaffRecruitClick}
                  normalBg="#ffffff"
                  normalText="#000000"
                  hoverBg="#000000"
                  hoverText="#ffffff"
                  className="absolute left-[32px] top-[268px] w-[120px] h-[45px] rounded-[35px] font-['General_Sans_Variable'] font-medium text-base leading-[45px] text-center max-[480px]:left-[25px] max-[480px]:top-[150px] max-[480px]:w-[100px] max-[480px]:h-[40px] max-[480px]:text-[14px] max-[480px]:rounded-[30px]"
                >
                  More
                </HoverButton>
              </div>
            </div>
          </div>{" "}
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
