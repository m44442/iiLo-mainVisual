# iiLo メインビジュアル - 技術仕様書

Next.js 14 + Three.js による企業サイト。WebGLパーティクルシステムとコンポーネント統一化を実装。

## 実装概要

- **パーティクル描画**: 100,000個のパーティクル、カスタムシェーダーによるGPU処理
- **レイアウト統一**: 全セクションで `left-[120px]` タイトル位置、`max-w-[1728px]` コンテナ幅に統一
- **コンポーネント標準化**: HoverButton で全ボタンの UI/UX を統一、shadcn/ui (Button, Input, Textarea, Dialog, Label) 使用
- **アニメーション最適化**: GSAP Timeline + Intersection Observer による負荷軽減
- **フォーム処理**: React Spring による 60fps アニメーションモーダル

## コンポーネント構成と編集対象

### `/components/effects/` - 3D・アニメーション処理
- **ParticleSystem.tsx**: WebGLシェーダー処理、パフォーマンス調整時に編集
  - `particleNumber: 100000` - パーティクル数調整
  - `lerpFactor: 0.05` - マウス追従の滑らかさ
  - モバイル対応時は `const isMobile` 条件分岐を調整
- **MorphingText.tsx**: テキストアニメーション、文字表示の調整時に編集
  - `speed: 50` - アニメーション速度
  - `chars` - ランダム表示文字セット
- **CustomCursor.tsx**: カーソル見た目変更時のみ編集

### `/components/sections/` - メインコンテンツ（縦スクロール順）
全セクション共通レイアウト規則:
- タイトル位置: `left-[120px]` (PC) / `ml-6` (Mobile)  
- コンテナ: `max-w-[1728px] mx-auto`
- ボタン: HoverButton使用必須

1. **MissionSectionWithAnimation.tsx**: トップのヒーローセクション
   - MorphingTextで「AI-POWERED BUSINESS TRANSFORMATION」表示
   - 背景: Three.jsパーティクル、白背景
   
2. **ServiceSectionDiiLo.tsx**: プロダクト「DIILo」紹介セクション  
   - 製品カード中央配置、背景: 黒
   - 製品説明・機能説明、「More」ボタン
   
3. **NewsSectionNew.tsx**: ニュース・お知らせセクション
   - 最新情報表示、背景: 白
   - 「More」ボタンでニュース詳細へ
   
4. **RecruitSectionNew.tsx**: 採用情報セクション
   - 求人案内、背景: 黒
   - 採用メッセージ・応募ボタン
   
5. **CompanySectionNew.tsx**: 会社概要セクション  
   - 企業情報・沿革、背景: 白
   - 会社詳細への導線
   
6. **ContactSectionTailwind.tsx**: お問い合わせセクション
   - ContactModal呼び出しボタン、背景: 黒
   - 連絡先情報表示

### `/components/modals/` - モーダル処理
- **ContactModal.tsx**: フォーム項目変更時に編集
  - フィールド追加時は `formData` state と JSX両方を更新
  - アニメーション変更は `useChain` タイミング調整

### `/components/ui/` - 共通UIコンポーネント  
- **hover-button.tsx**: 全セクションのボタン統一、色・アニメーション変更時に編集
  - `normalBg`, `hoverBg` - ボタン色設定
  - 変更時は全セクションに影響するため注意

## パフォーマンス考慮点

### Three.js パーティクルシステム
- **レンダリング**: RawShaderMaterial でブラウザ最適化バイパス
- **モバイル対応**: `window.innerWidth < 768` でパーティクルサイズ調整
- **メモリ管理**: MeshSurfaceSampler による効率的頂点サンプリング
- **インタラクション**: lerp補間 (`lerpFactor: 0.05`) でマウス追従の調整

### アニメーション最適化  
- **GSAP**: `power3.out`, `power1.inOut` イージング、Timeline による同期制御
- **監視**: Intersection Observer で viewport 外要素の処理停止
- **描画**: `useFrame` 60fps制御、`uTime` uniform による GPU 時間管理

## 技術的実装詳細

### WebGL シェーダー実装
```glsl
// 頂点シェーダー: Simplex noise + マウスインタラクション
morphing.x = snoise(normalize(morphing.xy)) * sin(morphing.y + uTime * PI);
// マウス範囲内での引力・斥力計算
float attraction = strength * 0.8 * sin(uTime * PI * 2.0 + distanceToMouse);
```

### React Spring アニメーション連携
```typescript
// チェーンアニメーション設定
useChain(isOpen ? [springApi, transApi] : [transApi, springApi], [0, isOpen ? 0.15 : 0.6]);
```

### レスポンシブ実装パターン
```typescript  
// デバイス別パーティクル最適化
const baseSize = isMobile ? 1.5 : 2.0;
```

## 依存関係・バージョン

```json
"next": "14.0.4",
"three": "^0.159.0", 
"@react-three/fiber": "^8.15.12",
"gsap": "^3.13.0",
"tailwindcss": "^4.1.10"
```

## デプロイ設定

- **ビルド**: `next build` - 静的最適化有効
- **型チェック**: TypeScript strict mode
- **Lint**: ESLint Next.js rules

## 保守・拡張時の注意点

### 破壊的変更リスク
- **ParticleSystem.tsx**: シェーダーコード変更時のGPUコンパチビリティ
- **HoverButton**: 全セクション共通のため影響範囲大
- **ContactModal**: React Spring deps変更でアニメーション破綻リスク

### パフォーマンス監視対象
- Three.js レンダリングFPS（dev tools Performance tab）
- モバイルでのパーティクル描画負荷
- モーダルアニメーション中のメモリ使用量

---

**技術責任者**: 開発チーム  
**Next.js**: 14.0.4 / **Three.js**: 0.159.0