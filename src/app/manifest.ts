import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BrewFlow POS',
    short_name: 'BrewFlow',
    description: 'Point of Sale for Coffee Shops',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F5DC', // Creamy Beige
    theme_color: '#6F4E37', // Warm Coffee Brown
    icons: [
      {
        src: '/icon-192x192.png', // Placeholder, actual icon needed
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png', // Placeholder, actual icon needed
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
