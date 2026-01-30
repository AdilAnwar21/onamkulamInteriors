/** @type {import('next').NextConfig} */
const nextConfig = {
    // If you need to deploy to a subdirectory, uncomment and change this:
    // basePath: '/onamkulamInteriors', 
    // output: 'export', // If deploying to static hosting like GitHub Pages
    images: {
        unoptimized: true, // For static export compatibility if needed
    },
};

export default nextConfig;
