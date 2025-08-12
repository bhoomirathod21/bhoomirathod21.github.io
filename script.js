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
    title.style.opacity = '0';
    subtitle.style.opacity = '1';
    subtitle.style.pointerEvents = 'auto';
  } else {
    title.style.opacity = '1';
    subtitle.style.opacity = '0';
    subtitle.style.pointerEvents = 'none';
  }
});

// Set timestamp
document.getElementById('timestamp').textContent = new Date().toLocaleString();
