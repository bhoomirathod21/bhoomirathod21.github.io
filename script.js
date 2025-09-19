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
