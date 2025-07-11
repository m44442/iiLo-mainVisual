"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./MissionSectionWithAnimation.module.css";

const pictFlowData = [
  { text: "AI" },
  { text: "Web\nアプリケーション\n開発" },
  { text: "クラウド\nインフラ" },
  { text: "セキュリティ・\nプライバシー設計" },
  { text: "API・\n外部連携基盤" },
];

export default function PictFlowTestSection() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        setShown(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white">
      <h2 className="text-center text-2xl font-bold mb-8 text-black">
        pict-flowアニメーション テストセクション（本家構造）
      </h2>
      <div className={styles.pict} data-shown={shown ? "1" : "0"}>
        {/* 矢印部分 - PC版のみ表示 */}
        <div className={`${styles["pict-flow-arrow"]} hidden md:block`}>
          <div className={styles["pict-flow-arrow-body"]}>
            <svg viewBox="0 0 2811.84 52.39" width="100%" height="52">
              <path className="cls-1" d="M3.75,26.2H2803.34" />
              <path className="cls-2" d="M2783.64,6.5l19.7,19.7-19.7,19.69" />
            </svg>
          </div>
        </div>
        {/* PC版 - pict-flow本家構造 */}
        <div
          className={`${styles["pict-flow-wrap"]} hidden md:block`}
          style={{ position: "relative", height: "600px", width: "100%" }}
        >
          {pictFlowData.map((item, i) => {
            const total = pictFlowData.length;
            const baseLeft = 50; // 中央(%指定)
            const offset = (i - (total - 1) / 2) * (300 - 80); // 300:円サイズ, -80:間隔
            return (
              <div
                key={i}
                className={styles["pict-flow"]}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `calc(${baseLeft}% + ${offset}px)`,
                  transform: "translate(-50%, -50%)",
                  width: "300px",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <svg
                  viewBox="0 0 840 840"
                  width="300"
                  height="300"
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                >
                  <circle
                    cx="420"
                    cy="420"
                    r="350"
                    className={styles.animatedPath}
                    transform="rotate(-90 420 420)"
                  />
                </svg>
                <div
                  className={styles["pict-flow-txt"]}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="o">
                    <div className={styles.t}>{item.text}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* スマホ版 - レスポンシブレイアウト */}
        <div
          className={`${styles["pict-flow-wrap"]} block md:hidden`}
          style={{ position: "relative", height: "400px", width: "100%" }}
        >
          {/* 上段 2個の円 - より近く配置 */}
          {pictFlowData.slice(0, 2).map((item, i) => {
            const spacing = 80; // 下段と同じ重なり具合に調整
            const xPosition = (i - 0.5) * spacing; // 中央から左右に配置
            return (
              <div
                key={i}
                className={styles["pict-flow"]}
                style={{
                  position: "absolute",
                  top: "calc(50% - 40px)", // 上段
                  left: "50%",
                  transform: `translate(calc(-50% + ${xPosition}px), -50%)`,
                  width: "120px",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <svg
                  viewBox="0 0 840 840"
                  width="120"
                  height="120"
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                >
                  <circle
                    cx="420"
                    cy="420"
                    r="350"
                    className={styles.animatedPath}
                    transform="rotate(-90 420 420)"
                  />
                </svg>
                <div
                  className={styles["pict-flow-txt"]}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="o">
                    <div className={`${styles.t} text-xs text-center whitespace-pre-line`}>
                      {item.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* 下段 3個の円 */}
          {pictFlowData.slice(2).map((item, i) => {
            const spacing = 80;
            const xPosition = (i - 1) * spacing; // 3個なので中央が0、左が-80、右が80
            return (
              <div
                key={i + 2}
                className={styles["pict-flow"]}
                style={{
                  position: "absolute",
                  top: "calc(50% + 40px)", // 下段
                  left: "50%",
                  transform: `translate(calc(-50% + ${xPosition}px), -50%)`,
                  width: "120px",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <svg
                  viewBox="0 0 840 840"
                  width="120"
                  height="120"
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                >
                  <circle
                    cx="420"
                    cy="420"
                    r="350"
                    className={styles.animatedPath}
                    transform="rotate(-90 420 420)"
                  />
                </svg>
                <div
                  className={styles["pict-flow-txt"]}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="o">
                    <div className={`${styles.t} text-xs text-center whitespace-pre-line`}>
                      {item.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* 上段の矢印 - 矢印先端なし、画面端まで突き抜け */}
          <div
            className={styles["pict-flow-arrow"]}
            style={{
              position: "absolute",
              top: "calc(50% - 40px)",
              left: 0,
              width: "100%",
              transform: "translateY(-50%)",
              zIndex: 0,
            }}
          >
            <div className={styles["pict-flow-arrow-body"]}>
              <svg viewBox="0 0 2811.84 52.39" width="100%" height="20">
                <path className="cls-1" d="M0,26.2H2811.84" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="8" />
              </svg>
            </div>
          </div>
          
          {/* 下段の矢印 - 矢印先端あり、左端突き抜け、右端余白 */}
          <div
            className={styles["pict-flow-arrow"]}
            style={{
              position: "absolute",
              top: "calc(50% + 40px)",
              left: 0,
              width: "calc(100% - 20px)",
              transform: "translateY(-50%)",
              zIndex: 0,
            }}
          >
            <div className={styles["pict-flow-arrow-body"]}>
              <svg viewBox="0 0 2811.84 52.39" width="100%" height="20">
                <path className="cls-1" d="M0,26.2H2783.34" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="8" />
                <path className="cls-2" d="M2763.64,6.5l19.7,19.7-19.7,19.69" stroke="#000" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
