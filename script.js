const header = document.getElementById('main-header');
    const heroProfileImg = document.getElementById('hero-profile-img');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    let scrolled = false;

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

  gsap.registerPlugin(ScrollTrigger);

let container = document.querySelector(".cards-container");
let cards = container.querySelectorAll(".card");

let scrollDistance = container.scrollWidth - window.innerWidth;

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: () => "+=" + scrollDistance,
    scrub: 1,
    pin: true,
    anticipatePin: 1
  }
});

tl.to(container, { x: -scrollDistance, ease: "none" });

// Animate cards
cards.forEach((card, index) => {
  gsap.fromTo(card, { opacity: 0, y: 100 }, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: index * 0.1,
    scrollTrigger: {
      trigger: card,
      start: "left 80%",
      containerAnimation: tl
    }
  });
});
// End of cards