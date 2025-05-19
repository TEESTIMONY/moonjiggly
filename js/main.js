// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Make sure social links and buttons are visible by default
    gsap.set('.social-link, .hero-buttons .btn', { opacity: 1 });
    
    // Custom cursor
    initCustomCursor();
    
    // Navigation menu handling
    initNavigation();
    
    // Jiggly animations
    initJigglyImage();
    
    // Add floating animations to various elements
    initFloatingElements();
    
    // Parallax scrolling for background elements
    initParallaxScrolling();
    
    // Animations
    initAnimations();
    
    // Background bubble animations
    initBackgroundEffects();
});

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Set initial position off-screen to avoid a jump
    gsap.set(cursor, { x: -100, y: -100 });
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power1.out'
        });
    });
    
    // Cursor effects on hover
    const hoverables = document.querySelectorAll('a, button, .btn, .play-button, .social-link, .feature-item');
    
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                backgroundColor: '#ff6ac1'
            });
        });
        
        hoverable.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                backgroundColor: '#ff6ac1'
            });
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.3
            });
        }
    });
    
    document.addEventListener('mouseenter', function() {
        gsap.to(cursor, {
            opacity: 0.7,
            duration: 0.3
        });
    });
}

// Navigation handling (mobile menu toggle, scroll effects)
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body class for overlay
            body.classList.toggle('menu-active');
            
            // Prevent body scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    } else {
        console.error("Mobile menu button not found");
    }
    
    // Close mobile menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-active');
                body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuBtn) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-active');
            body.style.overflow = '';
        }
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Moon Jiggly image animation
function initJigglyImage() {
    const moonJiggly = document.getElementById('moonjiggly');
    
    if (!moonJiggly) {
        console.warn("Moon Jiggly image element not found");
        return;
    }
    
    // Make sure Jiggly is visible
    moonJiggly.classList.add('active');
    
    // Create pulsing glow effect
    gsap.to(moonJiggly, {
        boxShadow: '0 0 30px rgba(255, 106, 193, 0.8)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Add click interaction - make Jiggly bounce more when clicked
    moonJiggly.addEventListener('click', () => {
        gsap.to(moonJiggly, {
            scale: 1.05,
            rotation: 5,
            duration: 0.3,
            ease: 'back.out',
            onComplete: () => {
                gsap.to(moonJiggly, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
        
        // Play a "jiggly" sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    });
}

// Add animations to various elements
function initAnimations() {
    // Animate hero section elements
    gsap.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content h2', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.token-badge', {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: 'elastic.out(1, 0.3)'
    });
    
    gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    // Animate sections as they scroll into view
    const sections = [
        { selector: '.about-content', stagger: 0.2 },
        { selector: '.features-grid .feature-item', stagger: 0.1 },
        { selector: '.tokenomics-content', stagger: 0.2 },
        { selector: '.social-links .social-link', stagger: 0.2 }
    ];
    
    // Ensure features section is always visible
    const featureItems = document.querySelectorAll('.features-grid .feature-item');
    if (featureItems.length) {
        // Set initial opacity to ensure visibility even if animations don't trigger
        gsap.set(featureItems, { opacity: 1, clearProps: "all" });
    }
    
    sections.forEach(section => {
        const elements = document.querySelectorAll(section.selector);
        
        if (elements.length) {
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: section.stagger,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elements[0].parentElement,
                    start: 'top 80%',
                    once: true // Only trigger animation once
                }
            });
        }
    });
    
    // Specific animations for section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            }
        });
        
        const span = title.querySelector('span');
        if (span) {
            gsap.to(span, {
                backgroundSize: '100% 3px',
                duration: 0.8,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                }
            });
        }
    });
    
    // Feature items hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 106, 193, 0.3)',
                duration: 0.3
            });
            
            const icon = item.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    rotation: 15,
                    scale: 1.1,
                    duration: 0.4,
                    ease: 'back.out'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                duration: 0.5,
                ease: 'power2.out'
            });
            
            const icon = item.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.3
                });
            }
        });
    });
    
    // Add glitch effect to the Moon Jiggly title
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitching');
            setTimeout(() => {
                glitchText.classList.remove('glitching');
            }, 200);
        }, 5000);
    }
}

// Floating animations for various elements
function initFloatingElements() {
    // Main floating animation for elements with .floating class
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        gsap.to(element, {
            y: '-15px',
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    });
    
    // Floating token badge
    const tokenBadge = document.querySelector('.token-badge');
    if (tokenBadge) {
        gsap.to(tokenBadge, {
            y: '-7px',
            rotation: '3deg',
            duration: 2.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    }
    
    // Moon Jiggly specific floating effects
    const moonJiggly = document.getElementById('moonjiggly');
    if (moonJiggly) {
        // Already handled in the initJigglyImage function
    }
    
    // Add floating effect to social link icons
    const socialIcons = document.querySelectorAll('.social-link i');
    socialIcons.forEach(icon => {
        gsap.to(icon, {
            y: '-5px',
            rotation: '10deg',
            duration: 1.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 0.5 // Randomize start time
        });
    });
}

// Parallax scrolling effects
function initParallaxScrolling() {
    // Parallax for hero background image
    const heroSection = document.querySelector('#hero-with-background:before');
    if (heroSection) {
        gsap.to(heroSection, {
            backgroundPosition: '50% 30%',
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero-with-background',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // Parallax for community section layers
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (parallaxLayers.length) {
        parallaxLayers.forEach((layer, index) => {
            const depth = (index + 1) * 0.2;
            
            gsap.to(layer, {
                y: () => -200 * depth,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.community-parallax',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }
    
    // Subtle parallax for other sections
    const sections = ['.about', '.features', '.tokenomics'];
    
    sections.forEach(section => {
        const sectionEl = document.querySelector(section);
        if (sectionEl) {
            gsap.to(sectionEl, {
                backgroundPosition: '50% 70%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });
}

// Background visual effects
function initBackgroundEffects() {
    // Animate hero section bubbles
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        const delay = index * 0.2;
        const duration = 15 + Math.random() * 10;
        
        gsap.to(bubble, {
            y: '-100vh',
            x: () => (Math.random() - 0.5) * 50 + 'px',
            opacity: 0,
            scale: 0.5,
            duration: duration,
            delay: delay,
            ease: 'none',
            repeat: -1,
            onRepeat: () => {
                gsap.set(bubble, {
                    y: '100vh',
                    x: (Math.random() - 0.5) * 100 + 'px',
                    opacity: 0.7,
                    scale: () => 0.5 + Math.random() * 0.5
                });
            }
        });
    });
    
    // Add random star twinkles to background
    const starCount = 20;
    const hero = document.querySelector('.hero');
    const community = document.querySelector('.community');
    
    if (hero && community) {
        [hero, community].forEach(section => {
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = '2px';
                star.style.height = '2px';
                star.style.backgroundColor = '#fff';
                star.style.position = 'absolute';
                star.style.borderRadius = '50%';
                star.style.top = Math.random() * 100 + '%';
                star.style.left = Math.random() * 100 + '%';
                star.style.opacity = Math.random() * 0.8;
                
                section.appendChild(star);
                
                // Animate star twinkling
                gsap.to(star, {
                    opacity: 0.1,
                    duration: 0.5 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random() * 3
                });
            }
        });
    }
}

// Loading animation
window.addEventListener('load', function() {
    // Add class to body to indicate loaded state
    document.body.classList.add('loaded');
    
    // Other load animations could be triggered here
}); 