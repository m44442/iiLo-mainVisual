'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import * as THREE from 'three'
import { gsap } from 'gsap'

const vertexShader = `
attribute vec3 position;
attribute vec3 two;
uniform float uPoint01;
uniform float uTime;
uniform float uSize;

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
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 1000.0 * dot(m, g);
}

float PI = 3.14159265;

void main() {
//mix関数で線形補完
 vec3 morphing = mix(position, two, uPoint01);
 //シンプレックスノイズ
 morphing.x = snoise(normalize(morphing.xy)) * sin(morphing.y + uTime * PI);
 morphing.y = snoise(normalize(morphing.xy)) * cos(morphing.x + uTime * PI);
 morphing.z = morphing.z + snoise(normalize(morphing.xy)) * sin(morphing.y + uTime * PI);

 gl_Position = projectionMatrix * modelViewMatrix * vec4(morphing, 1.0 );
 gl_PointSize = uSize;
}
`

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
`

export default function ParticleSystem() {
  const materialRef = useRef<THREE.RawShaderMaterial>(null)
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material } = useMemo(() => {
    const particleNumber = 100000

    // Box geometry particles
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 100, 100, 100)
    const boxMaterial = new THREE.MeshBasicMaterial()
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    const boxSampler = new MeshSurfaceSampler(boxMesh).build()
    const boxParticles = new Float32Array(particleNumber * 3)

    for (let i = 0; i < particleNumber; i++) {
      const vertex = new THREE.Vector3()
      boxSampler.sample(vertex, new THREE.Vector3())
      boxParticles.set([vertex.x, vertex.y, vertex.z], i * 3)
    }

    // Sphere geometry particles
    const sphereGeometry = new THREE.SphereGeometry(10, 100, 100)
    const sphereMaterial = new THREE.MeshBasicMaterial()
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    const sphereSampler = new MeshSurfaceSampler(sphereMesh).build()
    const sphereParticles = new Float32Array(particleNumber * 3)

    for (let i = 0; i < particleNumber; i++) {
      const vertex = new THREE.Vector3()
      sphereSampler.sample(vertex, new THREE.Vector3())
      sphereParticles.set([vertex.x, vertex.y, vertex.z], i * 3)
    }

    // Create buffer geometry
    const bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(boxParticles, 3))
    bufferGeometry.setAttribute('two', new THREE.BufferAttribute(sphereParticles, 3))

    // シェーダーマテリアルの初期値を散らばった状態に
  const shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uPoint01: { value: 1.0 }, // 1.0で散らばった状態に
      uTime: { value: 0.0 },
      uSize: { value: 0.05 }, // 少し小さめサイズから開始
    },
    transparent: true,
    blending: THREE.NormalBlending,
  })

  return {
    geometry: bufferGeometry,
    material: shaderMaterial
  }
  }, [])

  // GSAP Animation
 useEffect(() => {
  if (materialRef.current) {
    const isMobile = window.innerWidth < 768; // モバイル判定
    const baseSize = isMobile ? 1.5 : 2.0
    // まず初期値を非常に大きくセット
    materialRef.current.uniforms.uPoint01.value = 30.0;
    
    // そこから通常の値に落とし込む
    const firstAnimation = gsap.timeline();
    
    // 非常に散らばった状態から集まった状態(0.0)へ
    firstAnimation.to(materialRef.current.uniforms.uPoint01, {
      value: 0.0,
      ease: "power3.out", // よりドラマチックなイージング
      duration: 2.5, // 長めの時間をかけて集める
    });

    // パーティクルのサイズも大きくする
    firstAnimation.to(materialRef.current.uniforms.uSize, {
      value: baseSize, // モバイルでは1.5、PCでは2.0
      ease: "power1.inOut",
      duration: 2.5,
    }, 0); // 0は同時スタートの意味
    
    // 最初のアニメーションが終わったら繰り返しのアニメーション開始
    firstAnimation.call(() => {
      // 最初のアニメーションが完了したあとの繰り返しアニメーション
      const loopAnimation = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
      });
      
      // ここでは形状を0.0で維持したまま別の微妙な動きを与える
      // 例: 少しだけ形状を変えて元に戻す
      loopAnimation.to(materialRef.current!.uniforms.uPoint01, {
        value: 0.05, // ほんの少し変形
        ease: "power1.inOut",
        duration: 2
      });
      
      loopAnimation.to(materialRef.current!.uniforms.uPoint01, {
        value: 0.0, // 元に戻す
        ease: "power1.inOut",
        duration: 2
      });
      
      loopAnimation.play();
    });
  }
}, [])

  // Animation loop
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += 0.0005
    }
  })

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
      }}
      transparent
      blending={THREE.NormalBlending}
    />
  </points>
  )
}