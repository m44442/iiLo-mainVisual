"use client";

import React, { useEffect } from "react";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
// import styles from "./RecruitModal.module.css"; // Replaced with Tailwind classes
import ContactSectionTailwind from "./ContactSectionTailwind";
import { Button } from "../../../components/ui/button";

interface EngineerRecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToStaff?: () => void;
}

const EngineerRecruitModal = ({
  isOpen,
  onClose,
  onSwitchToStaff,
}: EngineerRecruitModalProps) => {
  // Hide header and disable body scroll when modal is open
  useEffect(() => {
    const header = document.querySelector("header");
    const navHeader = document.querySelector("nav");
    const body = document.body;

    console.log("EngineerRecruitModal - isOpen:", isOpen);
    console.log("EngineerRecruitModal - header found:", !!header);
    console.log("EngineerRecruitModal - nav found:", !!navHeader);
    if (header) {
      console.log("EngineerRecruitModal - header current display:", (header as HTMLElement).style.display);
    }

    if (isOpen) {
      // Hide header elements - use multiple approaches to ensure hiding
      if (header) {
        (header as HTMLElement).style.setProperty("display", "none", "important");
        (header as HTMLElement).style.setProperty("visibility", "hidden", "important");
        (header as HTMLElement).style.setProperty("opacity", "0", "important");
        console.log("EngineerRecruitModal - header hidden with multiple methods");
      }
      if (navHeader) {
        (navHeader as HTMLElement).style.setProperty("display", "none", "important");
        (navHeader as HTMLElement).style.setProperty("visibility", "hidden", "important");
        (navHeader as HTMLElement).style.setProperty("opacity", "0", "important");
        console.log("EngineerRecruitModal - nav hidden with multiple methods");
      }
      // Disable body scroll
      body.style.overflow = "hidden";
    } else {
      // Show header elements
      if (header) {
        (header as HTMLElement).style.removeProperty("display");
        (header as HTMLElement).style.removeProperty("visibility");
        (header as HTMLElement).style.removeProperty("opacity");
        console.log("EngineerRecruitModal - header properties removed");
      }
      if (navHeader) {
        (navHeader as HTMLElement).style.removeProperty("display");
        (navHeader as HTMLElement).style.removeProperty("visibility");
        (navHeader as HTMLElement).style.removeProperty("opacity");
        console.log("EngineerRecruitModal - nav properties removed");
      }
      // Enable body scroll
      body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      if (header) {
        (header as HTMLElement).style.removeProperty("display");
        (header as HTMLElement).style.removeProperty("visibility");
        (header as HTMLElement).style.removeProperty("opacity");
      }
      if (navHeader) {
        (navHeader as HTMLElement).style.removeProperty("display");
        (navHeader as HTMLElement).style.removeProperty("visibility");
        (navHeader as HTMLElement).style.removeProperty("opacity");
      }
      body.style.overflow = "unset";
    };
  }, [isOpen]);

  const springApi = useSpringRef();
  const overlaySpring = useSpring({
    ref: springApi,
    config: config.gentle,
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
  });

  const transApi = useSpringRef();
  const contentTransition = useTransition(isOpen, {
    ref: transApi,
    from: { opacity: 0, scale: 0.8, transform: "translateY(40px)" },
    enter: { opacity: 1, scale: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, scale: 0.8, transform: "translateY(40px)" },
    config: config.wobbly,
  });

  useChain(isOpen ? [springApi, transApi] : [transApi, springApi], [
    0,
    isOpen ? 0.15 : 0.6,
  ]);

  if (!isOpen) return null;

  return (
    <animated.div
      style={overlaySpring}
      className="tw fixed inset-0 bg-black/60 flex justify-center items-center z-[999999] p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="tw bg-[#E7E7E7] rounded-2xl w-full max-w-[1200px] max-h-[90vh] overflow-y-auto relative shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white/20 font-sans z-[1000000]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="tw absolute top-6 right-6 bg-black/5 border-none text-xl cursor-pointer z-[1000000] text-[#666] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-[10px] hover:bg-black/10 hover:text-[#333] hover:scale-105 active:scale-95"
              onClick={onClose}
            >
              ×
            </button>

            <div className="tw p-0 text-black">
              {/* Page Title Section */}
              <div className="tw pt-[60px] pb-10">
                <div className="tw flex items-center ml-[60px] mb-[30px]">
                  <div className="tw w-2 h-2 bg-black rounded-full mr-[15px]"></div>
                  <h1 className="tw font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-[40px] leading-[45px] text-black m-0">
                    Recruit
                  </h1>
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* Job Header */}
              <div className="tw my-10 pl-[60px]">
                <p className="tw font-[NotoSansJP,sans-serif] font-medium text-base leading-6 text-[#898989] m-0 mb-[6px]">
                  正社員・インターン採用
                </p>
                <h2 className="tw font-[NotoSansJP,sans-serif] font-bold text-[30px] leading-[35px] text-black m-0 mb-5">
                  エンジニア
                </h2>
                <p className="tw font-[NotoSansJP,sans-serif] font-medium text-base leading-[27px] text-black m-0 max-w-[500px]">
                  自社サービスのプロダクトの開発、運用を担当していただきます。
                </p>
              </div>

              {/* Job Details Section */}
              <div className="tw max-w-[1100px] mx-auto px-[60px] pb-[60px]">
                {/* 業務概要 */}
                <div className="tw mb-[60px]">
                  <h3 className="tw font-[NotoSansJP,sans-serif] font-medium text-[25px] leading-[45px] text-black m-0 mb-5">
                    業務概要
                  </h3>
                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        業務内容
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・自社SaaSの開発
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・TypeScript（Reactなど）を用いたフロントエンド開発
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・Go（Gin、GORMなど）、MySQLを用いたバックエンド開発
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・AWS（ECS、Auroraなど）を用いたインフラ開発やサービス運用
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・Dockerを用いた開発環境構築
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        仕事の魅力
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・成長真っ只中のBtoB SaaSの自社開発に幅広く関われる
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・GoやReactといったモダンな技術スタックを使って開発できる
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        応募資格（必須）
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・RDBMSを用いたバックエンド開発経験1年以上
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・Reactを用いたフロントエンド開発経験1年以上
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・IaaSを用いたインフラ開発やサービス運用経験1年以上
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        応募資格（歓迎）
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・自社SaaSの開発や運用の経験
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・Goを用いたバックエンド開発経験
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・TypeScriptを用いたフロントエンド開発経験
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・AWSを用いたインフラ開発やサービス運用経験
                      </p>
                    </div>
                  </div>
                </div>

                {/* 募集情報 */}
                <div className="tw mb-[60px]">
                  <h3 className="tw font-[NotoSansJP,sans-serif] font-medium text-[25px] leading-[45px] text-black m-0 mb-5">
                    募集情報
                  </h3>
                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        選考フロー
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        選考フローは下記を予定しております。
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        状況に応じて変更となる可能性がございますのでご了承ください。
                      </p>
                      <br />
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・書類選考
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・面接（2回）
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        ・採用
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        勤務地
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        勤務地記載
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        雇用形態
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        正社員
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        インターン
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        勤務時間
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        9:30〜18:30（休憩60分）
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>

                  <div className="tw flex mb-10 items-start">
                    <div className="tw min-w-[250px] mr-10">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap">
                        休日・休暇
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0">
                        土曜、日曜、祝日
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>
                </div>
              </div>

              {/* Contact Section */}
              <ContactSectionTailwind />

              {/* Others Section */}
              <div className="tw mt-[60px] mb-[60px]">
                <div className="tw max-w-[1200px] mx-auto px-[60px] pl-[200px] flex items-start gap-10">
                  <div className="tw flex items-center mt-5 shrink-0">
                    <div className="tw w-2 h-2 bg-black rounded-full mr-[15px]"></div>
                    <h3 className="tw font-[GeneralSansVariable,system-ui,sans-serif] font-semibold text-[30px] leading-[45px] text-black m-0">
                      Others
                    </h3>
                  </div>

                  <div className="tw bg-[#D0D0D0] rounded-xl relative overflow-hidden w-[696px] h-[285px] before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/pc-background.jpg')] before:bg-cover before:bg-center before:filter before:blur-[1px] before:z-[1]">
                    <div className="tw relative z-[2] p-[40px_50px] h-full flex flex-col justify-center">
                      <p className="tw font-[NotoSansJP,sans-serif] font-bold text-lg leading-[21px] text-white m-0 mb-[10px]">
                        アルバイト採用
                      </p>
                      <h4 className="tw font-[NotoSansJP,sans-serif] font-bold text-[28px] leading-[21px] text-white m-0 mb-10">
                        DIILoスタッフ
                      </h4>
                      {onSwitchToStaff && (
                        <Button
                          variant="ghost"
                          onClick={onSwitchToStaff}
                          className="tw bg-white text-black border-none rounded-[35px] px-8 py-3 font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-base leading-[26px] cursor-pointer transition-all duration-300 w-[120px] h-[45px] flex items-center justify-center hover:bg-transparent hover:text-white hover:border hover:border-white"
                        >
                          More
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default EngineerRecruitModal;
