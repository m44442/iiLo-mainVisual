"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ContactModal from "../modals/ContactModal";
import MorphingText from "../effects/MorphingText";

interface ContactSectionTailwindProps {
  onContactClick?: () => void;
  isInModal?: boolean;
}

const ContactSectionTailwind = ({ onContactClick, isInModal = false }: ContactSectionTailwindProps = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [hasCardAnimated, setHasCardAnimated] = useState(false);
  const [startTitleMorphing, setStartTitleMorphing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせを送信しました。ありがとうございます。");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <div className="max-w-[1200px] mx-auto px-[164px] max-md:px-6 max-[480px]:px-[23px]">
        <div className="flex items-start gap-10 max-w-[1200px] mx-auto max-md:flex-col max-md:gap-6 max-[480px]:flex-col max-[480px]:gap-[20px]">
          {/* Section Header */}
          <div className={`flex items-center -ml-40 flex-shrink-0 mt-5 max-md:ml-0 max-md:mt-0 max-[480px]:ml-[19px] max-[480px]:mt-0 transition-opacity duration-500 ease-in-out min-w-[140px] max-[480px]:min-w-[100px] ${startTitleMorphing || isInModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-2 h-2 bg-[#E7E7E7] rounded-full mr-[15px] max-[480px]:bg-white"></div>
            <MorphingText
              targetText="Contact"
              speed={50}
              autoStart={startTitleMorphing || isInModal}
              className="font-['General_Sans_Variable','General_Sans',sans-serif] font-semibold text-[30px] leading-[45px] text-white m-0 max-[480px]:text-3xl max-[480px]:leading-[38px] w-[110px] max-[480px]:w-[85px]"
              chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>?!"
              incrementRate={0.33}
            />
          </div>

          {/* Contact Card */}
          <div ref={cardRef} className="bg-[url('/Mask%20group.svg')] bg-cover bg-center rounded-xl relative overflow-hidden flex-1 p-[30px] mt-[35px] max-md:mt-0 max-md:mx-2 max-md:max-w-none max-md:h-[300px] max-[480px]:w-[330px] max-[480px]:h-[180px] max-[480px]:ml-0 max-[480px]:mr-auto max-[480px]:mt-[20px] max-[480px]:rounded-[12px] max-[480px]:p-0" style={{
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
              <Button
                onClick={onContactClick || openModal}
                variant="ghost"
                className="bg-[#E7E7E7] text-black border-none ml-[-63px] rounded-[35px] py-3 px-8 font-['General_Sans_Variable','General_Sans',sans-serif] font-medium text-base leading-[26px] cursor-pointer transition-all duration-300 ease-in-out w-[150px] h-[45px] flex items-center justify-center hover:bg-transparent hover:text-white hover:border hover:border-white max-md:w-[120px] max-md:h-10 max-md:text-sm max-[480px]:w-[50px] max-[480px]:h-[28px] max-[480px]:text-[10px] max-[480px]:rounded-[14px] max-[480px]:bg-white max-[480px]:self-start max-[480px]:ml-0"
              >
                More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal - only show if no external handler */}
      {!onContactClick && <ContactModal isOpen={isModalOpen} onClose={closeModal} />}
    </section>
    </>
  );
};

export default ContactSectionTailwind;
