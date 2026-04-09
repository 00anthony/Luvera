// app/products/luvera-mens-daily-moisturizer/constants.ts
//
// Direct Shopify cart URLs — no API call, no redirect issues, works on all plans.
//
// URL format:
//   https://STORE.myshopify.com/cart/VARIANT_NUMERIC_ID:QUANTITY?discount=CODE
//
// The numeric variant ID (46411922964655) is extracted from the GID:
//   gid://shopify/ProductVariant/46411922964655
//                                ^^^^^^^^^^^^^^^^ this part
//
// These URLs go directly to Shopify's checkout infrastructure,
// bypassing the custom domain redirect entirely.

const STORE    = 'luvera-9280.myshopify.com'
const VARIANT  = '46411922964655'

export const CHECKOUT_URLS = {
  single: `https://${STORE}/cart/${VARIANT}:1`,
  trio:   `https://${STORE}/cart/${VARIANT}:3?discount=TRIO_SET`,
} as const

// ─── Product variants ─────────────────────────────────────────────────────────
export const VARIANTS = [
  {
    id:          'single' as const,
    label:       'Single Tub',
    price:       '$34.99',
    oldPrice:    null as string | null,
    badge:       null as string | null,
    checkoutUrl: CHECKOUT_URLS.single,
    perks:       [
      '1× Luvera Daily Moisturizer',
      'Free shipping',
      '90-day guarantee',
    ],
  },
  {
    id:          'trio' as const,
    label:       'The Trio Set',
    price:       '$69.99',
    oldPrice:    '$104.97',
    badge:       'Best Value',
    checkoutUrl: CHECKOUT_URLS.trio,
    perks:       [
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