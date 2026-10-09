# Read-A-Lot (Vue 3 + Vite + Pinia + Vue Router)

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # output in dist/

Copy `.env.example` to `.env` and fill in what you need.

- Catalogue: `src/data/books.js` (titles, prices, images in `public/image`)
- Cart, favourites and profile: `src/stores/shop.js` (saved in localStorage)
- Payments: `src/payments.js` (Flutterwave inline checkout; no card data touches this site)
- SPA hosting: `public/_redirects` covers Netlify/Cloudflare Pages. GitHub Pages needs a copy of index.html as 404.html.
- Rotate the old Google Books key that was committed in the original repo; it remains in git history.
