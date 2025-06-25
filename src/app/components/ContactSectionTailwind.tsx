"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";

const ContactSectionTailwind = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("フォーム送信:", formData);
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
  return (
    <section className="bg-black py-20 m-0" id="contact">
      <div className="max-w-[1200px] mx-auto px-[164px] max-md:px-6">
        <div className="flex items-start gap-10 max-w-[1200px] mx-auto max-md:flex-col max-md:gap-6">
          {/* Section Header */}
          <div className="flex items-center -ml-10 flex-shrink-0 mt-5 max-md:ml-0 max-md:mt-0">
            <div className="w-2 h-2 bg-[#E7E7E7] rounded-full mr-[15px]"></div>
            <h2 className="font-['General_Sans_Variable'] font-semibold text-[30px] leading-[45px] text-white m-0 max-md:text-[20px] max-md:leading-[36px] max-[480px]:mb-[30px]">
              Contact
            </h2>
          </div>

          {/* Contact Card */}
          <div className="bg-[#E7E7E7] rounded-xl relative overflow-hidden flex-1 p-[30px] mt-[35px] max-md:mt-0 max-md:mx-6 max-md:max-w-none max-md:h-[300px] max-[480px]:h-[250px]">
            {/* Backdrop overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-[#1e1e1e]/90 opacity-90 blur-[2.5px] z-[1]"></div>

            {/* Content */}
            <div className="relative z-[2] p-[30px] flex flex-col justify-center max-md:p-10 max-[480px]:p-5">
              <h4 className="font-['Noto_Sans_JP'] font-medium text-[28px] leading-[21px] text-white m-0 mb-5 max-md:text-[24px] max-md:leading-[28px] max-[480px]:text-[20px] max-[480px]:leading-[24px] max-[480px]:mb-[15px]">
                ご質問・お問い合わせ
              </h4>
              <p className="font-['Noto_Sans_JP'] font-normal text-base leading-[27px] text-white m-0 mb-[60px] max-md:text-sm max-md:leading-[24px] max-md:mb-10 max-[480px]:text-[13px] max-[480px]:leading-5 max-[480px]:mb-[30px]">
                お気軽にお問い合わせください。
              </p>
              <Button
                onClick={openModal}
                variant="ghost"
                className="bg-[#E7E7E7] text-black border-none rounded-[35px] py-3 px-8 font-['General_Sans_Variable'] font-medium text-base leading-[26px] cursor-pointer transition-all duration-300 ease-in-out w-[150px] h-[45px] flex items-center justify-center hover:bg-transparent hover:text-white hover:border hover:border-white max-md:w-[120px] max-md:h-10 max-md:text-sm max-[480px]:w-[100px] max-[480px]:h-9 max-[480px]:text-xs max-[480px]:py-2 max-[480px]:px-4"
              >
                more
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default ContactSectionTailwind;
