"use client";

import React, { useEffect, useState } from "react";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useScrollLock } from "../../hooks/useScrollLock";
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    inquiryType: "service", // "service" or "recruitment"
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせを送信しました。ありがとうございます。");
    onClose();
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

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <animated.div
      style={overlaySpring}
      className="tw fixed inset-0 bg-black/60 flex justify-center items-center z-[9999999] p-5 backdrop-blur-sm max-[480px]:p-0"
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="tw bg-[#E7E7E7] rounded-2xl w-full max-w-[1200px] max-h-[90vh] overflow-y-auto relative shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white/20 font-sans z-[10000000] max-[480px]:rounded-none max-[480px]:max-w-none max-[480px]:w-screen max-[480px]:h-screen max-[480px]:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="tw absolute top-6 right-6 bg-black/5 border-none text-xl cursor-pointer z-[10000001] text-[#666] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-[10px] hover:bg-black/10 hover:text-[#333] hover:scale-105 active:scale-95 max-[480px]:top-4 max-[480px]:right-4 max-[480px]:w-8 max-[480px]:h-8 max-[480px]:text-lg"
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
                    Contact
                  </h1>
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* Contact Form Section */}
              <div className="tw max-w-[1100px] mx-auto px-[60px] pb-[60px] max-[480px]:px-6 max-[480px]:pb-6">
                {/* 確認メッセージ */}
                <div className="tw mb-10 max-[480px]:mb-6">
                  <p className="tw font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] text-black m-0 max-w-[669px] text-left max-[480px]:text-sm max-[480px]:leading-[24px]">
                    確認後、担当者よりご連絡させていただきます。
                    <br />
                    内容によっては回答にお時間をいただく場合がございますこと、ご了承お願い申し上げます。
                    <br />
                    *印項目は必須入力
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="tw space-y-8 max-[480px]:space-y-6">
                  {/* お問い合わせ項目 */}
                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        お問い合わせ項目*
                      </span>
                    </div>
                    <div className="tw flex-1 space-y-3 max-[480px]:space-y-4">
                      <label className="tw flex items-center cursor-pointer">
                        <div className="tw w-[18px] h-[18px] border border-black rounded-full mr-3 flex items-center justify-center bg-white">
                          <input
                            type="radio"
                            name="inquiryType"
                            value="service"
                            checked={formData.inquiryType === "service"}
                            onChange={(e) => handleRadioChange(e.target.value)}
                            className="tw sr-only"
                          />
                          {formData.inquiryType === "service" && (
                            <div className="tw w-2 h-2 bg-black rounded-full"></div>
                          )}
                        </div>
                        <span className="tw font-[NotoSansJP,sans-serif] font-normal text-sm leading-[24px] text-black">
                          サービスに関するご連絡・お問い合わせ
                        </span>
                      </label>
                      <label className="tw flex items-center cursor-pointer">
                        <div className="tw w-[18px] h-[18px] border border-black rounded-full mr-3 flex items-center justify-center bg-white">
                          <input
                            type="radio"
                            name="inquiryType"
                            value="recruitment"
                            checked={formData.inquiryType === "recruitment"}
                            onChange={(e) => handleRadioChange(e.target.value)}
                            className="tw sr-only"
                          />
                          {formData.inquiryType === "recruitment" && (
                            <div className="tw w-2 h-2 bg-black rounded-full"></div>
                          )}
                        </div>
                        <span className="tw font-[NotoSansJP,sans-serif] font-normal text-sm leading-[24px] text-black">
                          求人に対するご応募
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* お名前 */}
                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        お名前*
                      </span>
                    </div>
                    <div className="tw flex-1 flex gap-4">
                      <div className="tw flex-1">
                        <Input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="tw w-full h-[60px] px-4 border-[0.5px] border-[#898989] rounded-[5px] text-base bg-white font-[NotoSansJP,sans-serif] max-[480px]:h-[50px] max-[480px]:text-sm"
                          placeholder="姓"
                        />
                      </div>
                      <div className="tw flex-1">
                        <Input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="tw w-full h-[60px] px-4 border-[0.5px] border-[#898989] rounded-[5px] text-base bg-white font-[NotoSansJP,sans-serif] max-[480px]:h-[50px] max-[480px]:text-sm"
                          placeholder="名"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 会社名・学校名・所属 */}
                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        会社名・学校名・所属
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="tw w-full h-[60px] px-4 border-[0.5px] border-[#898989] rounded-[5px] text-base bg-white font-[NotoSansJP,sans-serif]"
                        placeholder="◯◯◯株式会社"
                      />
                    </div>
                  </div>

                  {/* メールアドレス */}
                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        メールアドレス*
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <Input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="tw w-full h-[60px] px-4 border-[0.5px] border-[#898989] rounded-[5px] text-base bg-white font-[NotoSansJP,sans-serif]"
                        placeholder="info@mail.com"
                      />
                    </div>
                  </div>

                  {/* 電話番号 */}
                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        電話番号*
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <Input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="tw w-full h-[60px] px-4 border-[0.5px] border-[#898989] rounded-[5px] text-base bg-white font-[NotoSansJP,sans-serif]"
                        placeholder="000-0000-0000"
                      />
                    </div>
                  </div>

                  {/* お問い合わせ内容 */}
                  <div className="tw flex mb-10 items-start max-[480px]:block max-[480px]:mb-6">
                    <div className="tw min-w-[250px] mr-10 max-[480px]:mr-0 max-[480px]:mb-4">
                      <span className="tw inline-block bg-black text-white font-[NotoSansJP,sans-serif] font-normal text-base leading-[27px] px-4 whitespace-nowrap max-[480px]:text-sm max-[480px]:leading-[24px]">
                        お問い合わせ内容*
                      </span>
                    </div>
                    <div className="tw flex-1">
                      <Textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="tw w-full h-[200px] p-4 border-[0.5px] border-[#898989] rounded-[5px] text-base bg-white font-[NotoSansJP,sans-serif] resize-none max-[480px]:h-[150px] max-[480px]:text-sm"
                        placeholder="お問合せ内容を記載してください。"
                      />
                    </div>
                  </div>

                  {/* 送信ボタン */}
                  <div className="tw flex justify-start mt-20 max-[480px]:mt-12">
                    <Button
                      type="submit"
                      variant="ghost"
                      className="tw bg-black text-white border-none rounded-[35px] px-8 py-3 font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-base leading-[26px] cursor-pointer transition-all duration-300 w-[120px] h-[45px] flex items-center justify-center hover:bg-white hover:text-black hover:border hover:border-black max-[480px]:w-[100px] max-[480px]:h-[40px] max-[480px]:px-6 max-[480px]:py-2 max-[480px]:text-sm"
                    >
                      送信
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Mobile bottom padding */}
              <div className="tw max-[480px]:pb-30"></div>
            </div>
          </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default ContactModal;
