'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// ParticleAnimationコンポーネントをクライアントサイドでのみロード
const ParticleAnimation = dynamic(
  () => import('./components/ParticleAnimation'),
  { ssr: false }
);

export default function Home() {
  // コンポーネントがマウントされたかどうかを追跡
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // クライアント側のレンダリングのみを確実に行う
  if (!isMounted) {
    return null;
  }

  return (
    <main className="relative w-full h-screen">
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#ffffff' // 背景を白に設定
          }}
        >
          <ParticleAnimation 

            particleCount={60000} 
            animationDuration={9.0} 
          />
          <OrbitControls enableDamping dampingFactor={0.4} />
        </Canvas>
      </div>
      
      
    </main>
  );
}