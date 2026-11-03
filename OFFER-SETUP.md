# Voucher offer administration

Manage the current voucher offer at `/admin/slabs`: add, edit or remove QTL tiers,
upload reward images, and change the inclusive offer dates. Removed and previous
tiers are retained in the database to preserve redemption history.

The October 2026 voucher has 12 tiers and runs from 2026-10-01 to 2027-03-15.
For another environment, apply `npx prisma db push` and run
`node scripts/seed-voucher-offer.js` once to initialize this offer. The initializer
archives other tiers; do not run it as part of every deployment.

Set `ADMIN_PASSWORD` and a long random `ADMIN_SESSION_SECRET` in the server
environment before deployment. Local values are configured in the ignored `.env`.
Admin offer changes require an eight-hour HTTP-only session. Offer dates describe
the campaign; the existing reward-distribution setting still controls claim opening.
