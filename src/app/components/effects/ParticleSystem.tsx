"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as THREE from "three";
import { gsap } from "gsap";

const vertexShader = `
attribute vec3 position;
attribute vec3 two;
uniform float uPoint01;
uniform float uTime;
uniform float uSize;
uniform vec2 uMouse;
uniform float uScrollY;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                     -0.577350269189626,
                      0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
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
//mix関数で線形補完
 vec3 morphing = mix(position, two, uPoint01);
 //ノイズ
 morphing.x = snoise(normalize(morphing.xy)) * sin(morphing.y + uTime * PI);
 morphing.y = snoise(normalize(morphing.xy)) * cos(morphing.x + uTime * PI);
 morphing.z = morphing.z + snoise(normalize(morphing.xy)) * sin(morphing.y + uTime * PI);

 // マウスイへの反応
 vec2 mousePos = uMouse * 8.0; // マウス座標をワールド座標に変換（少し調整）
 vec2 particlePos = morphing.xy;
 vec2 mouseToParticle = particlePos - mousePos;
 float distanceToMouse = length(mouseToParticle);
 
 // マウス周辺での引力/斥力効果（距離に応じて減衰）
 float mouseRange = 12.0; // 範囲を少し狭く
 if (distanceToMouse < mouseRange) {
   float strength = (mouseRange - distanceToMouse) / mouseRange;
   vec2 direction = normalize(mouseToParticle);
   
   // 引力効果
   float attraction = strength * 0.8 * sin(uTime * PI * 2.0 + distanceToMouse);
   morphing.xy -= direction * attraction;
   
   // 波紋効果
   float ripple = sin(distanceToMouse * 0.3 - uTime * PI * 4.0) * strength * 0.5;
   morphing.z += ripple;
   
   // 渦巻き効果
   float spiral = cos(atan(mouseToParticle.y, mouseToParticle.x) * 3.0 + uTime * PI * 2.0) * strength * 0.3;
   morphing.xy += vec2(-direction.y, direction.x) * spiral;
 }
 
 float globalInfluence = length(uMouse) * 0.3;
 morphing.x += globalInfluence * sin(uTime * PI * 1.5 + morphing.y * 0.1);
 morphing.y += globalInfluence * cos(uTime * PI * 1.5 + morphing.x * 0.1);
 
 // スクロール効果（拡大効果）
 float scrollInfluence = uScrollY * 0.001;
 float scale = 1.0 + scrollInfluence;
 morphing.xyz *= scale;

 gl_Position = projectionMatrix * modelViewMatrix * vec4(morphing, 1.0 );
 gl_PointSize = uSize;
}
`;

const fragmentShader = `
precision mediump float;

void main() {
    vec2 temp = gl_PointCoord - vec2(0.3);
    float f = dot(temp, temp);
    if (f > 0.5 ) {
        discard;
    }
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;

export default function ParticleSystem() {
  const materialRef = useRef<THREE.RawShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 }); // ターゲットマウス座標
  const scrollRef = useRef(0);

  const { geometry, material } = useMemo(() => {
    const particleNumber = 100000;

    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 100, 100, 100);
    const boxMaterial = new THREE.MeshBasicMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    const boxSampler = new MeshSurfaceSampler(boxMesh).build();
    const boxParticles = new Float32Array(particleNumber * 3);

    for (let i = 0; i < particleNumber; i++) {
      const vertex = new THREE.Vector3();
      boxSampler.sample(vertex, new THREE.Vector3());
      boxParticles.set([vertex.x, vertex.y, vertex.z], i * 3);
    }

    const sphereGeometry = new THREE.SphereGeometry(10, 100, 100);
    const sphereMaterial = new THREE.MeshBasicMaterial();
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const sphereSampler = new MeshSurfaceSampler(sphereMesh).build();
    const sphereParticles = new Float32Array(particleNumber * 3);

    for (let i = 0; i < particleNumber; i++) {
      const vertex = new THREE.Vector3();
      sphereSampler.sample(vertex, new THREE.Vector3());
      sphereParticles.set([vertex.x, vertex.y, vertex.z], i * 3);
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(boxParticles, 3)
    );
    bufferGeometry.setAttribute(
      "two",
      new THREE.BufferAttribute(sphereParticles, 3)
    );

    // シェーダーマテリアルの初期値を散らばった状態に
    const shaderMaterial = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uPoint01: { value: 1.0 }, // 1.0で散らばった状態に
        uTime: { value: 0.0 },
        uSize: { value: 0.05 }, // 少し小さめサイズから開始
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScrollY: { value: 0 },
      },
      transparent: true,
      blending: THREE.NormalBlending,
    });

    return {
      geometry: bufferGeometry,
      material: shaderMaterial,
    };
  }, []);

  // マウスとスクロールの座標を更新するためのイベントリスナー
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // ターゲット座標を更新（実際の座標は後でスムーズに補間）
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 依存関係なし、一度だけ実行

  // 初期アニメーションの設定
  useEffect(() => {
    if (materialRef.current) {
      const isMobile = window.innerWidth < 768; // モバイル判定
      const baseSize = isMobile ? 1.5 : 2.0;
      // まず初期値を非常に大きくセット
      materialRef.current.uniforms.uPoint01.value = 30.0;

      // そこから通常の値に落とし込む
      const firstAnimation = gsap.timeline();

      // 非常に散らばった状態から集まった状態(0.0)へ
      firstAnimation.to(materialRef.current.uniforms.uPoint01, {
        value: 0.0,
        ease: "power3.out", // よりドラマチックなイージング
        duration: 1.8, // UX改善のため短縮
      });

      // パーティクルのサイズも大きくする
      firstAnimation.to(
        materialRef.current.uniforms.uSize,
        {
          value: baseSize, // モバイルでは1.5、PCでは2.0
          ease: "power1.inOut",
          duration: 1.8,
        },
        0
      ); // 0は同時スタートの意味

      // 最初のアニメーションが終わったら繰り返しのアニメーション開始
      firstAnimation.call(() => {
        // 最初のアニメーションが完了したあとの繰り返しアニメーション
        const loopAnimation = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
        });

        // ここでは形状を0.0で維持したまま別の微妙な動きを与える
        // 例: 少しだけ形状を変えて元に戻す
        if (materialRef.current && materialRef.current.uniforms) {
          loopAnimation.to(materialRef.current.uniforms.uPoint01, {
            value: 0.01, // ほんの少し変形
            ease: "power1.inOut",
            duration: 2,
          });

          loopAnimation.to(materialRef.current.uniforms.uPoint01, {
            value: 0.0, // 元に戻す
            ease: "power1.inOut",
            duration: 2,
          });

          loopAnimation.play();
        }
      });
    }
  }, []);

  // アニメーションの更新
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += 0.00085;

      // マウス座標をスムーズに補間（lerp）
      const lerpFactor = 0.05; // 0.02〜0.1の間で調整（小さいほど遅い）
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * lerpFactor;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * lerpFactor;

      // マウスとスクロールの値をシェーダーに送信
      materialRef.current.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );
      materialRef.current.uniforms.uScrollY.value = scrollRef.current;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material}>
      <rawShaderMaterial
        ref={materialRef}
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uPoint01: { value: 30.0 }, // 散らばった状態から開始
          uTime: { value: 0.0 },
          uSize: { value: 2.0 }, // 少し小さめから開始
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScrollY: { value: 0 },
        }}
        transparent
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
