require('@next/env').loadEnvConfig(process.cwd());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const tiers = [
  [150, '40 GM SILVER'], [250, '70 GM SILVER'], [350, '100 GM SILVER'],
  [500, '150 GM SILVER'], [750, '250 GM SILVER'], [1000, '5 GM GOLD'],
  [1250, '6 GM GOLD', 'ROYAL ENFIELD HUNTER 350 (EX SHOWROOM)'],
  [1500, '8 GM GOLD'], [2000, '12 GM GOLD'], [3000, '20 GM GOLD'],
  [4000, '30 GM GOLD'], [5000, 'TATA PUNCH EX'],
];
async function main() {
  await prisma.$transaction(async (tx) => {
    // Stable IDs make reruns safe. Preserve previous tiers and redemption links.
    await tx.slab.updateMany({ where: { id: { notIn: tiers.map(([target]) => `voucher-2026-${target}`) } }, data: { active: false } });
    for (const [index, [target, giftA, giftB]] of tiers.entries()) {
      const id = `voucher-2026-${target}`;
      await tx.slab.upsert({ where: { id }, update: {}, create: {
        id, level: String(index + 1), target, giftA, giftB: giftB || null,
        giftBImg: giftB ? '/assets/Royal Enfield Hunter 350.avif' : null,
      } });
    }
    await tx.settings.upsert({ where: { id: 'global' },
      update: { offerStart: '2026-10-01', offerEnd: '2027-03-15' },
      create: { id: 'global', offerStart: '2026-10-01', offerEnd: '2027-03-15' },
    });
  });
  const rows = await prisma.slab.findMany({ where: { active: true }, orderBy: { target: 'asc' }, select: { target: true, giftA: true, giftB: true } });
  console.log(JSON.stringify(rows, null, 2));
}
main().catch(() => { console.error('Offer seed failed; database transaction rolled back.'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
