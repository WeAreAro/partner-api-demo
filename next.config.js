/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/ff-api/:path*',
                destination: 'https://api.aro-sandbox.co.uk/:path*'
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