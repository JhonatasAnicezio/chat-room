/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Permite qualquer domínio
            },
        ],
    },
};

export default nextConfig;
