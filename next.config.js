/** @type {import('next').NextConfig} */

const baseRewrites = [

    {
      source: '/video/:slug*',
      destination: 'https://media.runbazaar.com/:slug*',
    }
  ];
const nextConfig = {
    async rewrites() {
        return baseRewrites
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
}

module.exports = nextConfig
