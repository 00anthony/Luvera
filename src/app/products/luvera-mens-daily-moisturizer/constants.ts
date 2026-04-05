// app/products/luvera-mens-daily-moisturizer/constants.ts

// ─── Shopify product config ───────────────────────────────────────────────────
// The single variant GID — same variant used for both single and trio orders.
// Trio adds quantity: 3 and applies the TRIO_SET discount code via cartCreate.
export const VARIANT_GID = 'gid://shopify/ProductVariant/46411922964655'

// Discount code created in Shopify Admin → Discounts → TRIO_SET
// Set it as a fixed-amount discount (e.g. $34.98 off) that fires when qty >= 3.
export const TRIO_DISCOUNT_CODE = 'TRIO_SET'

// ─── Product variants (UI data only — no hardcoded checkout URLs) ─────────────
export const VARIANTS = [
  {
    id:           'single' as const,
    label:        'Single Tub',
    price:        '$34.99',
    oldPrice:     '49.99',
    badge:        null as string | null,
    quantity:     1,
    discountCode: null as string | null,
    perks:        ['1× Luvera Daily Moisturizer', 'Free shipping', '90-day guarantee'],
  },
  {
    id:           'trio' as const,
    label:        'The Trio Set',
    price:        '$69.99',
    oldPrice:     '$104.97',
    badge:        'Best Value',
    quantity:     3,
    discountCode: TRIO_DISCOUNT_CODE,
    perks:        [
      '3× Luvera Daily Moisturizer',
      '+ Free Cooling Face Roller',
      "+ Men's Skin Reset Guide",
      '+ Skin Ingredient Decoder',
      'Free shipping',
      '90-day guarantee',
    ],
  },
] as const

export type VariantId = typeof VARIANTS[number]['id']