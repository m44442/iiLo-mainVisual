import AnimationTest from "../components/AnimationTest";
import PictFlowTestSection from "../components/PictFlowTestSection";
import PictFlowTestSectionOriginal from "./PictFlowTestSection_original";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] p-5">
      <h1 className="text-center mb-12 text-2xl text-[#333]">
        アニメーションテストページ
      </h1>

      <p className="text-center mb-24 text-[#666]">
        下にスクロールするとアニメーションが開始されます
      </p>

      <div className="h-[50vh]"></div>

      <h2 className="text-center mb-8 text-lg text-[#333]">
        完璧なTailwind CSS＋CSS Module併用版
      </h2>
      <p className="text-center text-[#888] mb-2">
        レイアウト・色・サイズはTailwind、アニメーションやclip-path等はCSS
        moduleで制御
      </p>

      {/* 既存のテスト */}
      <AnimationTest />

      {/* 分離・本家構造pict-flowテスト */}
      <div className="my-24">
        <PictFlowTestSection />
      </div>

      <div className="h-[50vh]"></div>

      <p className="text-center text-[#666]">アニメーション確認用ページ</p>
    </div>
  );
}
