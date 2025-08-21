const header = document.getElementById('main-header');
const heroProfileImg = document.getElementById('hero-profile-img');
let scrolled = false;

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

// Set timestamp on page load
document.getElementById('timestamp').textContent = new Date().toLocaleString();