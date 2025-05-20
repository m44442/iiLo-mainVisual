/** @type {import('next').NextConfig} */
const nextConfig = {
  
  webpack: (config) => {
    // Three.jsのシェーダーファイル用ローダー設定
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source'
    });
    
    return config;
  },
};

module.exports = nextConfig;