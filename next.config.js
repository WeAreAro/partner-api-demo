/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
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
                destination: '/UnsecuredForm',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig 