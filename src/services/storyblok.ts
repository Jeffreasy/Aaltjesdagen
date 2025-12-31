import { useStoryblokApi } from '@storyblok/astro'
import { logStoryblokFetch, logError, logBuildMetric } from '../utils/logger'

export async function getStory(slug: string, version: 'draft' | 'published' = 'draft') {
  const startTime = Date.now()

  try {
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
    })

    const duration = Date.now() - startTime
    logStoryblokFetch(slug, version, duration)

    return data.story
  } catch (error) {
    logError(`Failed to fetch story: ${slug}`, error as Error, { version })
    throw error
  }
}

export async function getAllStories(version: 'draft' | 'published' = 'draft') {
  const startTime = Date.now()

  try {
    const storyblokApi = useStoryblokApi()

    // Use getAll() to fetch all stories with pagination support
    // getAll() returns an array directly
    const stories = await storyblokApi.getAll('cdn/stories', {
      version,
      // Voeg een timestamp toe om caching in development te voorkomen
      cv: Date.now(),
    })

    const duration = Date.now() - startTime
    logBuildMetric('Fetched all stories', duration, stories.length)

    return stories
  } catch (error) {
    logError('Failed to fetch all stories', error as Error, { version })
    throw error
  }
}
