'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ParticleSystem from './components/ParticleSystem'

export default function Home() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
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
      >
        <Suspense fallback={null}>
          <ParticleSystem />
        </Suspense>
      </Canvas>
    </div>
  )
}
