const KEY = import.meta.env.VITE_FLW_PUBLIC_KEY
export const demoMode = !KEY

const loadScript = () => new Promise((ok, fail) => {
  if (window.FlutterwaveCheckout) return ok()
  const s = document.createElement('script')
  s.src = 'https://checkout.flutterwave.com/v3.js'
  s.onload = ok
  s.onerror = () => fail(new Error('could not load the payment provider'))
  document.head.appendChild(s)
})

// Card details are entered in the provider's hosted modal, never on this site.
// Verify the transaction server-side before fulfilling real orders.
export async function pay({ amount, currency, email, name, phone }) {
  if (demoMode) return { status: 'demo', ref: 'DEMO-' + Date.now() }
  await loadScript()
  return new Promise(resolve => window.FlutterwaveCheckout({
    public_key: KEY, tx_ref: 'RAL-' + Date.now(), amount, currency,
    customer: { email, name, phone_number: phone },
    customizations: { title: 'Read-A-Lot' },
    callback: r => resolve({ status: r.status, ref: r.tx_ref }),
    onclose: () => resolve({ status: 'cancelled' })
  }))
}
