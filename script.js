
const header = document.getElementById('main-header');
const heroProfileImg = document.getElementById('hero-profile-img');
const title = document.getElementById('hero-title');
const subtitle = document.getElementById('hero-subtitle');

let scrolled = false;

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;

  if (scrollY > 10 && !scrolled) {
    header.classList.add('scrolled');
    heroProfileImg.classList.add('scrolled');
    
    // Animate title out & subtitle in
    title.classList.add('scrolled-title');
    subtitle.classList.add('scrolled-subtitle');

    scrolled = true;
  } 
  else if (scrollY <= 10 && scrolled) {
    header.classList.remove('scrolled');
    heroProfileImg.classList.remove('scrolled');
    
    // Reset animations
    title.classList.remove('scrolled-title');
    subtitle.classList.remove('scrolled-subtitle');

    scrolled = false;
  }
});
