// ===== MAIN APPLICATION =====
const Portfolio = {
  // DOM Elements
  elements: {
    header: null,
    heroProfileImg: null,
    scrollTrigger: null,
    title: null,
    subtitle: null,
  },

  // State
  state: {
    scrolled: false,
    isTouch: false,
  },

  // Initialize the application
  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.setupInitialState();
    this.detectTouchDevice();
    console.log('Portfolio initialized successfully');
  },

  // Cache DOM elements for performance
  cacheDOMElements() {
    this.elements.header = document.getElementById('main-header');
    this.elements.heroProfileImg = document.getElementById('hero-profile-img');
    this.elements.scrollTrigger = document.getElementById('scroll-trigger');
    this.elements.title = document.getElementById('hero-title');
    this.elements.subtitle = document.getElementById('hero-subtitle');
  },

  // Bind all event listeners
  bindEvents() {
    // Page load event
    window.addEventListener('load', () => this.handlePageLoad());

    // Scroll event for animations
    this.elements.scrollTrigger.addEventListener('scroll', (e) => this.handleScroll(e));

    // Prevent main page scrolling
    this.preventMainPageScroll();

    // Handle resize events
    window.addEventListener('resize', () => this.handleResize());

    // Handle navigation clicks
    this.bindNavigationEvents();
  },

  // Setup initial state on page load/refresh
  setupInitialState() {
    // Force initial state - menus centered, image in hero center
    this.elements.header.classList.remove('scrolled');
    this.elements.heroProfileImg.classList.remove('scrolled');
    this.elements.title.classList.remove('scrolled-title');
    this.elements.subtitle.classList.remove('scrolled-subtitle');
    this.state.scrolled = false;
    this.elements.scrollTrigger.scrollTop = 0;
  },

  // Handle page load event
  handlePageLoad() {
    this.setupInitialState();
    this.animatePageLoad();
  },

  // Handle scroll events in trigger area
  handleScroll(event) {
    const scrollY = event.target.scrollTop;
    const threshold = 50;

    if (scrollY > threshold && !this.state.scrolled) {
      this.animateToScrolledState();
    } else if (scrollY <= threshold && this.state.scrolled) {
      this.animateToOriginalState();
    }
  },

  // Animate to scrolled state
  animateToScrolledState() {
    this.elements.header.classList.add('scrolled');
    this.elements.heroProfileImg.classList.add('scrolled');
    this.elements.title.classList.add('scrolled-title');
    this.elements.subtitle.classList.add('scrolled-subtitle');
    this.state.scrolled = true;
    
    // Add subtle haptic feedback on supported devices
    if (navigator.vibrate && this.state.isTouch) {
      navigator.vibrate(10);
    }
  },

  // Animate back to original state
  animateToOriginalState() {
    this.elements.header.classList.remove('scrolled');
    this.elements.heroProfileImg.classList.remove('scrolled');
    this.elements.title.classList.remove('scrolled-title');
    this.elements.subtitle.classList.remove('scrolled-subtitle');
    this.state.scrolled = false;
  },

  // Prevent main page scrolling
  preventMainPageScroll() {
    // Prevent wheel scrolling outside trigger area
    document.addEventListener('wheel', (e) => {
      if (!this.elements.scrollTrigger.contains(e.target)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent touch scrolling outside trigger area
    document.addEventListener('touchmove', (e) => {
      if (!this.elements.scrollTrigger.contains(e.target)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent keyboard scrolling on main page
    document.addEventListener('keydown', (e) => {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (scrollKeys.indexOf(e.keyCode) > -1) {
        if (!this.elements.scrollTrigger.contains(document.activeElement)) {
          e.preventDefault();
        }
      }
    }, false);

    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  },

  // Detect touch device
  detectTouchDevice() {
    this.state.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (this.state.isTouch) {
      document.body.classList.add('touch-device');
    }
  },

  // Handle window resize
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.adjustLayoutForScreenSize();
    }, 250);
  },

  // Adjust layout for different screen sizes
  adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 480) {
      // Extra small screens
      this.elements.title.style.fontSize = '36px';
    } else if (screenWidth <= 600) {
      // Small screens
      this.elements.title.style.fontSize = '48px';
    } else if (screenWidth <= 800) {
      // Medium screens
      this.elements.title.style.fontSize = '60px';
    } else {
      // Large screens
      this.elements.title.style.fontSize = '100px';
    }
  },

  // Bind navigation events
  bindNavigationEvents() {
    const navLinks = document.querySelectorAll('#main-header nav ul li a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Add visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
        
        // Handle navigation
        this.handleNavigation(href);
      });
    }); // Closing brace added here
  },

  // Handle navigation logic
  handleNavigation(href) {
    // Example logic: scroll to the section or load a new page
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href; // Fallback to normal navigation
    }
  },
};

// Initialize the application
Portfolio.init();
