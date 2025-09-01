/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,

    output: 'standalone',

    compress: true,

    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    },

    devIndicators: false,

    experimental: {
        typedRoutes: true,

        // webVitalsAttribution: ['CLS', 'LCP'],

    }

};

export default nextConfig