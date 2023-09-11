/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
    }
}