import type { Metadata } from "next";

export const siteConfig = {
  name: "Danish Parveez | Software Engineer",
  shortName: "Danish Parveez",
  title: "Danish Parveez — Software Engineer",
  description:
    "Professional portfolio of Danish Parveez, a Software Engineer specializing in scalable Pega CDH, Gen AI, distributed architectures, and cloud-native applications.",
  url: "https://example-portfolio.vercel.app",
  author: "Danish Parveez",
  links: {
    github: "https://github.com/danish-p7",
    linkedin: "https://www.linkedin.com/in/danish-parveez-297913207/",
    email: "mailto:danish.parveez.dev@gmail.com",
    twitter: "https://x.com/danxzone",
  },
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = "/images/og-preview.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      title,
      description,
      type: "website",
      url: siteConfig.url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@example",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
