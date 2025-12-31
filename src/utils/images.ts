/**
 * Image Utility Functions
 * Helpers for working with Storyblok images and transformations
 * 
 * @module utils/images
 */

import { logImageOptimization } from './logger';

/**
 * Generate Storyblok image URL with transformations
 * 
 * @param filename - Storyblok image filename (full URL)
 * @param width - Desired width in pixels (default: 800)
 * @param height - Desired height in pixels (default: 600)
 * @param quality - Image quality 0-100 (default: 80)
 * @param format - Output format (default: 'webp')
 * @returns Transformed image URL
 * 
 * @example
 * ```typescript
 * const url = storyblokImage(img.filename, 1200, 800);
 * // Returns: "https://a.storyblok.com/f/.../image.jpg/m/1200x800/filters:quality(80):format(webp)"
 * ```
 */
export function storyblokImage(
    filename: string,
    width: number = 800,
    height: number = 600,
    quality: number = 80,
    format: 'webp' | 'jpg' | 'png' = 'webp'
): string {
    if (!filename) return '';

    // Log image optimization in development mode
    const urlParts = filename.split('/');
    const imageName = urlParts[urlParts.length - 1] || 'unknown';
    logImageOptimization(imageName, format, quality);

    return `${filename}/m/${width}x${height}/filters:quality(${quality}):format(${format})`;
}

/**
 * Generate responsive image srcset for Storyblok images
 * 
 * @param filename - Storyblok image filename
 * @param sizes - Array of widths for srcset
 * @param quality - Image quality (default: 80)
 * @returns srcset string
 * 
 * @example
 * ```typescript
 * const srcset = responsiveImageSrcset(img.filename, [400, 800, 1200]);
 * // Returns: "...400w, ...800w, ...1200w"
 * ```
 */
export function responsiveImageSrcset(
    filename: string,
    sizes: number[] = [400, 800, 1200, 1600],
    quality: number = 80
): string {
    if (!filename) return '';

    return sizes
        .map(width => {
            const height = Math.round(width * 0.75); // Maintain 4:3 aspect ratio
            const url = storyblokImage(filename, width, height, quality);
            return `${url} ${width}w`;
        })
        .join(', ');
}
