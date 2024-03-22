/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        /* API_BASE_URL: 'https://api.aro-sandbox.co.uk', */
        API_BASE_URL: 'http://localhost:20007',
    },
    async rewrites() {
        return [
            {
                source: '/ff-api/:path*',
                /* destination: 'https://api.aro-sandbox.co.uk/:path*', */
                destination: 'http://localhost:20007/:path*'
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/DemoMenu',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig 