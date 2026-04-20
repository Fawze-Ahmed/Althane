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
const articleModal = document.getElementById("article-modal");
const articleModalTag = document.getElementById("article-modal-tag");
const articleModalTitle = document.getElementById("article-modal-title");
const articleModalBody = document.getElementById("article-modal-body");
const articleModalClose = document.getElementById("article-modal-close");
const sponsorMarquee = document.querySelector(".sponsor-marquee");
const sponsorMarqueeInner = document.querySelector(".sponsor-marquee-inner");
const statNumbers = document.querySelectorAll(".stat-box strong");
const GOOGLE_TRANSLATE_COOKIE = "googtrans";
const socialLinks = [
  { icon: "bi-instagram", label: "Instagram", href: "#" },
  { icon: "bi-linkedin", label: "LinkedIn", href: "#" },
  { icon: "bi-facebook", label: "Facebook", href: "#" },
  { icon: "bi-twitter-x", label: "X", href: "#" },
  { icon: "bi-tiktok", label: "TikTok", href: "#" },
  { icon: "bi-envelope", label: "Email", href: "mailto:blinkagency4u@gmail.com" },
];

function getSavedLanguage() {
  return localStorage.getItem("site-language") || "ar";
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
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
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

function initContactLinkDirection() {
  document.querySelectorAll("a[href^='tel:'], a[href^='mailto:'], a[href*='wa.me']").forEach((link) => {
    link.setAttribute("dir", "ltr");
    link.style.direction = "ltr";
    link.style.unicodeBidi = "isolate";
  });
}

function initArticleModal() {
  if (!articleCards.length || !articleModal || !articleModalTitle || !articleModalBody || !articleModalTag) return;

  const openModal = (card) => {
    articleModalTag.textContent = card.querySelector(".article-tag")?.textContent?.trim() || "";
    articleModalTitle.textContent = card.querySelector("h3")?.textContent?.trim() || "";
    articleModalBody.textContent = card.querySelector("p")?.textContent?.trim() || "";
    articleModal.classList.add("open");
    articleModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    articleModal.classList.remove("open");
    articleModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  articleCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");

    card.addEventListener("click", () => {
      openModal(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  articleModalClose?.addEventListener("click", closeModal);

  articleModal.addEventListener("click", (event) => {
    if (event.target === articleModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && articleModal.classList.contains("open")) {
      closeModal();
    }
  });
}

function initSocialHub() {
  if (!document.body) return;

  const hub = document.createElement("div");
  hub.className = "social-floating";
  hub.innerHTML = `
    <button id="social-toggle" class="social-toggle" type="button" aria-label="Social links">
      <i class="bi bi-share-fill"></i>
    </button>
    <div id="social-panel" class="social-panel">
      <span>روابط التواصل</span>
      <div class="social-panel-grid">
        ${socialLinks
          .map(
            (item) =>
              `<a href="${item.href}" aria-label="${item.label}"${item.href.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener"'}><i class="bi ${item.icon}"></i></a>`,
          )
          .join("")}
      </div>
    </div>
  `;

  document.body.appendChild(hub);

  const socialToggle = hub.querySelector("#social-toggle");
  const socialPanel = hub.querySelector("#social-panel");

  socialToggle?.addEventListener("click", () => {
    socialPanel?.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!socialPanel || !socialToggle) return;
    if (socialPanel.contains(event.target) || socialToggle.contains(event.target)) return;
    socialPanel.classList.remove("open");
  });
}

function initPointerEffects() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  let rafId = null;

  document.addEventListener("mousemove", (event) => {
    if (rafId) return;

    rafId = window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      rafId = null;
    });
  });
}

function initCountUp() {
  if (!statNumbers.length || !("IntersectionObserver" in window)) return;

  const parseTarget = (text) => {
    const numeric = Number.parseInt(text.replace(/[^\d]/g, ""), 10);
    return Number.isNaN(numeric) ? null : numeric;
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const finalText = element.textContent.trim();
        const target = parseTarget(finalText);
        if (target === null) return;

        const suffix = finalText.replace(/[\d]/g, "");
        const start = performance.now();
        const duration = 1400;

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;

          if (progress < 1) {
            window.requestAnimationFrame(tick);
          } else {
            element.textContent = finalText;
          }
        };

        window.requestAnimationFrame(tick);
        counterObserver.unobserve(element);
      });
    },
    { threshold: 0.6 },
  );

  statNumbers.forEach((element) => {
    if (parseTarget(element.textContent.trim()) !== null) {
      counterObserver.observe(element);
    }
  });
}

function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".btn-main, .btn-outline-light, .btn-outline-dark, .cta-btn, .social-toggle, .whatsapp-toggle").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function initHeroParallax() {
  const heroMedia = document.querySelector(".hero-media img");
  if (!heroMedia || window.matchMedia("(max-width: 991px), (pointer: coarse)").matches) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      const offset = Math.min(window.scrollY * 0.08, 36);
      heroMedia.style.transform = `translateY(${offset}px) scale(1.04)`;
      ticking = false;
    });
  });
}

function initSponsorMarquee() {
  if (!sponsorMarquee || !sponsorMarqueeInner) return;

  const tracks = sponsorMarqueeInner.querySelectorAll(".sponsor-track");
  if (tracks.length < 2) return;

  let frameId = null;
  let offset = 0;
  let lastTime = 0;
  let paused = false;
  let trackWidth = tracks[0].getBoundingClientRect().width;

  const updateSizes = () => {
    trackWidth = tracks[0].getBoundingClientRect().width;
    if (offset >= trackWidth) {
      offset = 0;
    }
    sponsorMarqueeInner.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    if (!paused) {
      offset += delta * 0.04;
      if (offset >= trackWidth) {
        offset -= trackWidth;
      }
      sponsorMarqueeInner.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }

    frameId = window.requestAnimationFrame(animate);
  };

  sponsorMarquee.addEventListener("mouseenter", () => {
    paused = true;
  });

  sponsorMarquee.addEventListener("mouseleave", () => {
    paused = false;
  });

  window.addEventListener("resize", updateSizes);
  updateSizes();
  frameId = window.requestAnimationFrame(animate);

  document.addEventListener("visibilitychange", () => {
    paused = document.hidden;
  });
}

function initRevealMotion() {
  const groups = [
    ".portfolio-grid .reveal",
    ".portfolio-feature-grid .reveal",
    ".row .reveal",
    ".section-title.reveal",
    ".logo-band-inner.reveal",
    ".container > .reveal",
  ];

  groups.forEach((selector) => {
    const items = document.querySelectorAll(selector);
    if (!items.length) return;

    items.forEach((item, index) => {
      if (!item.classList.contains("reveal-left") && !item.classList.contains("reveal-right")) {
        item.classList.add(index % 2 === 0 ? "reveal-right" : "reveal-left");
      }

      item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 520)}ms`);
    });
  });
}

window.addEventListener("scroll", updateScrolledState);
window.addEventListener("load", () => {
  updateScrolledState();
  initRevealMotion();
  setActiveNav();
  initLanguageSwitcher();
  initBlogFilters();
  initTranslateUiCleanup();
  initContactLinkDirection();
  initArticleModal();
  initSocialHub();
  initPointerEffects();
  initCountUp();
  initMagneticButtons();
  initHeroParallax();
  initSponsorMarquee();
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

document.querySelectorAll(".service-brief-card, .article-card, .detail-card, .value-card, .contact-card, .portfolio-card").forEach((card, index) => {
  card.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
});

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
