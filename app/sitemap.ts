import { MetadataRoute } from "next";
import { allVisasData, businessDivisionsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://arizonaintlgroup.com";
  const now = new Date();

  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/visas`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];

  // Division category pages
  const divisionPages: MetadataRoute.Sitemap = businessDivisionsData.map((division) => ({
    url: `${siteUrl}/services/${division.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Fetch dynamic Visa slugs from DB with static fallbacks
  let visaSlugs = allVisasData.map((v) => v.slug);
  try {
    const dbVisas = await prisma.visaListing.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    if (dbVisas && dbVisas.length > 0) {
      const dbSlugs = dbVisas.map((v) => v.slug);
      visaSlugs = Array.from(new Set([...visaSlugs, ...dbSlugs]));
    }
  } catch {}

  const visaPages: MetadataRoute.Sitemap = visaSlugs.map((slug) => ({
    url: `${siteUrl}/visas/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Service item pages across all divisions (DB + Static)
  const serviceItemPages: MetadataRoute.Sitemap = [];

  // Static service items
  businessDivisionsData.forEach((division) => {
    division.servicesList.forEach((item) => {
      serviceItemPages.push({
        url: `${siteUrl}/services/${division.slug}/${item.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    });
  });

  // Dynamic items from database
  try {
    const [dbCars, dbTours, dbMobiles, dbBahrain, dbBlogs] = await Promise.all([
      prisma.carService.findMany({ where: { isActive: true }, select: { slug: true } }),
      prisma.tourService.findMany({ where: { isActive: true }, select: { slug: true } }),
      prisma.mobileProduct.findMany({ where: { isActive: true }, select: { slug: true } }),
      prisma.bahrainService.findMany({ where: { isActive: true }, select: { slug: true } }),
      prisma.blogPost.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    ]);

    dbBlogs.forEach((b) => {
      const url = `${siteUrl}/blogs/${b.slug}`;
      if (!serviceItemPages.some((p) => p.url === url)) {
        serviceItemPages.push({ url, lastModified: b.updatedAt || now, changeFrequency: "weekly", priority: 0.8 });
      }
    });

    dbCars.forEach((c) => {
      const url = `${siteUrl}/services/rent-a-car/${c.slug}`;
      if (!serviceItemPages.some((p) => p.url === url)) {
        serviceItemPages.push({ url, lastModified: now, changeFrequency: "weekly", priority: 0.75 });
      }
    });

    dbTours.forEach((t) => {
      const url = `${siteUrl}/services/travel-tours/${t.slug}`;
      if (!serviceItemPages.some((p) => p.url === url)) {
        serviceItemPages.push({ url, lastModified: now, changeFrequency: "weekly", priority: 0.75 });
      }
    });

    dbMobiles.forEach((m) => {
      const url = `${siteUrl}/services/mobiles-tech/${m.slug}`;
      if (!serviceItemPages.some((p) => p.url === url)) {
        serviceItemPages.push({ url, lastModified: now, changeFrequency: "weekly", priority: 0.75 });
      }
    });

    dbBahrain.forEach((b) => {
      const url = `${siteUrl}/services/business-bahrain/${b.slug}`;
      if (!serviceItemPages.some((p) => p.url === url)) {
        serviceItemPages.push({ url, lastModified: now, changeFrequency: "weekly", priority: 0.75 });
      }
    });
  } catch {}

  return [...staticPages, ...divisionPages, ...visaPages, ...serviceItemPages];
}
