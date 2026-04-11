/**
 * Hero Slider - Quadrifolio Website
 * Implements auto-advancing image slider with manual controls
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        autoAdvanceInterval: 6000, // 6 seconds
        transitionDuration: 700,   // 700ms matches CSS transition
    };

    // Slider Setup - Select all slide elements
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slider-dots');
    const prevButton = document.getElementById('slider-prev');
    const nextButton = document.getElementById('slider-next');

    // State
    let currentSlideIndex = 0;
    let autoAdvanceTimer = null;
    let isTransitioning = false;

    // Initialize slider
    function initSlider() {
        if (!slides.length) {
            console.warn('No slides found');
            return;
        }

        // Show first slide, hide others
        showSlide(0);

        // Create navigation dots dynamically
        createDots();

        // Set up event listeners
        setupEventListeners();

        // Start auto-advance
        startAutoAdvance();
    }

    /**
     * Create navigation dots dynamically
     */
    function createDots() {
        if (!dotsContainer) return;

        // Clear existing dots
        dotsContainer.innerHTML = '';

        // Create dot for each slide
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-slide', index + 1);
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');

            // Set first dot as active
            if (index === 0) {
                dot.classList.add('active');
            }

            // Click event for dot
            dot.addEventListener('click', () => {
                goToSlide(index);
            });

            // Keyboard support for dots
            dot.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(index);
                }
            });

            dotsContainer.appendChild(dot);
        });
    }

    /**
     * Set up event listeners for arrow controls
     */
    function setupEventListeners() {
        // Previous arrow
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                previousSlide();
            });
        }

        // Next arrow
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Pause auto-advance on hover
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                stopAutoAdvance();
            });

            sliderContainer.addEventListener('mouseleave', () => {
                startAutoAdvance();
            });
        }
    }

    /**
     * Show specific slide with fade transition
     * @param {number} index - Index of slide to show
     */
    function showSlide(index) {
        if (isTransitioning) return;

        // Ensure index is within bounds
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        isTransitioning = true;

        // Remove active class from current slide
        slides[currentSlideIndex].classList.remove('active');

        // Update current index
        currentSlideIndex = index;

        // Add active class to new slide
        slides[currentSlideIndex].classList.add('active');

        // Update active dot
        updateActiveDot(index);

        // Reset transitioning flag after transition completes
        setTimeout(() => {
            isTransitioning = false;
        }, CONFIG.transitionDuration);
    }

    /**
     * Update active state of navigation dots
     * @param {number} index - Index of active dot
     */
    function updateActiveDot(index) {
        if (!dotsContainer) return;

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Go to specific slide (called by dot clicks)
     * @param {number} index - Target slide index
     */
    function goToSlide(index) {
        if (index === currentSlideIndex) return;

        // Reset auto-advance timer on manual interaction
        resetAutoAdvance();

        showSlide(index);
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
        // Reset auto-advance timer on manual interaction
        resetAutoAdvance();

        const nextIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    /**
     * Go to previous slide
     */
    function previousSlide() {
        // Reset auto-advance timer on manual interaction
        resetAutoAdvance();

        const prevIndex = currentSlideIndex - 1;
        showSlide(prevIndex);
    }

    /**
     * Start auto-advance timer
     */
    function startAutoAdvance() {
        if (autoAdvanceTimer) return; // Already running

        autoAdvanceTimer = setInterval(() => {
            const nextIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(nextIndex);
        }, CONFIG.autoAdvanceInterval);
    }

    /**
     * Stop auto-advance timer
     */
    function stopAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }

    /**
     * Reset auto-advance timer (stop and restart)
     */
    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }

    // Initialize slider when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        initSlider();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoAdvance();
    });

})();
