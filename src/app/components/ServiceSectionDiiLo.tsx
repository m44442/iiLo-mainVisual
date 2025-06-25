"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ServiceSectionDiiLo = () => {
  return (
    <section
      id="service"
      className="tw relative bg-black"
      style={{
        position: "relative",
        width: "1728px",
        height: "899px",
        left: "calc(50% - 1728px/2)",
        background: "#000000",
      }}
    >
      {/* Service タイトル */}
      <div className="absolute left-[263px] top-[150px] flex items-center">
        <div className="w-2 h-2 bg-white rounded-full mr-[15px]"></div>
        <h2 className="font-['General_Sans_Variable'] font-semibold text-[25px] leading-[45px] text-white">
          Service
        </h2>
      </div>

      {/* DIILoプロダクトエリア */}
      <div
        className="tw absolute"
        style={{
          width: "800px",
          height: "310px",
          left: "490px",
          top: "162px",
        }}
      >
        {/* 背景 */}
        <div
          className="tw absolute bg-[#E7E7E7] rounded-[12px]"
          style={{
            width: "800px",
            height: "310px",
            left: "0px",
            top: "0px",
          }}
        />

        {/* 歯科クリニック特化 LINEマーケティングSaaS */}
        <div
          className="tw absolute font-['Noto_Sans_JP'] font-normal text-[15px] leading-[30px] text-black"
          style={{
            width: "255px",
            height: "60px",
            left: "53px",
            top: "40px",
          }}
        >
          歯科クリニック特化
          <br />
          LINEマーケティングSaaS
        </div>

        {/* DIILoロゴ */}
        <div
          className="tw absolute"
          style={{
            width: "160.46px",
            height: "78px",
            left: "54px",
            top: "119px",
          }}
        >
          <Image
            src="/images/IILo-DIILo_logo_DIILo_logo-b.png"
            alt="DIILo Logo"
            width={160}
            height={78}
            className="tw w-full h-full object-contain"
          />
        </div>

        {/* ディーロ */}
        <div
          className="tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[21px] text-black"
          style={{
            width: "63px",
            height: "21px",
            left: "225px",
            top: "176px",
          }}
        >
          ディーロ
        </div>

        {/* PCオブジェクト */}
        <div
          className="tw absolute"
          style={{
            width: "401px",
            height: "208px",
            left: "361px",
            top: "46px",
          }}
        >
          <Image
            src="/object-pc.svg"
            alt="PC Object"
            width={451}
            height={258}
            className="tw w-full h-full object-contain"
          />
        </div>

        {/* スマホオブジェクト */}
        <div
          className="tw absolute"
          style={{
            width: "80px",
            height: "143px",
            left: "325px",
            top: "115px",
          }}
        >
          <Image
            src="/object-sp.svg"
            alt="Smartphone Object"
            width={80}
            height={143}
            className="tw w-full h-full object-contain"
          />
        </div>

        {/* Moreボタン */}
        <div
          className="tw absolute"
          style={{
            width: "100px",
            height: "35px",
            left: "75px",
            top: "233px",
          }}
        >
          <Button variant="pagetop" size="lg" className="tw w-full h-full">
            More
          </Button>
        </div>

        {/* PC反射 */}
        <div
          className="tw absolute overflow-hidden"
          style={{
            width: "358px",
            height: "129px",
            left: "382px",
            top: "208px",
            transform: "scaleY(1)",
            opacity: "0.3",
          }}
        >
          <Image
            src="/object-pc (1).svg"
            alt="PC Reflection"
            width={451}
            height={258}
            className="tw w-full h-full object-contain"
          />
        </div>

        {/* スマホ反射 */}
        <div
          className="tw absolute"
          style={{
            width: "71px",
            height: "81px",
            left: "330px",
            top: "236px",
            transform: "scaleY(1)",
            opacity: "0.3",
          }}
        >
          <Image
            src="/object-sp re.svg"
            alt="Smartphone Reflection"
            width={80}
            height={163}
            className="tw w-full h-full object-contain"
          />
        </div>
      </div>

      {/* 説明テキスト群 */}
      {/* 1行目 */}
      <div
        className="tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white"
        style={{
          width: "900px",
          height: "27px",
          left: "calc(50% - 760px/2)",
          top: "542px",
        }}
      >
        DiiLoは、歯科クリニック向けに特化したLINE公式アカウント連携型のマーケティング＆患者管理ツールです。
      </div>

      {/* 2行目 */}
      <div
        className="tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white"
        style={{
          width: "900px",
          height: "54px",
          left: "calc(50% - 760px/2)",
          top: "584px",
        }}
      >
        患者データ管理、予約、保険証のアップロード、患者アンケート、セグメント別のメッセージ配信、個別チャット。
        <br />
        さらにリッチメニューの自動生成や、Stripe決済機能までを一元管理。さらにそれらを用いたマーケティング情報の獲得。
      </div>

      {/* 3行目 */}
      <div
        className="tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white"
        style={{
          width: "900px",
          height: "27px",
          left: "calc(50% - 760px/2)",
          top: "653px",
        }}
      >
        従来の汎用ツールと異なり、導入時点からテンプレートが整っており、専門知識不要で"その日から使える"設計に。
      </div>

      {/* 4行目 */}
      <div
        className="tw absolute font-['Noto_Sans_JP'] font-normal text-[16px] leading-[27px] text-white"
        style={{
          width: "900px",
          height: "54px",
          left: "calc(50% - 760px/2)",
          top: "695px",
        }}
      >
        「歯科現場への最適化」と、誰でも直感的に扱えるユーザーインターフェースを両立させた、次世代の歯科DXプラットフォームです。
      </div>
    </section>
  );
};

export default ServiceSectionDiiLo;
