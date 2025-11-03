/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "essential.oceanwp.org", // add this line for your product images
      "example.com",           // keep any other external sources you use
      "res.cloudinary.com",    // optional, in case you use Cloudinary later
    ],
  },
};

export default nextConfig;
