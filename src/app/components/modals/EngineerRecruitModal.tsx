"use client";

import React, { useEffect } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
// import styles from "./RecruitModal.module.css"; // Replaced with Tailwind classes
import ContactSectionTailwind from "../sections/ContactSectionTailwind";
import { Button } from "../../../../components/ui/button";

interface EngineerRecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToStaff?: () => void;
  onContactClick?: () => void;
}

const EngineerRecruitModal = ({
  isOpen,
  onClose,
  onSwitchToStaff,
  onContactClick,
}: EngineerRecruitModalProps) => {

  // ヘッダーの表示/非表示制御
  useEffect(() => {
    const header = document.querySelector("header");
    const navHeader = document.querySelector("nav");

    if (isOpen) {
      // Hide header elements
      if (header) {
        (header as HTMLElement).style.display = "none";
      }
      if (navHeader) {
        (navHeader as HTMLElement).style.display = "none";
      }
    } else {
      // Show header elements
      if (header) {
        header.removeAttribute('style');
      }
      if (navHeader) {
        navHeader.removeAttribute('style');
      }
    }

    // Cleanup on unmount
    return () => {
      if (header) {
        header.removeAttribute('style');
      }
      if (navHeader) {
        navHeader.removeAttribute('style');
      }
    };
  }, [isOpen]);

  // モーダル表示時の背景スクロール制御
  useScrollLock(isOpen);

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
      className="tw fixed inset-0 bg-black/60 flex justify-center items-center z-[999999] p-5 backdrop-blur-sm max-[480px]:p-0"
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="tw bg-[#E7E7E7] rounded-2xl w-full max-w-[1280px] max-h-[80vh] overflow-y-auto relative shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white/20 font-sans z-[1000000] max-[480px]:rounded-none max-[480px]:max-w-none max-[480px]:w-screen max-[480px]:h-screen max-[480px]:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="tw absolute top-6 right-6 bg-black/5 border-none text-xl cursor-pointer z-[1000000] text-[#666] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-[10px] hover:bg-black/10 hover:text-[#333] hover:scale-105 active:scale-95 max-[480px]:top-4 max-[480px]:right-4 max-[480px]:w-8 max-[480px]:h-8 max-[480px]:text-lg"
              onClick={onClose}
            >
              ×
            </button>

            <div className="tw p-0 text-black">
              {/* Page Title Section */}
              <div className="tw pt-[60px] pb-10 max-[480px]:pt-8 max-[480px]:pb-6">
                <div className="tw flex items-center ml-[60px] mb-[30px] max-[480px]:ml-6 max-[480px]:mb-6">
                  <div className="tw w-2 h-2 bg-black rounded-full mr-[15px] max-[480px]:w-1.5 max-[480px]:h-1.5 max-[480px]:mr-3"></div>
                  <h1 className="tw font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-[40px] leading-[45px] text-black m-0 max-[480px]:text-[28px] max-[480px]:leading-[32px]">
                    Recruit
                  </h1>
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* Job Header */}
              <div className="tw my-10 pl-[60px] max-[480px]:my-6 max-[480px]:pl-6">
                <p className="tw font-[NotoSansJP,sans-serif] font-medium text-base leading-6 text-[#898989] m-0 mb-[6px] max-[480px]:text-sm">
                  正社員・インターン採用
                </p>
                <h2 className="tw font-[NotoSansJP,sans-serif] font-bold text-[30px] leading-[35px] text-black m-0 mb-5 max-[480px]:text-[24px] max-[480px]:leading-[28px] max-[480px]:mb-3">
                  エンジニア
                </h2>
                <p className="tw font-[NotoSansJP,sans-serif] font-medium text-base leading-[27px] text-black m-0 max-w-[500px] max-[480px]:text-sm max-[480px]:leading-[24px]">
                  自社サービスのプロダクトの開発、運用を担当していただきます。
                </p>
              </div>

              {/* Job Details Section */}
              <div className="tw max-w-[1100px] mx-auto px-[60px] pb-[60px] max-[480px]:px-6 max-[480px]:pb-6">
                {/* 業務概要 */}
                <div className="tw mb-[60px] max-[480px]:mb-6">
                  <h3 className="tw font-[NotoSansJP,sans-serif] font-medium text-[25px] leading-[45px] text-black m-0 mb-5 max-[480px]:text-[20px] max-[480px]:leading-[24px] max-[480px]:mb-3">
                    業務概要
                  </h3>
                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:mb-6"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        業務内容
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・自社SaaSの開発
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・TypeScript（Reactなど）を用いたフロントエンド開発
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・Go（Gin、GORMなど）、MySQLを用いたバックエンド開発
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・AWS（ECS、Auroraなど）を用いたインフラ開発やサービス運用
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・Dockerを用いた開発環境構築
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        仕事の魅力
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・成長真っ只中のBtoB SaaSの自社開発に幅広く関われる
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・GoやReactといったモダンな技術スタックを使って開発できる
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        応募資格（必須）
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・RDBMSを用いたバックエンド開発経験1年以上
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・Reactを用いたフロントエンド開発経験1年以上
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・IaaSを用いたインフラ開発やサービス運用経験1年以上
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        応募資格（歓迎）
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・自社SaaSの開発や運用の経験
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・Goを用いたバックエンド開発経験
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・TypeScriptを用いたフロントエンド開発経験
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・AWSを用いたインフラ開発やサービス運用経験
                      </p>
                    </div>
                  </div>
                </div>

                {/* 募集情報 */}
                <div className="tw mb-[60px] max-[480px]:mb-6">
                  <h3 className="tw font-[NotoSansJP,sans-serif] font-medium text-[25px] leading-[45px] text-black m-0 mb-5 max-[480px]:text-[20px] max-[480px]:leading-[24px] max-[480px]:mb-3">
                    募集情報
                  </h3>
                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:mb-6"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        選考フロー
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        選考フローは下記を予定しております。
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        状況に応じて変更となる可能性がございますのでご了承ください。
                      </p>
                      <br />
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・書類選考
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・面接（2回）
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        ・採用
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        勤務地
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        勤務地記載
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        雇用形態
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        正社員
                      </p>
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        インターン
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        勤務時間
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        9:30〜18:30（休憩60分）
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10 max-[480px]:hidden"></div>

                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        休日・休暇
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 mb-2 last:mb-0 max-[480px]:text-sm max-[480px]:leading-[24px]">
                        土曜、日曜、祝日
                      </p>
                    </div>
                  </div>

                  <div className="tw w-full h-px bg-[#898989] m-0 mb-10"></div>
                </div>
              </div>

              {/* Contact Section */}
              <ContactSectionTailwind onContactClick={onContactClick} />

              {/* Others Section */}
              <div className="tw bg-[#E7E7E7] py-20 m-0 max-[480px]:py-[40px] max-[480px]:mt-6 max-[480px]:mb-6 max-[480px]:pb-30">
                <div className="tw max-w-[1200px] mx-auto px-[164px] max-md:px-6 max-[480px]:px-[23px]">
                  <div className="tw flex items-start gap-10 max-w-[1200px] mx-auto max-md:flex-col max-md:gap-6 max-[480px]:flex-col max-[480px]:gap-[20px]">
                    {/* Section Header */}
                    <div className="tw flex items-center -ml-40 flex-shrink-0 mt-5 max-md:ml-0 max-md:mt-0 max-[480px]:ml-[19px] max-[480px]:mt-0">
                      <div className="tw w-2 h-2 bg-black rounded-full mr-[15px] max-[480px]:bg-black"></div>
                      <h2 className="tw font-['General_Sans_Variable','General_Sans',sans-serif] font-semibold text-[30px] leading-[45px] text-black m-0 max-[480px]:text-3xl max-[480px]:leading-[38px]">
                        Others
                      </h2>
                    </div>

                    {/* Others Card */}
                    <div className="tw bg-[url('/pc-1207886_1280%201%20(2).svg')] bg-cover bg-center rounded-xl relative overflow-hidden flex-1 p-[30px] mt-[35px] max-md:mt-0 max-md:mx-2 max-md:max-w-none max-md:h-[300px] max-[480px]:w-[330px] max-[480px]:h-[180px] max-[480px]:ml-0 max-[480px]:mr-auto max-[480px]:mt-[20px] max-[480px]:rounded-[12px] max-[480px]:p-0">
                      {/* Backdrop overlay */}
                      <div className="tw absolute inset-0 bg-gradient-to-br from-black/80 to-[#1e1e1e]/90 opacity-10 blur-[2.5px] z-[1]"></div>

                      {/* Content */}
                      <div className="tw relative z-[2] p-[80px] flex flex-col justify-center max-md:p-10 max-[480px]:p-[23px] max-[480px]:h-full max-[480px]:justify-start max-[480px]:pt-[25px]">
                        <h4 className="tw font-['Noto_Sans_JP','Noto_Sans',sans-serif] ml-[-63px] font-medium text-[28px] leading-[21px] text-white m-0 mb-[90px] max-md:text-[24px] max-md:leading-[28px] max-md:mb-[30px] max-[480px]:text-[14px] max-[480px]:leading-[18px] max-[480px]:mb-[20px] max-[480px]:ml-0">
                          アルバイト採用
                        </h4>
                        <p className="tw font-['Noto_Sans_JP','Noto_Sans',sans-serif] ml-[-63px] font-bold text-[32px] leading-[21px] text-white m-0 mb-[90px] max-md:text-[28px] max-md:leading-[28px] max-md:mb-[30px] max-[480px]:text-[16px] max-[480px]:leading-[20px] max-[480px]:mb-[20px] max-[480px]:ml-0">
                          DIILoスタッフ
                        </p>
                        {onSwitchToStaff && (
                          <Button
                            onClick={onSwitchToStaff}
                            variant="ghost"
                            className="tw bg-[#E7E7E7] text-black border-none ml-[-63px] rounded-[35px] py-3 px-8 font-['General_Sans_Variable','General_Sans',sans-serif] font-medium text-base leading-[26px] cursor-pointer transition-all duration-300 ease-in-out w-[150px] h-[45px] flex items-center justify-center hover:bg-transparent hover:text-white hover:border hover:border-white max-md:w-[120px] max-md:h-10 max-md:text-sm max-[480px]:w-[50px] max-[480px]:h-[28px] max-[480px]:text-[10px] max-[480px]:rounded-[14px] max-[480px]:bg-white max-[480px]:self-start max-[480px]:ml-0"
                          >
                            More
                          </Button>
                        )}
                      </div>
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
