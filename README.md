## 🚀 主要機能

- **Three.js背景**: 100,000個のパーティクルがマウスとスクロールに反応
- **6つのセクション構成**: Mission, Service, News, Recruit, Company, Contact
- **統一されたボタン**: HoverButtonコンポーネントで色変化アニメーション
- **フルスクリーンモーダル**: React Springを使ったお問い合わせフォーム
- **レスポンシブ対応**: PC 1728px基準、モバイル最適化済み
- **WebGLシェーダー**: カスタム頂点・フラグメントシェーダーで描画最適化

## 🛠 技術スタック

- **フレームワーク**: Next.js 14.0.4 + TypeScript
- **3Dグラフィックス**: Three.js, React Three Fiber, React Three Drei
- **アニメーション**: GSAP, React Spring
- **スタイリング**: Tailwind CSS 4.1.10
- **UIコンポーネント**: shadcn/ui (Radix UI primitives)
- **アイコン**: Lucide React

## 📁 詳細なファイル構成

```
プロジェクトルート/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── effects/           # 3D エフェクトとアニメーション
│   │   │   │   ├── ParticleSystem.tsx    # メイン3Dパーティクルシステム
│   │   │   │   ├── MorphingText.tsx      # テキストモーフィングアニメーション
│   │   │   │   └── CustomCursor.tsx      # カスタムカーソルコンポーネント
│   │   │   │
│   │   │   ├── modals/            # モーダル関連
│   │   │   │   └── ContactModal.tsx      # お問い合わせモーダル
│   │   │   │
│   │   │   ├── sections/          # メインページのセクション
│   │   │   │   ├── MissionSectionWithAnimation.tsx    # ミッションセクション（ヒーロー）
│   │   │   │   ├── ServiceSectionDiiLo.tsx           # サービスセクション（DIILo紹介）
│   │   │   │   ├── NewsSectionNew.tsx                # ニュースセクション
│   │   │   │   ├── RecruitSectionNew.tsx             # 採用情報セクション
│   │   │   │   ├── CompanySectionNew.tsx             # 会社概要セクション
│   │   │   │   └── ContactSectionTailwind.tsx        # コンタクトセクション
│   │   │   │
│   │   │   ├── three/             # Three.js 関連
│   │   │   │   └── ThreeCanvas.tsx        # Three.js キャンバス設定
│   │   │   │
│   │   │   └── ui/                # shadcn/ui コンポーネント
│   │   │       ├── button.tsx             # 基本ボタンコンポーネント
│   │   │       ├── dialog.tsx             # ダイアログコンポーネント
│   │   │       ├── hover-button.tsx       # カスタムホバーボタン
│   │   │       ├── input.tsx              # 入力フィールドコンポーネント
│   │   │       ├── label.tsx              # ラベルコンポーネント
│   │   │       └── textarea.tsx           # テキストエリアコンポーネント
│   │   │
│   │   ├── hooks/                 # カスタムReactフック
│   │   │   ├── useScrollLock.ts           # スクロールロック機能
│   │   │   └── useBodyFixed.ts            # body要素の固定機能
│   │   │
│   │   ├── globals.css            # グローバルスタイル
│   │   ├── layout.tsx             # ルートレイアウト
│   │   └── page.tsx               # メインページ
│   │
│   └── lib/
│       └── utils.ts               # ユーティリティ関数
│
├── components.json                # shadcn/ui 設定ファイル
├── package.json                   # プロジェクト依存関係
├── tailwind.config.js            # Tailwind CSS 設定
└── tsconfig.json                 # TypeScript 設定
```

## 🎨 コンポーネント詳細

### メインセクション

#### 1. **MissionSectionWithAnimation.tsx** 
- **役割**: ヒーローセクション、ミッションステートメント
- **機能**: MorphingTextエフェクト、スクロール連動アニメーション
- **レイアウト**: フルスクリーン、タイトル位置 `left-[120px]`

#### 2. **ServiceSectionDiiLo.tsx**
- **役割**: プロダクト（DIILo）の紹介
- **機能**: フルワイドレイアウト、製品カードの中央配置
- **レイアウト**: `max-w-[1728px] mx-auto` で中央揃え

#### 3. **NewsSectionNew.tsx**
- **役割**: ニュースと更新情報の表示
- **機能**: HoverButtonを使用、統一されたタイトル配置

#### 4. **RecruitSectionNew.tsx**
- **役割**: 採用情報
- **機能**: HoverButtonを使用、レスポンシブ対応

#### 5. **CompanySectionNew.tsx**
- **役割**: 会社概要
- **機能**: HoverButtonを使用、統一されたレイアウト

#### 6. **ContactSectionTailwind.tsx**
- **役割**: お問い合わせセクション
- **機能**: ContactModalの呼び出し、HoverButtonを使用

### エフェクト・アニメーション

#### **ParticleSystem.tsx**
- **機能**: 100,000個以上のパーティクル制御
- **特徴**: 
  - カスタムWebGLシェーダー（頂点・フラグメントシェーダー）
  - ボックス⇔球体間のモーフィング
  - マウスインタラクション（引力・斥力効果）
  - スクロールベースのスケーリング
  - モバイル最適化（パーティクル数削減）

#### **MorphingText.tsx**
- **機能**: 文字単位でのテキストモーフィング
- **プロパティ**:
  - `targetText`: 最終表示テキスト
  - `speed`: アニメーション速度（デフォルト: 50ms）
  - `chars`: ランダム文字セット
  - `incrementRate`: 変化速度（デフォルト: 1/3）

