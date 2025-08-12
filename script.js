const header = document.getElementById("main-header");
const headerLogo = document.getElementById("header-logo");
const heroImg = document.getElementById("hero-profile-img");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    if (!header.classList.contains("scrolled")) {
      header.classList.add("scrolled");

      // Move profile image into header logo
      const logoImg = heroImg.cloneNode(true);
      logoImg.style.height = "40px";
      logoImg.style.width = "40px";
      logoImg.style.objectFit = "cover";
      headerLogo.innerHTML = "";
      headerLogo.appendChild(logoImg);
    }
  } else {
    header.classList.remove("scrolled");
    headerLogo.innerHTML = ""; // Remove logo
  }
});
