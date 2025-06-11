// Lightweight Portfolio Script - Optimized for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileNavigation();
    initSmoothScrolling();
    initCustomCursor();
    initTypingAnimation();
    initScrollEffects();
    initImageAnimation();
    initGallerySlider();
    initAboutImageSlider();
    initParticlesNetwork();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
});

// Theme Toggle - Lightweight
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon(currentTheme);
            
            // Update particles theme
            setTimeout(() => {
                updateParticlesTheme();
            }, 100);
            
            // Animation
            this.style.transform = 'scale(0.9) rotate(180deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    }
    
    function updateThemeIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Custom Cursor - Desktop Only (Optimized)
function initCustomCursor() {
    if (window.innerWidth <= 1024) return; // Skip on mobile/tablet
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursor || !cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isMoving = false;
    
    // Throttled mouse movement for better performance
    let lastTime = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastTime < 16) return; // 60fps cap
        lastTime = now;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Direct update for dot (immediate response)
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    // Optimized cursor outline following
    function animateCursor() {
        if (isMoving) {
            cursorX += (mouseX - cursorX) * 0.15; // Faster interpolation
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursorOutline.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px)`;
            
            // Stop animation when close enough
            if (Math.abs(mouseX - cursorX) < 0.1 && Math.abs(mouseY - cursorY) < 0.1) {
                isMoving = false;
            }
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects (optimized)
    const interactiveElements = document.querySelectorAll('a, button, .hero-btn, .social-link, .skill-card, .achievement-card, .certificate-image');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'), { passive: true });
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'), { passive: true });
    });
}

// Typing Animation - Lightweight
function initTypingAnimation() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const texts = [
        'Research Enthusiast',
        'Leather Engineering Student', 
        'Environmental Innovator',
        'Teaching Professional'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        // Navbar background effect
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Back to top button
        if (backToTop) {
            if (scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Image Animation - Simple version
function initImageAnimation() {
    const heroImage = document.getElementById('profileImage');
    const aboutContainer = document.getElementById('aboutImageContainer');
    
    if (!heroImage || !aboutContainer) return;
    
    // Simple image copy to about section
    function copyImageToAbout() {
        if (heroImage.complete && heroImage.naturalHeight !== 0) {
            const existingImg = aboutContainer.querySelector('img');
            if (!existingImg) {
                const imgClone = heroImage.cloneNode(true);
                imgClone.style.width = '100%';
                imgClone.style.height = '100%';
                imgClone.style.objectFit = 'cover';
                imgClone.style.borderRadius = '50%';
                aboutContainer.appendChild(imgClone);
            }
        }
    }
    
    // Copy image when loaded
    if (heroImage.complete) {
        copyImageToAbout();
    } else {
        heroImage.addEventListener('load', copyImageToAbout);
    }
    
    // Observe about section for animation trigger
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    copyImageToAbout();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(aboutContainer);
    }
}

// Gallery Slider Functionality
function initGallerySlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.slide');
    
    if (!sliderTrack || !slides.length) return;
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        const translateX = -currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        resetAutoPlay();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoPlay();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let moveX = 0;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    sliderTrack.addEventListener('touchmove', (e) => {
        moveX = e.touches[0].clientX;
    });
    
    sliderTrack.addEventListener('touchend', () => {
        const diffX = startX - moveX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    const slider = document.querySelector('.gallery-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        slider.addEventListener('mouseleave', startAutoPlay);
    }
}

// About Section Image Slider
function initAboutImageSlider() {
    const aboutImages = document.querySelectorAll('.about-profile-img');
    const aboutDots = document.querySelectorAll('.about-dot');
    
    if (!aboutImages.length || !aboutDots.length) return;
    
    let currentAboutImage = 0;
    let aboutAutoPlayInterval;
    
    function updateAboutImage() {
        aboutImages.forEach((img, index) => {
            img.classList.toggle('active', index === currentAboutImage);
        });
        
        aboutDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentAboutImage);
        });
    }
    
    function goToAboutImage(imageIndex) {
        currentAboutImage = imageIndex;
        updateAboutImage();
        resetAboutAutoPlay();
    }
    
    function nextAboutImage() {
        currentAboutImage = (currentAboutImage + 1) % aboutImages.length;
        updateAboutImage();
    }
    
    function startAboutAutoPlay() {
        aboutAutoPlayInterval = setInterval(nextAboutImage, 3000);
    }
    
    function resetAboutAutoPlay() {
        clearInterval(aboutAutoPlayInterval);
        startAboutAutoPlay();
    }
    
    // Add click handlers to dots
    aboutDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToAboutImage(index));
    });
    
    // Start auto-play
    startAboutAutoPlay();
    
    // Pause on hover
    const aboutSlider = document.querySelector('.about-images-slider');
    if (aboutSlider) {
        aboutSlider.addEventListener('mouseenter', () => clearInterval(aboutAutoPlayInterval));
        aboutSlider.addEventListener('mouseleave', startAboutAutoPlay);
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize listener with debouncing
window.addEventListener('resize', debounce(() => {
    // Reinitialize cursor on resize if needed
    if (window.innerWidth > 1024) {
        initCustomCursor();
    }
}, 250)); 

// Certificate Modal Functions
function openCertificateModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertificateImage');
    
    modalImage.src = imageSrc;
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Certificate Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    const closeBtn = document.querySelector('.certificate-modal-close');
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCertificateModal);
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
});

// Initialize certificate modal functionality
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;

// Particles.js Network Animation Configuration
function initParticlesNetwork() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 120,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#6c5ce7", "#74b9ff", "#00b894", "#fd79a8", "#fdcb6e"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.3,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 180,
                    "color": "#6c5ce7",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": ["grab", "bubble"]
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 100,
                        "size": 8,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Update particles color based on theme
        updateParticlesTheme();
    }
}

// Update particles colors based on current theme
function updateParticlesTheme() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const particles = pJSDom[0].pJS;
        
        if (currentTheme === 'dark') {
            particles.particles.color.value = ["#6c5ce7", "#74b9ff", "#00b894", "#fd79a8", "#fdcb6e"];
            particles.particles.line_linked.color = "#6c5ce7";
        } else {
            particles.particles.color.value = ["#5a4fcf", "#0984e3", "#00b894", "#e84393", "#f39c12"];
            particles.particles.line_linked.color = "#5a4fcf";
        }
        
        // Refresh particles
        particles.fn.particlesRefresh();
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the DOM to be fully ready
    setTimeout(() => {
        initParticlesNetwork();
    }, 100);
});

// Update particles when theme changes
const originalUpdateThemeIcon = window.updateThemeIcon;
if (typeof updateThemeIcon === 'function') {
    window.updateThemeIcon = function(theme) {
        originalUpdateThemeIcon(theme);
        setTimeout(() => {
            updateParticlesTheme();
        }, 100);
    };
} 