#### **CustomCursor.tsx**
- **機能**: インタラクティブカスタムカーソル
- **反応要素**: ボタン、リンク、クリック可能要素

### モーダル

#### **ContactModal.tsx**
- **機能**: お問い合わせフォームモーダル
- **使用shadcn/uiコンポーネント**:
  - `Input` - 入力フィールド
  - `Textarea` - テキストエリア
  - `Button` - 送信ボタン
- **特徴**:
  - React Spring による高度なアニメーション
  - スクロールロック機能
  - レスポンシブデザイン対応
  - フォームバリデーション

## 🧩 shadcn/ui コンポーネント使用状況

### 設定ファイル: `components.json`
```json
{
  "style": "new-york",           // デザインスタイル
  "rsc": true,                   // React Server Components対応
  "tailwind": {
    "baseColor": "neutral",      // ベースカラー
    "cssVariables": true         // CSS変数使用
  },
  "aliases": {
    "ui": "@/app/components/ui"  # UI コンポーネントパス
  }
}
```

### 使用中のshadcn/uiコンポーネント

#### **Button (`src/app/components/ui/button.tsx`)**
- **使用箇所**: ContactModal, 各セクション
- **バリエーション**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **カスタマイズ**: HoverButtonで拡張

#### **HoverButton (`src/app/components/ui/hover-button.tsx`)**
- **基本**: Buttonコンポーネントを拡張
- **機能**: カスタムホバーステート、色変更アニメーション
- **プロパティ**:
  - `normalBg`: 通常時背景色
  - `normalText`: 通常時テキスト色
  - `hoverBg`: ホバー時背景色
  - `hoverText`: ホバー時テキスト色

#### **Dialog (`src/app/components/ui/dialog.tsx`)**
- **使用箇所**: モーダルシステムの基盤
- **機能**: オーバーレイ、スクロール管理

#### **Input (`src/app/components/ui/input.tsx`)**
- **使用箇所**: ContactModal フォームフィールド
- **スタイル**: カスタムボーダー、レスポンシブサイズ

#### **Textarea (`src/app/components/ui/textarea.tsx`)**
- **使用箇所**: ContactModal お問い合わせ内容
- **機能**: リサイズ無効化、高さ固定

#### **Label (`src/app/components/ui/label.tsx`)**
- **使用箇所**: フォームラベル（必要に応じて）

## 🎯 レイアウトシステム

### デスクトップレイアウト
- **コンテナ幅**: `max-w-[1728px]` 中央配置
- **タイトル位置**: `left-[120px]` で統一
- **セクション高さ**: `min-h-screen` または固定高さ

### レスポンシブ対応
- **ブレークポイント**: `md:` (768px以上)
- **モバイル**: フル幅、パディング調整
- **タッチ対応**: ボタンサイズ最適化

## 🚀 開発環境セットアップ

### 必要環境
- Node.js 18.0 以上
- npm または yarn

### インストール手順

1. **リポジトリクローン**
```bash
git clone <repository-url>
cd iilo-mainvisual
```

2. **依存関係インストール**
```bash
npm install
```

3. **開発サーバー起動**
```bash
npm run dev
```

4. **ブラウザでアクセス**
http://localhost:3000

### 本番ビルド

```bash
npm run build
npm start
```

## 🔧 開発コマンド

- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm start` - 本番サーバー起動
- `npm run lint` - ESLint実行

## 📱 パフォーマンス最適化

### モバイル対応
- **パーティクル数削減**: デバイス検出による最適化
- **スムーズ補間**: マウス移動のlerp処理
- **Intersection Observer**: ビューポート内アニメーションのみ
- **コンポーネントメモ化**: 不要な再レンダリング防止

### アニメーション最適化
- **GSAP タイムライン**: 効率的なアニメーション管理
- **CSS Transform**: GPU アクセラレーション活用
- **RequestAnimationFrame**: 滑らかなフレームレート

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: #000000 (黒)
- **セカンダリ**: #FFFFFF (白)
- **グレー**: #E7E7E7 (背景), #898989 (ボーダー)

### タイポグラフィ
- **英文**: GeneralSansVariable (システムフォントフォールバック)
- **和文**: NotoSansJP
- **レスポンシブ**: クエリ別サイズ調整

### スペーシング
- **セクション間**: 統一マージン
- **コンテナ内**: 一貫したパディング
- **レスポンシブ**: ブレークポイント別調整

## 🔍 引き継ぎ時の注意点

### 重要なファイル
1. **ParticleSystem.tsx**: WebGL シェーダー含む複雑な3D処理
2. **ContactModal.tsx**: React Spring の複雑なアニメーション
3. **HoverButton.tsx**: 全セクションで使用される統一UIコンポーネント

### 開発時の注意
- **shadcn/ui更新**: `components.json` の設定維持
- **Tailwind CSS**: `tw` プレフィックス使用箇所に注意
- **TypeScript**: strict モード有効、型定義必須

### パフォーマンス監視
- **3Dパーティクル**: フレームレート監視必要
- **モーダルアニメーション**: メモリリーク注意
- **レスポンシブ**: 各デバイスでの表示確認必要

## 📞 サポート

技術的な質問や問題については、コードベースの構造とこのドキュメントを参照してください。

---

**開発チーム**: iiLo Development Team  
**最終更新**: 2025年1月  
**Next.js**: 14.0.4 / **TypeScript**: 5.3.3