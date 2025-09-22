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

// hero//

const heroContent = document.querySelector(".hero-content");
const heroInner1 = document.querySelector(".hero-content-inner");
const heroInner2 = document.querySelector(".hero-content-inner2");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    heroContent.classList.add("scrolled");
    heroInner1.classList.add("scrolled");
    heroInner2.classList.add("scrolled");
  } else {
    heroContent.classList.remove("scrolled");
    heroInner1.classList.remove("scrolled");
    heroInner2.classList.remove("scrolled");
  }
});
// ========================================//



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


    
(function(){
  const GAP = 48; // gap in px
  const hero = document.querySelector('.hero-content');
  if (!hero) return console.warn('No .hero-content found on page.');

  const items = Array.from(hero.children);
  let cache = [];

  function measure() {
    const heroRect = hero.getBoundingClientRect();
    const heights = items.map(el => el.getBoundingClientRect().height);
    const totalHeight = heights.reduce((a,b) => a + b, 0) + (items.length - 1) * GAP;
    const startY = (heroRect.height - totalHeight) / 2;

    let cum = 0;
    cache = items.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const originalTop = rect.top - heroRect.top;
      const computed = window.getComputedStyle(el).transform;
      const computedTransform = (computed && computed !== 'none') ? computed : '';
      const targetTop = startY + cum;
      cum += heights[i] + GAP;
      return {
        el,
        originalTop,
        computedTransform,
        targetTop,
        delta: targetTop - originalTop
      };
    });
  }

  function update() {
    const heroRect = hero.getBoundingClientRect();
    const start = window.innerHeight * 0.9;
    const end = 0;
    let progress = (start - heroRect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    cache.forEach(c => {
      const translateY = c.delta * progress;
      c.el.style.transform = (c.computedTransform ? c.computedTransform + ' ' : '') + `translateY(${translateY}px)`;
      c.el.style.willChange = 'transform';
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { measure(); update(); });
  window.addEventListener('load', () => { measure(); update(); });
})();
