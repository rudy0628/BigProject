/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			'images.unsplash.com',
			'source.unsplash.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = nextConfig;
