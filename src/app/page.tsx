'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import ParticleSystem from './components/ParticleSystem'
import IiLoCorporateSite from './components/iiLoCorporateSite'

export default function Home() {
  const [particleAnimationComplete, setParticleAnimationComplete] = useState(false)
  const [headerAnimationComplete, setHeaderAnimationComplete] = useState(false)
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false)
  
  // スクロール制御
  useEffect(() => {
    if (!heroAnimationComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [heroAnimationComplete])
  
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Fixed Particle Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        {/* Gradient overlay to fade particles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, white 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        
        <Canvas
          camera={{
            fov: 60,
            aspect: typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1,
            near: 0.1,
            far: 20000,
            position: [0, 0, 15]
          }}
          gl={{
            antialias: true
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ParticleSystem onAnimationComplete={setParticleAnimationComplete} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scrollable Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%'
      }}>
        <IiLoCorporateSite 
          particleAnimationComplete={particleAnimationComplete}
          onHeaderAnimationComplete={setHeaderAnimationComplete}
          onHeroAnimationComplete={setHeroAnimationComplete}
        />
      </div>
    </div>
  )
}