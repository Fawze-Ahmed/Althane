const header = document.getElementById("header");
const scrollTopButton = document.getElementById("scroll-top");
const navmenu = document.getElementById("navmenu");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelectorAll(".navmenu a");

function updateScrolledState() {
  if (window.scrollY > 80) {
    header?.classList.add("scrolled");
    scrollTopButton?.classList.add("active");
  } else {
    header?.classList.remove("scrolled");
    scrollTopButton?.classList.remove("active");
  }
}

window.addEventListener("scroll", updateScrolledState);
window.addEventListener("load", updateScrolledState);

mobileNavToggle?.addEventListener("click", () => {
  navmenu?.classList.toggle("navmenu-active");
  mobileNavToggle.classList.toggle("bi-list");
  mobileNavToggle.classList.toggle("bi-x");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navmenu?.classList.remove("navmenu-active");
    mobileNavToggle?.classList.add("bi-list");
    mobileNavToggle?.classList.remove("bi-x");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
