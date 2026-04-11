/**
 * Main JavaScript - Quadrifolio Website
 * Handles navigation, scroll effects, animations, mobile menu, and form validation
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        headerScrollThreshold: 50, // Pixels scrolled before header effect
        headerOffset: 100,         // Offset for smooth scroll (accounts for fixed header)
        scrollAnimationThreshold: 0.15, // 15% of element visible triggers animation
    };

    // Elements
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section[id]');

    /**
     * Initialize all functionality
     */
    function init() {
        setupSmoothScroll();
        setupActiveNavHighlight();
        setupMobileMenu();
        setupDropdownMenus();
        setupScrollAnimations();
        setupHeaderScrollEffect();
        setupFormValidation();
    }

    /**
     * SMOOTH SCROLL NAVIGATION
     * Smooth scroll to sections with fixed header offset
     */
    function setupSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle internal anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();

                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        // Close mobile menu if open
                        closeMobileMenu();

                        // Calculate position accounting for fixed header
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetSection.offsetTop - headerHeight - 20;

                        // Smooth scroll to target
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Update URL hash without jumping
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });
    }

    /**
     * ACTIVE NAVIGATION HIGHLIGHT
     * Detect which section is in viewport and highlight corresponding nav link
     */
    function setupActiveNavHighlight() {
        // Use Intersection Observer for better performance
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    updateActiveNavLink(sectionId);
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Update active state of navigation links
     * @param {string} activeSectionId - ID of currently active section
     */
    function updateActiveNavLink(activeSectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * MOBILE MENU TOGGLE
     * Hamburger button functionality and menu interactions
     */
    function setupMobileMenu() {
        if (!hamburger || !navMenu) return;

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu open/closed
     */
    function toggleMobileMenu() {
        if (!hamburger || !navMenu) return;

        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', isOpen);

        // Prevent body scroll when menu is open (optional)
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (!hamburger || !navMenu) return;

        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /**
     * DROPDOWN MENUS
     * Handle dropdown navigation on mobile (click-to-toggle) and desktop (hover handled by CSS)
     */
    function setupDropdownMenus() {
        const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                // On mobile, toggle dropdown instead of navigating
                const isMobile = window.innerWidth <= 768;
                if (isMobile) {
                    e.preventDefault();
                    const parentItem = toggle.closest('.nav-item');
                    const isOpen = parentItem.classList.contains('dropdown-open');

                    // Close all other dropdowns
                    document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                        if (item !== parentItem) item.classList.remove('dropdown-open');
                    });

                    parentItem.classList.toggle('dropdown-open', !isOpen);
                }
            });
        });

        // Dropdown links should scroll to section and close menu
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    closeMobileMenu();
                    document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                        item.classList.remove('dropdown-open');
                    });

                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });
    }

    /**
     * SCROLL ANIMATIONS
     * Fade in elements when they enter viewport using Intersection Observer
     */
    function setupScrollAnimations() {
        // Select elements to animate
        const animatedElements = document.querySelectorAll(
            '.section-title, .intro-text, .description-text, .service-card, .gallery-item, .contact-info, .contact-form-wrapper'
        );

        if (!animatedElements.length) return;

        // Add initial state class
        animatedElements.forEach(el => {
            el.classList.add('fade-in-element');
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: CONFIG.scrollAnimationThreshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing after animation to improve performance
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * HEADER SCROLL EFFECT
     * Add shadow and background when scrolled past threshold
     */
    function setupHeaderScrollEffect() {
        if (!header) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleHeaderScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check
        handleHeaderScroll();
    }

    /**
     * Handle header scroll effect
     */
    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > CONFIG.headerScrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * FORM VALIDATION
     * Validate contact form fields and show success/error messages
     */
    function setupFormValidation() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous error messages
            clearFormErrors();

            // Get form fields
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const mensagem = document.getElementById('mensagem');

            let isValid = true;

            // Validate Nome (Name) - not empty
            if (!nome.value.trim()) {
                showFieldError(nome, 'Por favor, insira o seu nome.');
                isValid = false;
            }

            // Validate E-mail - valid email format
            if (!email.value.trim()) {
                showFieldError(email, 'Por favor, insira o seu e-mail.');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showFieldError(email, 'Por favor, insira um e-mail válido.');
                isValid = false;
            }

            // Validate Telefone (Phone) - optional but check format if provided
            if (telefone.value.trim() && !isValidPhone(telefone.value.trim())) {
                showFieldError(telefone, 'Por favor, insira um telefone válido.');
                isValid = false;
            }

            // Validate Mensagem (Message) - not empty
            if (!mensagem.value.trim()) {
                showFieldError(mensagem, 'Por favor, insira a sua mensagem.');
                isValid = false;
            }

            // If valid, submit form
            if (isValid) {
                submitForm({
                    nome: nome.value.trim(),
                    email: email.value.trim(),
                    telefone: telefone.value.trim(),
                    mensagem: mensagem.value.trim()
                });
            }
        });

        // Real-time validation on input
        const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            input.addEventListener('input', () => {
                // Clear error when user starts typing
                clearFieldError(input);
            });
        });
    }

    /**
     * Validate individual field
     * @param {HTMLElement} field - Input field to validate
     */
    function validateField(field) {
        const value = field.value.trim();

        switch (field.id) {
            case 'nome':
                if (!value) {
                    showFieldError(field, 'Por favor, insira o seu nome.');
                }
                break;
            case 'email':
                if (!value) {
                    showFieldError(field, 'Por favor, insira o seu e-mail.');
                } else if (!isValidEmail(value)) {
                    showFieldError(field, 'Por favor, insira um e-mail válido.');
                }
                break;
            case 'telefone':
                if (value && !isValidPhone(value)) {
                    showFieldError(field, 'Por favor, insira um telefone válido.');
                }
                break;
            case 'mensagem':
                if (!value) {
                    showFieldError(field, 'Por favor, insira a sua mensagem.');
                }
                break;
        }
    }

    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone format (Portuguese phone numbers)
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - True if valid
     */
    function isValidPhone(phone) {
        // Remove spaces and common separators
        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        // Portuguese phone: 9 digits or with country code +351
        const phoneRegex = /^(\+351)?[0-9]{9}$/;
        return phoneRegex.test(cleanPhone);
    }

    /**
     * Show field error message
     * @param {HTMLElement} field - Input field
     * @param {string} message - Error message
     */
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Add error class to field
        field.classList.add('error');

        // Remove existing error message if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    /**
     * Clear field error
     * @param {HTMLElement} field - Input field
     */
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        field.classList.remove('error');

        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    /**
     * Clear all form errors
     */
    function clearFormErrors() {
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());

        const errorFields = contactForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    /**
     * Submit form (simulated - would normally send to backend)
     * @param {Object} formData - Form data object
     */
    function submitForm(formData) {
        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'A enviar...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Success
            showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contacto em breve.');

            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Log form data (for testing - remove in production)
            console.log('Form submitted:', formData);

            // In production, you would send this to a backend:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showSuccessMessage('Mensagem enviada com sucesso!');
                contactForm.reset();
            })
            .catch(error => {
                showErrorMessage('Erro ao enviar mensagem. Por favor, tente novamente.');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
            */
        }, 1500);
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    function showSuccessMessage(message) {
        const messageDiv = createMessageDiv(message, 'success');
        contactForm.insertAdjacentElement('beforebegin', messageDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    function showErrorMessage(message) {
        const messageDiv = createMessageDiv(message, 'error');
        contactForm.insertAdjacentElement('beforebegin', messageDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    /**
     * Create message div
     * @param {string} message - Message text
     * @param {string} type - Message type (success or error)
     * @returns {HTMLElement} - Message div element
     */
    function createMessageDiv(message, type) {
        const div = document.createElement('div');
        div.className = `form-message form-message-${type}`;
        div.textContent = message;
        div.setAttribute('role', 'alert');

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'message-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Fechar mensagem');
        closeBtn.onclick = () => div.remove();

        div.appendChild(closeBtn);

        return div;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
