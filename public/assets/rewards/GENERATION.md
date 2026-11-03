# Reward images

Created with the built-in image generation tool. Local PNG originals are retained here; Cloudinary delivery URLs are stored in `manifest.json` and the corresponding Slab gift image fields.

Prompt set (product-mockup):

- Silver: Premium photorealistic catalog image of one polished silver bullion bar, three-quarter view, soft studio reflections, warm white seamless background, subtle contact shadow, landscape 4:3, generous margins. No weight or purity markings, text, logos, or watermark. Exact grams supplied in the UI.
- Gold: Premium photorealistic catalog image of one small polished gold ingot, rich yellow metallic material, three-quarter view, soft studio highlights, warm white seamless background, subtle contact shadow, landscape 4:3, generous margins. No weight or purity markings, text, logos, or watermark. Exact grams supplied in the UI.
- Car: Photorealistic representative catalog illustration of a white Tata Punch compact SUV, front three-quarter view, whole vehicle and wheels visible, warm white seamless studio background, soft shadow, recognizable body proportions, split front headlights, black lower cladding, simple wheels, restrained base-trim detailing, landscape 4:3, generous margins, blank license plate, no advertising text or watermark. Representative TATA PUNCH EX reward illustration, not an exact specification photograph.

The Hunter 350 uses the existing project product image. Silver and gold images are shared across their respective weight tiers; each card states the offered weight.

Run `node scripts/store-offer-images.js` to upload assets and associate them with matching active voucher rewards. This does not change targets, reward names, or offer dates.
