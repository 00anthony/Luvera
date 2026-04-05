// app/api/shopify/checkout/route.ts
//
// Server-side Route Handler. The Shopify Storefront token never reaches
// the browser — it stays in Node's process.env at request time.
// The client just POSTs { quantity, discountCode } and gets back { checkoutUrl }.

import { NextRequest, NextResponse } from 'next/server'

const VARIANT_GID = 'gid://shopify/ProductVariant/46411922964655'

const MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(req: NextRequest) {
  try {
    const { quantity, discountCode } = await req.json() as {
      quantity:     number
      discountCode: string | null
    }

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    const token  = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
      // Fall back to the NEXT_PUBLIC_ version if only that one is set
      ?? process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

    if (!domain || !token) {
      console.error('[checkout/route] Missing Shopify env vars', { domain: !!domain, token: !!token })
      return NextResponse.json(
        { error: 'Store configuration missing. Please contact support.' },
        { status: 500 }
      )
    }

    const input: Record<string, unknown> = {
      lines: [{ quantity, merchandiseId: VARIANT_GID }],
    }
    if (discountCode) {
      input.discountCodes = [discountCode]
    }

    const shopifyRes = await fetch(
      `https://${domain}/api/2026-01/graphql.json`,
      {
        method:  'POST',
        headers: {
          'Content-Type':                      'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query: MUTATION, variables: { input } }),
      }
    )

    if (!shopifyRes.ok) {
      const text = await shopifyRes.text()
      console.error('[checkout/route] Shopify HTTP error', shopifyRes.status, text)
      return NextResponse.json(
        { error: `Shopify returned ${shopifyRes.status}` },
        { status: 502 }
      )
    }

    const json = await shopifyRes.json()

    if (json.errors?.length) {
      return NextResponse.json({ error: json.errors[0].message }, { status: 400 })
    }

    const userErrors = json.data?.cartCreate?.userErrors
    if (userErrors?.length) {
      return NextResponse.json({ error: userErrors[0].message }, { status: 400 })
    }

    const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl
    if (!checkoutUrl) {
      return NextResponse.json({ error: 'No checkout URL returned.' }, { status: 502 })
    }

    return NextResponse.json({ checkoutUrl })

  } catch (err) {
    console.error('[checkout/route] Unexpected error', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}