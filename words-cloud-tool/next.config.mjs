/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  transpilePackages: [
    "@ant-design/charts",
    "@ant-design/pro-chat",
    "@ant-design/pro-editor",
    "react-intersection-observer",
  ],
};

export default nextConfig;
