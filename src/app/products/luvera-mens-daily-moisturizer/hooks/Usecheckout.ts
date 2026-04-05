// app/products/luvera-mens-daily-moisturizer/hooks/useCheckout.ts
'use client'

import { useState } from 'react'
import { VARIANT_GID } from '../constants'

interface CheckoutOptions {
  quantity:     number
  discountCode: string | null
}

interface UseCheckoutReturn {
  loading:    boolean
  error:      string | null
  checkout:   (opts: CheckoutOptions) => Promise<void>
}

export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false)
  const [error,   setError  ] = useState<string | null>(null)

  const checkout = async ({ quantity, discountCode }: CheckoutOptions) => {
    setLoading(true)
    setError(null)

    try {
      // Build the cartCreate mutation.
      // discountCodes is an optional array — omit it entirely for the single variant
      // so we don't accidentally invalidate carts with an empty-string code.
      const mutation = `
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

      const input: Record<string, unknown> = {
        lines: [
          {
            quantity,
            merchandiseId: VARIANT_GID,
          },
        ],
      }

      if (discountCode) {
        input.discountCodes = [discountCode]
      }

      const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2026-01/graphql.json`,
        {
          method:  'POST',
          headers: {
            'Content-Type':                       'application/json',
            'X-Shopify-Storefront-Access-Token':  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
          },
          body: JSON.stringify({ query: mutation, variables: { input } }),
        }
      )

      const json = await res.json()

      if (json.errors?.length) {
        throw new Error(json.errors[0].message)
      }

      const userErrors = json.data?.cartCreate?.userErrors
      if (userErrors?.length) {
        throw new Error(userErrors[0].message)
      }

      const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl
      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from Shopify.')
      }

      // Redirect directly to Shopify's hosted checkout
      window.location.href = checkoutUrl

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(msg)
      console.error('[useCheckout]', err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, checkout }
}