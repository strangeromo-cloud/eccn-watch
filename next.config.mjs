/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    // Keep these heavy native-ish libs as Node externals so Next.js doesn't
    // try to bundle them through Webpack on the server.
    serverExternalPackages: ["pdfjs-dist", "exceljs"],
};
export default nextConfig;
