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
          camera={{ position: [0, 0, 30], fov: 60 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <color attach="background" args={['#ffffff']} />
            <ParticleAnimation particleCount={30000} animationDuration={3.0} />
            <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
      </div>
    </main>
  );
}