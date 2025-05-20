'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import * as THREE from 'three';

interface ParticleAnimationProps {
  particleCount?: number;
  animationDuration?: number;
}

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({
  particleCount = 50000,
  animationDuration = 3.0,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const startTimeRef = useRef<number>(Date.now());
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const currentMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  // アニメーションの再開用ステート
  const [animationKey, setAnimationKey] = useState<number>(0);

  // シェーダーコード
  const shaderData = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0.0 }, // 初期値を0に変更して、ランダムから始まるように
        uSize: { value: 2.5 }, // サイズを少し大きく
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 0.8 },
      },
      vertexShader: `
        attribute vec3 boxPosition;
        attribute vec3 randomPosition;
        attribute vec3 two;
        
        uniform float uProgress;
        uniform float uTime;
        uniform float uSize;
        uniform vec2 uMouse;
        uniform float uMouseInfluence;
        
        varying vec3 vPosition;
        varying float vDistance;
        
        // ノイズ関数
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+10.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          // First corner
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          
          // Other corners
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          
          // Permutations
          i = mod289(i); // Avoid truncation effects in permutation
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
          
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 1000.0 * dot(m, g);
        }
        
        float PI = 3.14159265;
        
        void main() {
        // ランダム位置から形状へのブレンド
        // 'position'を'boxPosition'に変更
        vec3 morphing = mix(randomPosition, boxPosition, uProgress);
        
          // 形状と球のブレンド（時間の経過で変化）
          float sphereBlend = sin(uTime * 0.5) * 0.5 + 0.5;
          morphing = mix(morphing, two, sphereBlend * uProgress);
          
          // シンプレックスノイズを使った変形
          float noise = snoise(normalize(morphing.xy) + uTime * 0.2);
          morphing.x += sin(morphing.y * 0.2 + uTime * PI) * noise * 0.3;
          morphing.y += cos(morphing.x * 0.2 + uTime * PI) * noise * 0.3;
          morphing.z += sin(morphing.x * 0.2 + uTime * PI) * noise * 0.3;
          
          // マウスの影響（わずかな引力）
          vec3 mousePos = vec3(uMouse.x * 20.0, uMouse.y * 20.0, 0.0);
          vec3 direction = mousePos - morphing;
          float mouseDist = length(direction);
          float influence = 1.0 - smoothstep(0.0, 8.0, mouseDist);
          
          // マウスに引き寄せる効果
          morphing += normalize(direction) * influence * uMouseInfluence * 4.0;
          
          // 中心からの距離を計算してvaryingに渡す
          vDistance = length(morphing) * 0.1;
          vPosition = morphing;
          
          // 頂点位置をビュー空間に変換
          vec4 mvPosition = modelViewMatrix * vec4(morphing, 1.0);
          
          // 距離に応じた粒子サイズ
          gl_PointSize = uSize * (30.0 / -mvPosition.z);
          
          // 最終的なクリップ空間の位置を計算
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        
        varying vec3 vPosition;
        varying float vDistance;
        
        void main() {
          // 粒子の円形形状を作成
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // 円の範囲外は描画しない
          if (dist > 0.5) discard;
          
          // 中心から距離に基づく透明度
          float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
          
          // すべての粒子を黒色で表示
          vec3 color = vec3(0.0);
          
          gl_FragColor = vec4(color, alpha * 0.4);
        }
      `,
    };
  }, []);

  // ジオメトリとポイントの作成
  const { geometry, material } = useMemo(() => {
    // ボックスの頂点を生成
    const boxPoints = generateBoxPoints(particleCount);
    
    // 球体の頂点を生成
    const spherePoints = generateSpherePoints(particleCount);
    
    // ランダムな点を生成
    const randomPoints = generateRandomPoints(particleCount);
    
        // ジオメトリの作成部分を変更
    // ジオメトリの作成
    const geometry = new THREE.BufferGeometry();
    
    // THREE.jsの標準属性名「position」を使用してみる
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(boxPoints, 3));
    geometry.setAttribute('two', new THREE.Float32BufferAttribute(spherePoints, 3));
    geometry.setAttribute('randomPosition', new THREE.Float32BufferAttribute(randomPoints, 3));
    
    // マテリアルの作成
    const material = new THREE.ShaderMaterial({
      vertexShader: shaderData.vertexShader,
      fragmentShader: shaderData.fragmentShader,
      uniforms: shaderData.uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    
    return { geometry, material };
  }, [particleCount, shaderData]);
  
  // ボックス形状のポイント生成
  function generateBoxPoints(count: number): Float32Array {
    const points = new Float32Array(count * 3);
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 100, 100, 100);
    const boxMesh = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(boxMesh).build();
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition);
      points[i * 3] = tempPosition.x;
      points[i * 3 + 1] = tempPosition.y;
      points[i * 3 + 2] = tempPosition.z;
    }

    boxGeometry.dispose();
    return points;
  }

  // 球形状のポイント生成
  function generateSpherePoints(count: number): Float32Array {
    const points = new Float32Array(count * 3);
    const sphereGeometry = new THREE.SphereGeometry(10, 100, 100);
    const sphereMesh = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(sphereMesh).build();
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition);
      points[i * 3] = tempPosition.x;
      points[i * 3 + 1] = tempPosition.y;
      points[i * 3 + 2] = tempPosition.z;
    }

    sphereGeometry.dispose();
    return points;
  }

  // ランダムな位置のポイント生成
  function generateRandomPoints(count: number): Float32Array {
    const points = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      points[i * 3] = (Math.random() - 0.5) * 30;
      points[i * 3 + 1] = (Math.random() - 0.5) * 30;
      points[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    return points;
  }

  // マウスイベントハンドラ
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetMouseRef.current.set(x, y);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetMouseRef.current.set(x, y);
      }
    };

    const handleMouseLeave = () => {
      targetMouseRef.current.set(0.01, 0.01);
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetMouseRef.current.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // アニメーションの再開
  const restartAnimation = () => {
    startTimeRef.current = Date.now();
    setAnimationKey(prev => prev + 1);
    
    if (shaderRef.current) {
      shaderRef.current.uniforms.uProgress.value = 0;
    }
  };

  // キーボードイベントリスナー（Rキーでリスタート）
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'r' || event.key === 'R') {
        restartAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // アニメーションフレームごとの更新
  useFrame((state, delta) => {
    if (!pointsRef.current || !shaderRef.current) return;

    // 経過時間の計算
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    
    // マウス位置の更新（スムーズに）
    currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.1;
    currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.1;

    // わずかな動きを追加
    if (Math.abs(currentMouseRef.current.x) < 0.01 && Math.abs(currentMouseRef.current.y) < 0.01) {
      targetMouseRef.current.x = Math.sin(elapsedTime * 0.4) * 0.1;
      targetMouseRef.current.y = Math.cos(elapsedTime * 0.3) * 0.1;
    }
    
    // アニメーションのプログレス更新（徐々に形に集まる）
    if (elapsedTime < animationDuration) {
      const progress = Math.min(elapsedTime / animationDuration, 1.0);
      shaderRef.current.uniforms.uProgress.value = progress;
    } else {
      shaderRef.current.uniforms.uProgress.value = 1.0;
    }
    
    // 時間の更新
    shaderRef.current.uniforms.uTime.value += delta * 0.8;
    
    // マウス位置の更新
    shaderRef.current.uniforms.uMouse.value = currentMouseRef.current;
  });

  // レンダリング
  return (
    <points ref={pointsRef} key={animationKey}>
      <primitive object={geometry} attach="geometry" />
      <primitive ref={shaderRef} object={material} attach="material" />
    </points>
  );
};

export default ParticleAnimation;