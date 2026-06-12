const header = document.querySelector(".site-header");
const year = document.querySelector("#year");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

year.textContent = new Date().getFullYear();
updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
