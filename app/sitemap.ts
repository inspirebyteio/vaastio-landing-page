import { MetadataRoute } from 'next'

const BASE_URL = 'https://vaastio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/builders`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
