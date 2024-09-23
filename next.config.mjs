import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "m.media-amazon.com",
      "images.routledge.com",
      "www.charulathapublications.com",
      "res.cloudinary.com",
    ],
  },
  // il8n: {
  //   locales: ["en", "kn"],
  //   defaultLocale: "en",
  // },
};

export default withNextIntl(nextConfig);
