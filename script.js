const header = document.getElementById("header");
const scrollTopButton = document.getElementById("scroll-top");
const navmenu = document.getElementById("navmenu");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelectorAll(".navmenu a");
const pageName = document.body.dataset.page;
const whatsappToggle = document.getElementById("whatsapp-toggle");
const whatsappPanel = document.getElementById("whatsapp-panel");
const langButtons = document.querySelectorAll(".lang-btn");
const filterButtons = document.querySelectorAll(".filter-chip");
const articleCards = document.querySelectorAll(".article-card");

function updateScrolledState() {
  if (window.scrollY > 60) {
    header?.classList.add("scrolled");
    scrollTopButton?.classList.add("active");
  } else {
    header?.classList.remove("scrolled");
    scrollTopButton?.classList.remove("active");
  }
}

function setActiveNav() {
  navLinks.forEach((link) => {
    if (link.dataset.nav === pageName) {
      link.classList.add("active");
    }
  });
}

function updateLanguageButtons(lang) {
  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.langTarget === lang);
  });
}

function applyGoogleTranslate(lang) {
  const combo = document.querySelector(".goog-te-combo");
  if (!combo) return false;
  if (combo.value === lang) return true;
  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
  return true;
}

function setLanguage(lang) {
  localStorage.setItem("site-language", lang);
  document.documentElement.lang = lang;
  updateLanguageButtons(lang);

  if (!applyGoogleTranslate(lang)) {
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      if (applyGoogleTranslate(lang) || attempts > 20) {
        window.clearInterval(interval);
      }
    }, 500);
  }
}

function initLanguageSwitcher() {
  const savedLang = localStorage.getItem("site-language") || "ar";
  updateLanguageButtons(savedLang);

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.langTarget);
    });
  });

  window.setTimeout(() => setLanguage(savedLang), 1000);
}

function initBlogFilters() {
  if (!filterButtons.length || !articleCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((chip) => chip.classList.remove("active"));
      button.classList.add("active");

      articleCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

window.addEventListener("scroll", updateScrolledState);
window.addEventListener("load", () => {
  updateScrolledState();
  setActiveNav();
  initLanguageSwitcher();
  initBlogFilters();
});

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

whatsappToggle?.addEventListener("click", () => {
  whatsappPanel?.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!whatsappPanel || !whatsappToggle) return;
  if (whatsappPanel.contains(event.target) || whatsappToggle.contains(event.target)) return;
  whatsappPanel.classList.remove("open");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}

window.googleTranslateElementInit = function googleTranslateElementInit() {
  if (!window.google || !google.translate) return;

  new google.translate.TranslateElement(
    {
      pageLanguage: "ar",
      includedLanguages: "ar,en",
      autoDisplay: false,
    },
    "google_translate_element",
  );
};
