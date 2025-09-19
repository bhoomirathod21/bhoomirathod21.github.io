const header = document.getElementById('main-header');
const heroProfileImg = document.getElementById('hero-profile-img');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let scrolled = false;

// Scroll effect for header & hero
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (!scrolled) {
            header.classList.add('scrolled');
            heroProfileImg.classList.add('scrolled');
            scrolled = true;
        }
    } else {
        if (scrolled) {
            header.classList.remove('scrolled');
            heroProfileImg.classList.remove('scrolled');
            scrolled = false;
        }
    }
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // animate hamburger
    mobileMenu.classList.toggle('active'); // show/hide mobile menu
});

// Optional: close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});
// Optional: close mobile menu when clicking outside





    // Scroll functionality
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      
      if(scrollY > 10 && !scrolled) {
        header.classList.add('scrolled');
        heroProfileImg.classList.add('scrolled');
        scrolled = true;
      } else if(scrollY <= 10 && scrolled) {
        header.classList.remove('scrolled');
        heroProfileImg.classList.remove('scrolled');
        scrolled = false;
      }
    });

    // Hamburger menu functionality
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu function
    function closeMobileMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });

    // Close mobile menu on window resize if open
    window.addEventListener('resize', function() {
      if (window.innerWidth > 767) {
        closeMobileMenu();
      }
    });

  //cards
let hscrollTrigger;
let refreshTimeout;

function safeRefresh(delay = 200) {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    if (window.innerWidth > 991) ScrollTrigger.refresh();
  }, delay);
}

function initHorizontalScroll() {
  let container = document.querySelector(".technology-heading-block");
  let totalWidth = document.querySelector(".slides-track").scrollWidth;
  let moveDistance = totalWidth - container.offsetWidth;

  if (hscrollTrigger) hscrollTrigger.kill();

  hscrollTrigger = gsap.to(".slides-track", {
    x: -moveDistance,
    ease: "none",
    scrollTrigger: {
      trigger: ".hscroll",
      start: "top 15%",
      end: "+=" + moveDistance,
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
    }
  });
}

window.addEventListener("load", initHorizontalScroll);
window.addEventListener("resize", () => safeRefresh(100));


// ------------

// 
// ========================================
// GSAP INITIALIZATION AND SETUP
// ========================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

// ========================================
// MAIN ANIMATION INITIALIZATION
// ========================================

function initializeAnimations() {
    // Initialize all animation components
    animateSectionTitle();
    animateScrollIndicator();
    setupHorizontalScroll();
    animateCards();
    setupCardInteractions();
    setupResponsiveHandling();
    setupSmoothScrolling();
}

// ========================================
// SECTION TITLE ANIMATION
// ========================================

function animateSectionTitle() {
    gsap.to(".section-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".hscroll",
            start: "top 80%",
            once: true
        }
    });
}

// ========================================
// SCROLL INDICATOR ANIMATION
// ========================================

function animateScrollIndicator() {
    gsap.to(".scroll-indicator", {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".hscroll",
            start: "top 80%",
            once: true
        }
    });
}

// ========================================
// HORIZONTAL SCROLL SETUP
// ========================================

function setupHorizontalScroll() {
    // Get required elements
    const slidesTrack = document.querySelector('.slides-track');
    const cards = document.querySelectorAll('.card');
    
    if (!slidesTrack || cards.length === 0) {
        console.warn('Slides track or cards not found');
        return;
    }

    // Calculate total scroll width
    const scrollWidth = slidesTrack.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    const horizontalScroll = gsap.to(".slides-track", {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
            trigger: ".hscroll",
            pin: true,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
            onUpdate: (self) => {
                updateProgressBar(self.progress);
            },
            onRefresh: () => {
                // Recalculate scroll width on refresh
                const newScrollWidth = slidesTrack.scrollWidth - window.innerWidth;
                ScrollTrigger.getById(horizontalScroll.scrollTrigger.id).vars.end = `+=${newScrollWidth}`;
            }
        }
    });

    // Setup parallax effects for cards
    setupCardParallax(cards, horizontalScroll);
}

// ========================================
// PROGRESS BAR UPDATE
// ========================================

function updateProgressBar(progress) {
    gsap.to(".progress-bar", {
        scaleX: progress,
        duration: 0.1,
        ease: "none"
    });
}

// ========================================
// CARD ANIMATIONS
// ========================================

function animateCards() {
    // Stagger animate cards entrance
    gsap.to(".card", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".slides-track",
            start: "top 80%",
            once: true
        }
    });
}

// ========================================
// CARD PARALLAX EFFECTS
// ========================================

function setupCardParallax(cards, horizontalScroll) {
    cards.forEach((card, index) => {
        const cardImage = card.querySelector('.card-image');
        
        if (cardImage) {
            gsap.to(cardImage, {
                rotateY: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "left right",
                    end: "right left",
                    scrub: 1,
                    horizontal: true,
                    containerAnimation: horizontalScroll
                }
            });
        }
    });
}

// ========================================
// CARD INTERACTION HANDLERS
// ========================================

function setupCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card) => {
        setupCardHoverEffects(card);
        setupButtonClickEffects(card);
    });
}

// ========================================
// CARD HOVER EFFECTS
// ========================================

function setupCardHoverEffects(card) {
    const cardImage = card.querySelector('.card-image');
    
    card.addEventListener('mouseenter', () => {
        // Card hover animation
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Card image hover animation
        if (cardImage) {
            gsap.to(cardImage, {
                scale: 1.2,
                rotate: 10,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    card.addEventListener('mouseleave', () => {
        // Reset card animation
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Reset card image animation
        if (cardImage) {
            gsap.to(cardImage, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

// ========================================
// BUTTON CLICK EFFECTS
// ========================================

function setupButtonClickEffects(card) {
    const button = card.querySelector('.btn');
    
    if (!button) return;
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Button click animation
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });

        // Create ripple effect
        createRippleEffect(button, e);
    });
}

// ========================================
// RIPPLE EFFECT CREATION
// ========================================

function createRippleEffect(button, event) {
    // Create ripple element
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    // Position ripple at click location
    const rect = button.getBoundingClientRect();
    ripple.style.left = (event.clientX - rect.left - 50) + 'px';
    ripple.style.top = (event.clientY - rect.top - 50) + 'px';
    
    // Add ripple to button
    button.appendChild(ripple);
    
    // Animate ripple
    gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }
    });
}

// ========================================
// RESPONSIVE HANDLING
// ========================================

function setupResponsiveHandling() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
}

// ========================================
// SMOOTH SCROLLING SETUP
// ========================================

function setupSmoothScrolling() {
    let isScrolling = false;
    
    window.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 100);
        }
    }, { passive: true });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// ERROR HANDLING
// ========================================

// Global error handler for animations
window.addEventListener('error', (e) => {
    console.error('Animation error:', e.error);
});

// Handle GSAP-specific errors
gsap.config({
    onError: (error) => {
        console.error('GSAP Error:', error);
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Optional: Add performance monitoring
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('animations-start');
    
    document.addEventListener('DOMContentLoaded', () => {
        performance.mark('animations-end');
        performance.measure('animations-duration', 'animations-start', 'animations-end');
    });
}