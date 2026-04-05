// app/products/luvera-mens-daily-moisturizer/constants.ts
//
// ─── Shopify direct-checkout URLs ────────────────────────────────────────────
// Replace these with your actual Shopify variant checkout URLs.
// Format: https://YOUR-STORE.myshopify.com/cart/VARIANT_ID:QUANTITY
// You can find the variant ID in Shopify admin → Products → your product → variant.
//
export const CHECKOUT_URLS = {
  single: 'https://luvera-9280.myshopify.com/cart/46411922964655',
  trio:   'https://your-store.myshopify.com/cart/46411922964655',
} as const

// ─── Product variants ─────────────────────────────────────────────────────────
export const VARIANTS = [
  {
    id:       'single',
    label:    'Single Tub',
    price:    '$34.99',
    oldPrice: '$49.99',
    badge:    null,
    perks:    ['1× Luvera Daily Moisturizer', 'Free shipping', '90-day guarantee'],
    checkoutUrl: CHECKOUT_URLS.single,
  },
  {
    id:       'trio',
    label:    'The Trio Set',
    price:    '$69.99',
    oldPrice: '$104.97',
    badge:    'Best Value',
    perks:    [
      '2× Luvera Daily Moisturizer',
      '+ Free Cooling Face Roller',
      '+ Men\'s Skin Reset Guide',
      '+ Skin Ingredient Decoder',
      'Free shipping',
      '90-day guarantee',
    ],
    checkoutUrl: CHECKOUT_URLS.trio,
  },
] as const

export type VariantId = typeof VARIANTS[number]['id']