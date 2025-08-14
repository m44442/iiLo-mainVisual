"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { HoverButton } from "../ui/hover-button";
import ContactModal from "../modals/ContactModal";
import MorphingText from "../effects/MorphingText";

interface ContactSectionTailwindProps {
  onContactClick?: () => void;
  isInModal?: boolean;
}

const ContactSectionTailwind = ({ onContactClick, isInModal = false }: ContactSectionTailwindProps = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [hasCardAnimated, setHasCardAnimated] = useState(false);
  const [startTitleMorphing, setStartTitleMorphing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  // モーダル表示時の背景スクロール制御
  useScrollLock(isModalOpen);

  // タイトル要素を監視してタイトルとカードを連動
  useEffect(() => {
    // モーダル内の場合は通常のスクロール監視をスキップ
    if (isInModal) {
      return;
    }

    const titleElement = document.querySelector('#contact .flex.items-center');
    if (!titleElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCardAnimated) {
            setStartTitleMorphing(true);
            setTimeout(() => {
              setIsCardVisible(true);
              setHasCardAnimated(true);
            }, 800); // タイトルアニメーション完了後にカードアニメーション開始
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(titleElement);

    return () => {
      observer.unobserve(titleElement);
    };
  }, [hasCardAnimated, isInModal]);
  return (
    <>   
      <section className="font-sans bg-black py-20 m-0 max-[480px]:py-[40px]" id="contact">
        {/* Section Header */}
        <div className={`flex items-center ${isInModal ? 'ml-[20px] md:ml-[20px]' : 'ml-[120px]'} mb-10 max-md:ml-[30px] max-md:mb-6 max-[480px]:ml-[80px] max-[480px]:mb-4 transition-opacity duration-500 ease-in-out ${startTitleMorphing || isInModal ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-2 h-2 bg-[#E7E7E7] rounded-full mr-[15px] max-[480px]:bg-white"></div>
          <MorphingText
            targetText="Contact"
            speed={40}
            autoStart={startTitleMorphing || isInModal}
            className="font-['General_Sans_Variable','General_Sans',sans-serif] font-semibold text-[30px] leading-[45px] text-white m-0 max-[480px]:text-3xl max-[480px]:leading-[38px] w-[110px] max-[480px]:w-[85px]"
            chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>?!"
            incrementRate={0.33}
          />
        </div>

        {/* Contact Card */}
        <div className="max-w-[1200px] mx-auto px-[164px] max-md:px-6 max-[480px]:px-[23px] md:-mt-16 max-md:mt-0">
          <div ref={cardRef} className="bg-[url('/Mask%20group.svg')] bg-cover bg-center rounded-xl relative overflow-hidden p-[30px] max-md:mx-2 max-md:max-w-none max-md:h-[300px] max-[480px]:w-[330px] max-[480px]:h-[180px] max-[480px]:ml-0 max-[480px]:mr-auto max-[480px]:mt-[20px] max-[480px]:rounded-[12px] max-[480px]:p-0" style={{
            clipPath: (isCardVisible || isInModal) ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
            transition: isCardVisible ? 'clip-path 1.5s var(--ease-explosive)' : 'none',
            willChange: 'clip-path',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}>
            {/* Backdrop overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-[#1e1e1e]/90 opacity-10 blur-[2.5px] z-[1]"></div>

            {/* Content */}
            <div className="relative z-[2] p-[80px] flex flex-col justify-center max-md:p-10 max-[480px]:p-[23px] max-[480px]:h-full max-[480px]:justify-start max-[480px]:pt-[25px]">
              <h4 className="font-['Noto_Sans_JP','Noto_Sans',sans-serif] ml-[-63px] font-medium text-[28px] leading-[21px] text-white m-0 mb-[90px] max-md:text-[24px] max-md:leading-[28px] max-md:mb-[30px] max-[480px]:text-[14px] max-[480px]:leading-[18px] max-[480px]:mb-[20px] max-[480px]:ml-0">
                ご相談・お問合せ
              </h4>
              <HoverButton
                onClick={onContactClick || openModal}
                normalBg="#ffffff"
                normalText="#000000"
                hoverBg="#000000"
                hoverText="#ffffff"
                className="ml-[-63px] rounded-[35px] w-[150px] h-[45px] font-['General_Sans_Variable','General_Sans',sans-serif] font-medium text-base leading-[45px] text-center cursor-pointer max-md:w-[120px] max-md:h-10 max-md:text-sm max-[480px]:w-[50px] max-[480px]:h-[28px] max-[480px]:text-[10px] max-[480px]:rounded-[25px] max-[480px]:ml-0"
              >
                More
              </HoverButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal - only show if no external handler */}
      {!onContactClick && <ContactModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
};

export default ContactSectionTailwind;
