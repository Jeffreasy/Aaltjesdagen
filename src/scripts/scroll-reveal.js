/**
 * SCROLL REVEAL ALPINE.JS PLUGIN - IMPROVED VERSION
 * Professional scroll-based component loading using Intersection Observer
 * 
 * KEY FIX: Elements already in viewport at page load are revealed immediately
 * without animation to prevent invisible content.
 * 
 * Usage:
 * <div x-scroll-reveal.fade class="scroll-reveal-fade">Content</div>
 * <div x-scroll-reveal.slide-up class="scroll-reveal-slide-up">Content</div>
 * <div x-scroll-reveal class="scroll-reveal-stagger">Content with children</div>
 */

export default (Alpine) => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px', // No margin - detect actual viewport intersection
        threshold: 0.1,
    };

    // Helper function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0
        );
    };

    // Create a single observer instance for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Skip if already revealed
                if (element.classList.contains('revealed')) {
                    return;
                }

                // If reduced motion is preferred, skip animations
                if (prefersReducedMotion) {
                    element.classList.add('revealed');
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                    observer.unobserve(element);
                    return;
                }

                // Add 'revealed' class to trigger CSS animations
                element.classList.add('revealed');

                // Unobserve after revealing (one-time animation)
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Alpine.js directive
    Alpine.directive('scroll-reveal', (el, { modifiers }, { cleanup }) => {
        // Check if already in viewport at initialization
        const alreadyVisible = isInViewport(el);

        // If reduced motion is preferred OR already visible, reveal immediately
        if (prefersReducedMotion || alreadyVisible) {
            el.classList.add('revealed');
            el.style.opacity = '1';
            el.style.transform = 'none';
            return;
        }

        // Apply initial hidden state for elements not yet in viewport
        el.classList.add('scroll-reveal');

        // Apply modifier-specific classes
        if (modifiers.fade) {
            el.classList.add('scroll-reveal-fade');
        } else if (modifiers['slide-up']) {
            el.classList.add('scroll-reveal-slide-up');
        } else if (modifiers['slide-left']) {
            el.classList.add('scroll-reveal-slide-left');
        } else if (modifiers.scale) {
            el.classList.add('scroll-reveal-scale');
        }

        // Start observing the element
        observer.observe(el);

        // Cleanup on element removal
        cleanup(() => {
            observer.unobserve(el);
        });
    });
};
