const mk = (id, title, img) => ({ id, title, img: `/image/${img}`, price: 15.99, old: 20.99 })

export const books = [
  mk('livid', 'Livid', 'livid.jpeg'), mk('give-thanks', 'Give Thanks', 'book-2.png'), mk('blue-horizon', 'Blue Horizon', 'book-3.png'),
  mk('helping-hands', 'Helping Hands', 'book-4.png'), mk('listen-to-music', 'Listen to Music', 'book-5.png'), mk('green-skyline', 'Green Skyline', 'book-6.png'),
  mk('the-lighthouse', 'The Lighthouse', 'book-7.png'), mk('black-history-month', 'Black History Month', 'book-8.png'), mk('love', 'Love', 'book-9.png'),
  mk('retro', 'Retro', 'book-10.png'), mk('it', 'IT', 'it.jpeg'), mk('goosebumps', 'Goosebumps', 'goosebumps.jpg'),
  mk('orders-of-battle', 'Orders of Battle', 'order.webp'), mk('heavens-peak', "Welcome to Heaven's Peak", 'peak.jpg'), mk('dark-forces', 'Dark Forces', 'dark.jpeg'),
  mk('phoenix-saga', 'The Phoenix Saga', 'pheonix.jpg'), mk('falling', 'Falling', 'falling.jpeg')
]
export const byId = Object.fromEntries(books.map(b => [b.id, b]))
const pick = ids => ids.map(i => byId[i])
export const featured = pick(['livid', 'give-thanks', 'blue-horizon', 'helping-hands', 'listen-to-music', 'green-skyline', 'the-lighthouse', 'black-history-month', 'love', 'retro'])
export const arrivals = pick(['it', 'livid', 'goosebumps', 'orders-of-battle', 'heavens-peak', 'dark-forces', 'phoenix-saga', 'falling', 'love', 'retro'])
