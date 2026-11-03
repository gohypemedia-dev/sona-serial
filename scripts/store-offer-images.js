require('@next/env').loadEnvConfig(process.cwd());
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const path = require('node:path');
const fs = require('node:fs');
const prisma = new PrismaClient();

async function main() {
  if (!process.env.CLOUDINARY_URL) throw new Error('Cloudinary configuration is missing');
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
  const assets = {
    silver: 'public/assets/rewards/silver-bullion.png',
    gold: 'public/assets/rewards/gold-bullion.png',
    car: 'public/assets/rewards/tata-punch.png',
    bike: 'public/assets/Royal Enfield Hunter 350.avif',
  };
  const urls = {};
  for (const [key, file] of Object.entries(assets)) {
    const result = await cloudinary.uploader.upload(path.resolve(file), {
      folder: 'sona/voucher-2026', public_id: `${key}-reward-v1`,
      overwrite: false, resource_type: 'image',
      transformation: [{ width: 1000, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
    });
    urls[key] = result.secure_url;
    console.log(`Stored ${key} reward image`);
  }
  const tiers = await prisma.slab.findMany({ where: { active: true, id: { startsWith: 'voucher-2026-' } } });
  const updates = [];
  for (const tier of tiers) {
    const data = {};
    for (const option of ['A', 'B', 'C', 'D']) {
      const name = tier[`gift${option}`] || '';
      const key = /SILVER/i.test(name) ? 'silver' : /GOLD/i.test(name) ? 'gold' : /TATA PUNCH/i.test(name) ? 'car' : /HUNTER 350/i.test(name) ? 'bike' : null;
      if (key) data[`gift${option}Img`] = urls[key];
    }
    if (Object.keys(data).length) updates.push(prisma.slab.update({ where: { id: tier.id }, data }));
  }
  await prisma.$transaction(updates);
  fs.writeFileSync('public/assets/rewards/manifest.json', JSON.stringify(urls, null, 2) + '\n');
  console.log(`Updated images on ${updates.length} reward tiers.`);
}
main().catch(error => {
  console.error('Image storage failed:', error.code || error.http_code || error.name);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
