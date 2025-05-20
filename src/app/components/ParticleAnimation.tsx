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
        uProgress: { value: 0 }, // 0: ランダム, 1: ターゲット形状
        uMorphProgress: { value: 0 }, // 0: ボックス, 1: 球
        uSize: { value: 3.0 },
        uMouse: { value: new THREE.Vector2(0, 0) }, // マウス位置
        uMouseInfluence: { value: 0.1 }, // マウスの影響度
      },
      vertexShader: `
        // 各頂点の属性
        attribute vec3 boxPosition;
        attribute vec3 spherePosition;
        attribute vec3 randomPosition;
        
        // ユニフォーム変数（すべての頂点で共通の値）
        uniform float uProgress;
        uniform float uMorphProgress;
        uniform float uTime;
        uniform float uSize;
        uniform vec2 uMouse;
        uniform float uMouseInfluence;
        
        // フラグメントシェーダーに渡す変数
        varying vec3 vPosition;
        varying vec3 vColor;
        
        void main() {
          // 現在のターゲット形状の計算（ボックスと球の間）
          vec3 targetPos = mix(boxPosition, spherePosition, uMorphProgress);
          
          // ランダム位置からターゲット位置へのブレンド
          vec3 finalPosition = mix(boxPosition, targetPos, uProgress);
          
          // 散乱状態の時の動きを追加（うねうねした動き）
          float scatterEffect = 1.0 - uProgress; // 集合するにつれて効果を弱める
          finalPosition.x += sin(finalPosition.y * 0.2 + uTime) * 0.5 * scatterEffect;
          finalPosition.y += cos(finalPosition.z * 0.2 + uTime * 0.8) * 0.5 * scatterEffect;
          finalPosition.z += sin(finalPosition.x * 0.2 + uTime * 1.2) * 0.5 * scatterEffect;
          
          // マウスの影響を追加（uProgressの条件を削除、常に反応）
            // if (uProgress > 0.99) の条件を削除
            vec3 mousePos = vec3(uMouse.x * 15.0, uMouse.y * 15.0, 0.0);
            vec3 direction = mousePos - finalPosition;
            float dist = length(direction);
            float influence = 1.0 - smoothstep(0.0, 15.0, dist); // 影響範囲を広げる(10.0→15.0)
            
            // マウスに向かって引き寄せる効果
            finalPosition += normalize(direction) * influence * uMouseInfluence * 2.0;
            
            // マウスから離れる効果（波紋のように）
            float ripple = sin(dist * 1.0 - uTime * 3.0) * 0.2;
            finalPosition += normalize(direction) * ripple * influence;
          
          // 色の計算
          vColor = vec3(0.0, 0.0, 0.0);  // RGB値をすべて0に設定して黒にする
          
          // 最終位置を変数に渡す
          vPosition = finalPosition;
          
          // 頂点位置をビュー空間に変換
          vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
          
          // 距離に応じて粒子サイズを調整
          gl_PointSize = uSize * (100.0 / -mvPosition.z);
          
          // 最終的なクリップ空間の位置を計算
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        
        varying vec3 vPosition;
        varying vec3 vColor;
        
        void main() {
          // 粒子の円形形状を作成
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // 円の範囲外は描画しない
          if (dist > 0.5) discard;
          
          // 円の縁に近づくほど透明に
          float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
          
          // 最終的な色を計算
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    };
  }, []);

  // ジオメトリとポイントの作成
  const { geometry, material } = useMemo(() => {
    // ジオメトリの作成
    const geometry = new THREE.BufferGeometry();

    // 頂点データの生成
    const boxPoints = generateBoxPoints(particleCount);
    const spherePoints = generateSpherePoints(particleCount);
    const randomPoints = generateRandomPoints(particleCount);

    // 属性の設定
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(randomPoints, 3));
    geometry.setAttribute('boxPosition', new THREE.Float32BufferAttribute(boxPoints, 3));
    geometry.setAttribute('spherePosition', new THREE.Float32BufferAttribute(spherePoints, 3));

        // マテリアルの作成部分
    const material = new THREE.ShaderMaterial({
      vertexShader: shaderData.vertexShader,
      fragmentShader: shaderData.fragmentShader,
      uniforms: shaderData.uniforms,
      transparent: true,
      blending: THREE.NormalBlending,  // AdditiveBlendingから変更して黒を強調
      depthWrite: false,
    });

    return { geometry, material };
  }, [particleCount, shaderData]);

  // ボックス形状のポイント生成
  function generateBoxPoints(count: number): Float32Array {
    const points = new Float32Array(count * 3);
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 50, 50, 50);
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
  const sphereGeometry = new THREE.SphereGeometry(7, 50, 50);
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
    points[i * 3] = (Math.random() - 0.5) * 50;
    points[i * 3 + 1] = (Math.random() - 0.5) * 50;
    points[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  
  return points;
}

  // マウスイベントハンドラを改善（よりスムーズな動きに）
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

  // マウスが画面外に出たときの処理を追加
  const handleMouseLeave = () => {
    // ゆっくりと中央に戻す（完全に0にしないことでわずかな動きを残す）
    targetMouseRef.current.set(0.01, 0.01);
  };

  // マウスが画面に入ったときの処理
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
    
    // アニメーションの状態をリセット
    if (shaderRef.current) {
      shaderRef.current.uniforms.uProgress.value = 0;
      shaderRef.current.uniforms.uMorphProgress.value = 0;
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
        currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
        currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;

        // わずかな動きを追加（マウスが動かなくても常に動く）
        if (Math.abs(currentMouseRef.current.x) < 0.01 && Math.abs(currentMouseRef.current.y) < 0.01) {
            // マウスが中央付近にある場合は微妙に動かす
            targetMouseRef.current.x = Math.sin(elapsedTime * 0.3) * 0.02;
            targetMouseRef.current.y = Math.cos(elapsedTime * 0.2) * 0.02;
        }
        
        // アニメーションフェーズの制御
        const totalCycleDuration = animationDuration * 3; // 3フェーズ
        const normalizedTime = elapsedTime % totalCycleDuration;
        
        // フェーズごとの進捗計算
        if (normalizedTime < animationDuration) {
          // フェーズ0: 散乱→集合
          shaderRef.current.uniforms.uProgress.value = Math.min(normalizedTime / animationDuration, 1.0);
          shaderRef.current.uniforms.uMorphProgress.value = 0;
        } else if (normalizedTime < animationDuration * 2) {
          // フェーズ1: ボックス→球
          shaderRef.current.uniforms.uProgress.value = 1.0;
          shaderRef.current.uniforms.uMorphProgress.value = (normalizedTime - animationDuration) / animationDuration;
        } else {
          // フェーズ2: 球→ボックス
          shaderRef.current.uniforms.uProgress.value = 1.0;
          shaderRef.current.uniforms.uMorphProgress.value = 1 - (normalizedTime - animationDuration * 2) / animationDuration;
        }
        
        // 時間の更新
        shaderRef.current.uniforms.uTime.value += delta * 2.0;
        
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