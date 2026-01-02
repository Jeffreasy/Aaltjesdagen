/**
 * Storyblok Image Utilities
 * Helpers for Storyblok CDN image transformations
 * 
 * @module utils/plugins/storyblok/images
 */

import { logImageOptimization } from '../../logger';

/**
 * Generate Storyblok image URL with transformations
 * 
 * @param filename - Storyblok image filename (full URL)
 * @param width - Target width in pixels
 * @param height - Target height in pixels
 * @param quality - JPEG/WebP quality (0-100)
 * @param format - Output format
 * @returns Transformed image URL
 */
export function storyblokImage(
    filename: string,
    width: number = 800,
    height: number = 600,
    quality: number = 80,
    format: 'webp' | 'jpg' | 'png' = 'webp'
): string {
    if (!filename) return '';

    const imageName = filename.split('/').pop()?.split('?')[0] || 'image';
    logImageOptimization(imageName, format, quality);

    return `${filename}/m/${width}x${height}/filters:quality(${quality}):format(${format})`;
}

/**
 * Generate responsive image srcset for Storyblok images
 * 
 * @param filename - Storyblok image filename
 * @param sizes - Array of widths for srcset
 * @param quality - Image quality
 * @returns srcset string
 */
export function responsiveImageSrcset(
    filename: string,
    sizes: number[] = [400, 800, 1200, 1600],
    quality: number = 80
): string {
    if (!filename) return '';

    return sizes
        .map(width => {
            const height = Math.round(width * 0.75);
            const url = storyblokImage(filename, width, height, quality);
            return `${url} ${width}w`;
        })
        .join(', ');
}
