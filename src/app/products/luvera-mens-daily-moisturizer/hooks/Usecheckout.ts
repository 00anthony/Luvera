// app/products/luvera-mens-daily-moisturizer/hooks/useCheckout.ts
'use client'

import { useState } from 'react'

interface CheckoutOptions {
  quantity:     number
  discountCode: string | null
}

interface UseCheckoutReturn {
  loading:  boolean
  error:    string | null
  checkout: (opts: CheckoutOptions) => Promise<void>
}

export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false)
  const [error,   setError  ] = useState<string | null>(null)

  const checkout = async ({ quantity, discountCode }: CheckoutOptions) => {
    setLoading(true)
    setError(null)

    try {
      // POST to our own Next.js route handler — Shopify token never touches the browser
      const res = await fetch('/api/shopify/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ quantity, discountCode }),
      })

      const data = await res.json() as { checkoutUrl?: string; error?: string }

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Request failed with status ${res.status}`)
      }

      if (!data.checkoutUrl) {
        throw new Error('No checkout URL returned.')
      }

      window.location.href = data.checkoutUrl

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