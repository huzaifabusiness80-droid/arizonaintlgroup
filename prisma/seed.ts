import { PrismaClient } from "@prisma/client";
import { allVisasData, businessDivisionsData } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database from lib/data.ts...");

  // 0. Seed Admin User
  console.log("Seeding Admin User...");
  await prisma.adminUser.upsert({
    where: { email: "admin@arizonaintlgroup.com" },
    update: {
      name: "Arizona Administrator",
      password: process.env.ADMIN_PASSWORD || "Arizona@2024!",
      role: "SUPER_ADMIN",
    },
    create: {
      email: "admin@arizonaintlgroup.com",
      name: "Arizona Administrator",
      password: process.env.ADMIN_PASSWORD || "Arizona@2024!",
      role: "SUPER_ADMIN",
    },
  });

  // 1. Seed Visas
  console.log(`Seeding ${allVisasData.length} Visa listings...`);
  for (let i = 0; i < allVisasData.length; i++) {
    const v = allVisasData[i];
    await prisma.visaListing.upsert({
      where: { slug: v.slug },
      update: {
        name: v.name,
        country: v.country,
        flag: v.flag,
        region: v.region,
        regionName: v.regionName,
        type: v.type,
        processingTime: v.time,
        entryType: v.entryType,
        validity: v.validity,
        heroImage: v.heroImage,
        cardImage: v.cardImage,
        tagline: v.tagline,
        overview: v.overview,
        requirements: v.requirements,
        processSteps: v.processSteps,
        included: v.included,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: v.slug,
        name: v.name,
        country: v.country,
        flag: v.flag,
        region: v.region,
        regionName: v.regionName,
        type: v.type,
        processingTime: v.time,
        entryType: v.entryType,
        validity: v.validity,
        heroImage: v.heroImage,
        cardImage: v.cardImage,
        tagline: v.tagline,
        overview: v.overview,
        requirements: v.requirements,
        processSteps: v.processSteps,
        included: v.included,
        sortOrder: i,
        isActive: true,
      },
    });
  }

  // Find divisions
  const travelDiv = businessDivisionsData.find((d) => d.slug === "travel-tours");
  const carDiv = businessDivisionsData.find((d) => d.slug === "rent-a-car");
  const bahrainDiv = businessDivisionsData.find((d) => d.slug === "business-bahrain");
  const mobileDiv = businessDivisionsData.find((d) => d.slug === "mobiles-tech");

  // 2. Seed Tours
  if (travelDiv?.servicesList) {
    console.log(`Seeding ${travelDiv.servicesList.length} Tour services...`);
    for (let i = 0; i < travelDiv.servicesList.length; i++) {
      const item = travelDiv.servicesList[i];
      await prisma.tourService.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
        create: {
          slug: item.slug,
          name: item.name,
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
      });
    }
  }

  // 3. Seed Cars
  if (carDiv?.servicesList) {
    console.log(`Seeding ${carDiv.servicesList.length} Car services...`);
    for (let i = 0; i < carDiv.servicesList.length; i++) {
      const item = carDiv.servicesList[i];
      await prisma.carService.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
        create: {
          slug: item.slug,
          name: item.name,
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
      });
    }
  }

  // 4. Seed Bahrain Services
  if (bahrainDiv?.servicesList) {
    console.log(`Seeding ${bahrainDiv.servicesList.length} Bahrain services...`);
    for (let i = 0; i < bahrainDiv.servicesList.length; i++) {
      const item = bahrainDiv.servicesList[i];
      await prisma.bahrainService.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
        create: {
          slug: item.slug,
          name: item.name,
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
      });
    }
  }

  // 5. Seed Mobiles
  if (mobileDiv?.servicesList) {
    console.log(`Seeding ${mobileDiv.servicesList.length} Mobile products...`);
    for (let i = 0; i < mobileDiv.servicesList.length; i++) {
      const item = mobileDiv.servicesList[i];
      await prisma.mobileProduct.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          brand: item.name.split(" ")[0] || "General",
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
        create: {
          slug: item.slug,
          name: item.name,
          brand: item.name.split(" ")[0] || "General",
          description: item.desc,
          tag: item.tag,
          image: item.image,
          basePrice: item.price,
          about: item.about,
          options: item.options,
          gallery: item.gallery,
          sortOrder: i,
          isActive: true,
        },
      });
    }
  }

  console.log("✅ All data seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
