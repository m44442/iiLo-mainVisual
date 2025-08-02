"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleSystem from "./components/effects/ParticleSystem";
import IiLoCorporateSite from "./components/iiLoCorporateSite";
export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Fixed Particle Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        {/* Gradient overlay to fade particles */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 70%, #E7E7E7 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <Canvas
          camera={{
            fov: 60,
            aspect:
              typeof window !== "undefined"
                ? window.innerWidth / window.innerHeight
                : 1,
            near: 0.1,
            far: 20000,
            position: [0, 0, 15],
          }}
          gl={{
            antialias: true,
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ParticleSystem />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <IiLoCorporateSite />
      </div>
    </div>
  );
}
