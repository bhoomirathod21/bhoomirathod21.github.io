const header = document.getElementById('main-header');
const heroProfileImg = document.getElementById('hero-profile-img');
let scrolled = false;

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;

  if (scrollY > 10 && !scrolled) {
    header.classList.add('scrolled');
    heroProfileImg.classList.add('scrolled');
    scrolled = true;
  } else if (scrollY <= 10 && scrolled) {
    header.classList.remove('scrolled');
    heroProfileImg.classList.remove('scrolled');
    scrolled = false;
  }

  const title = document.getElementById('hero-title');
  const subtitle = document.getElementById('hero-subtitle');
  if (window.scrollY > 10) {
    title.classList.add('scrolled-title');
    subtitle.classList.add('scrolled-subtitle');
  } else {
    title.classList.remove('scrolled-title');
    subtitle.classList.remove('scrolled-subtitle');
  }
});

// Set timestamp
document.getElementById('timestamp').textContent = new Date().toLocaleString();

// To stop scrolling
document.body.classList.add('stop-scroll');

// To allow scrolling again
document.body.classList.remove('stop-scroll');
