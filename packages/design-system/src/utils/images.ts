/**
 * Generic Image Utilities
 * Framework-agnostic image optimization helpers
 * 
 * @module utils/images
 */

export interface ImageOptions {
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
}

/**
 * Generic image URL optimization
 * Can be overridden per-project for different CDNs
 * 
 * @param baseUrl - Base image URL
 * @param width - Target width
 * @param height - Target height
 * @param options - Transformation options
 * @returns Optimized URL
 */
export function optimizeImageUrl(
    baseUrl: string,
    width: number,
    height: number,
    options: ImageOptions = {}
): string {
    // Generic implementation - projects can override
    // This is a passthrough by default
    return baseUrl;
}

/**
 * Generate responsive srcset
 * 
 * @param baseUrl - Base image URL
 * @param sizes - Array of widths
 * @param options - Image options
 * @returns srcset string
 */
export function generateSrcSet(
    baseUrl: string,
    sizes: number[],
    options: ImageOptions = {}
): string {
    return sizes
        .map(width => {
            const height = Math.round(width * 0.75); // 4:3 aspect ratio
            return `${baseUrl} ${width}w`;
        })
        .join(', ');
}
