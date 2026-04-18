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
const GOOGLE_TRANSLATE_COOKIE = "googtrans";

function getSavedLanguage() {
  return localStorage.getItem("site-language") || "ar";
}

function getTranslateCookieValue() {
  const match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function setTranslateCookie(lang) {
  const cookieValue = lang === "en" ? "/ar/en" : "/ar/ar";
  const expires = "Fri, 31 Dec 9999 23:59:59 GMT";
  const hostname = window.location.hostname;

  document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=${cookieValue}; expires=${expires}; path=/`;

  if (hostname && hostname.includes(".")) {
    document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=${cookieValue}; expires=${expires}; path=/; domain=.${hostname}`;
  }
}

function syncLanguageState(lang) {
  localStorage.setItem("site-language", lang);
  document.documentElement.lang = lang;
  updateLanguageButtons(lang);
  setTranslateCookie(lang);
}

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

function hideGoogleTranslateArtifacts() {
  document.body.style.top = "0px";
  document.documentElement.style.top = "0px";
  document.body.style.marginTop = "0px";
  document.documentElement.style.marginTop = "0px";

  const selectors = [
    ".goog-te-banner-frame",
    ".skiptranslate",
    "iframe.skiptranslate",
    ".goog-te-balloon-frame",
    ".goog-tooltip",
    ".VIpgJd-ZVi9od-ORHb-OEVmcd",
    ".VIpgJd-ZVi9od-l4eHX-hSRGPd",
    ".VIpgJd-ZVi9od-aZ2wEe-wOHMyf",
    ".VIpgJd-ZVi9od-ORHb",
    "[class*='VIpgJd-ZVi9od']",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.style.display = "none";
      node.style.visibility = "hidden";
      node.style.opacity = "0";
      node.style.maxHeight = "0";
      node.setAttribute("aria-hidden", "true");
    });
  });
}

function initTranslateUiCleanup() {
  hideGoogleTranslateArtifacts();

  const observer = new MutationObserver(() => {
    hideGoogleTranslateArtifacts();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });
}

function setLanguage(lang) {
  syncLanguageState(lang);
  document.body.classList.toggle("translated-ltr", lang === "en");

  if (lang === "ar") {
    hideGoogleTranslateArtifacts();
    window.location.reload();
    return;
  }

  if (!applyGoogleTranslate(lang)) {
    window.location.reload();
    return;
  }

  window.setTimeout(() => {
    hideGoogleTranslateArtifacts();
    if (!document.body.classList.contains("translated-ltr")) {
      window.location.reload();
    }
  }, 500);
}

function initLanguageSwitcher() {
  const savedLang = getSavedLanguage();
  syncLanguageState(savedLang);

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.langTarget);
    });
  });

  window.setTimeout(() => {
    if (savedLang === "en" && !document.body.classList.contains("translated-ltr")) {
      applyGoogleTranslate(savedLang);
      hideGoogleTranslateArtifacts();
    }
  }, 1000);
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
  initTranslateUiCleanup();
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

  const savedLang = getSavedLanguage();
  if (savedLang === "en") {
    window.setTimeout(() => {
      applyGoogleTranslate("en");
      document.body.classList.add("translated-ltr");
      hideGoogleTranslateArtifacts();
    }, 300);
  }
};
