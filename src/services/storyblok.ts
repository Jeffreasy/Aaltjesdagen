import { useStoryblokApi } from '@storyblok/astro'

export async function getStory(slug: string, version: 'draft' | 'published' = 'draft') {
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version,
  })
  return data.story
}

export async function getAllStories(version: 'draft' | 'published' = 'draft') {
  const storyblokApi = useStoryblokApi()
  
  // Use getAll() to fetch all stories with pagination support
  // getAll() returns an array directly
  const stories = await storyblokApi.getAll('cdn/stories', {
    version,
    // Voeg een timestamp toe om caching in development te voorkomen
    cv: Date.now(),
  })
  
  return stories
}
