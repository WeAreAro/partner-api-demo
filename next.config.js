/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // Kong Sandbox instance (GET's won't work as not Authorization header can be passed in request!)
        // API_BASE_URL: 'https://api.aro-sandbox.co.uk',

        // Local development server
        // API_BASE_URL: 'http://localhost:20007',

        // Using UAT direct line of sight (no Kong blocking the non-authorised GET requests)
        // API_BASE_URL: 'https://uat.dev1.freedom-finance-test.cloud',

        // Using API Gateway UAT Instance (Signed GET's will work!)
        API_BASE_URL: 'https://apig.aro-sandbox.co.uk',
    },
    async rewrites() {
        return [
            {
                source: '/ff-api/:path*',

                // Kong Sandbox instance (GET's won't work as not Authorization header can be passed in request!)
                // destination: 'https://api.aro-sandbox.co.uk/:path*',

                // Local development server
                // destination: 'http://localhost:20007/:path*',

                // Using UAT direct line of sight (no Kong blocking the non-authorised GET requests)
                // destination: 'https://uat.dev1.freedom-finance-test.cloud/:path*',

                // Using API Gateway UAT Instance (Signed GET's will work!)
                destination: 'https://apig.aro-sandbox.co.uk/:path*',
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