import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://formula19.ca";
  const routes = [
    "",
    "/tire-shop-kelowna",
    "/custom-rims-kelowna",
    "/winter-tires-kelowna",
    "/tire-installation-kelowna",
    "/admin/login"
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
