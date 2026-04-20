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
const weatherWidget = document.getElementById("weather-widget");
const currencyWidget = document.getElementById("currency-widget");
const cryptoWidget = document.getElementById("crypto-widget");
const techFeedGrid = document.getElementById("tech-feed-grid");
const techFeedStatus = document.getElementById("tech-feed-status");
const GOOGLE_TRANSLATE_COOKIE = "googtrans";
const socialLinks = [
  { icon: "bi-instagram", label: "Instagram", href: "https://www.instagram.com/blinkdigital4u/" },
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

function removeDirectPhoneContacts() {
  document.querySelectorAll(".whatsapp-floating, .whatsapp-list").forEach((node) => {
    node.remove();
  });

  document.querySelectorAll(".contact-card").forEach((card) => {
    if (card.querySelector("a[href^='tel:'], a[href*='wa.me']")) {
      card.remove();
    }
  });

  document.querySelectorAll(".footer-contact p, .contact-box p").forEach((block) => {
    if (block.querySelector("a[href^='tel:'], a[href*='wa.me']")) {
      block.remove();
    }
  });

  document.querySelectorAll(".whatsapp-panel").forEach((panel) => {
    panel.remove();
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

function formatDateArabic(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function renderInsightError(element, title, message) {
  if (!element) return;
  element.innerHTML = `
    <div class="insight-card-head">
      <span class="insight-badge">${title}</span>
      <h3>تعذر تحميل البيانات الآن</h3>
    </div>
    <p class="insight-error">${message}</p>
  `;
}

function weatherCodeToArabic(code) {
  const labels = {
    0: "سماء صافية",
    1: "صحو غالبًا",
    2: "غائم جزئيًا",
    3: "غائم",
    45: "ضباب",
    48: "ضباب كثيف",
    51: "رذاذ خفيف",
    53: "رذاذ متوسط",
    55: "رذاذ كثيف",
    61: "أمطار خفيفة",
    63: "أمطار متوسطة",
    65: "أمطار غزيرة",
    71: "ثلوج خفيفة",
    80: "زخات خفيفة",
    81: "زخات متوسطة",
    82: "زخات قوية",
    95: "عاصفة رعدية",
  };

  return labels[code] || "حالة جوية مستقرة";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function initWeatherWidget() {
  if (!weatherWidget) return;

  try {
    const data = await fetchJson(
      "https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto",
    );

    const current = data.current || {};
    const daily = data.daily || {};
    const todayMax = daily.temperature_2m_max?.[0];
    const todayMin = daily.temperature_2m_min?.[0];

    weatherWidget.innerHTML = `
      <div class="insight-card-head">
        <span class="insight-badge">الطقس</span>
        <h3>نشرة الطقس في دبي</h3>
      </div>
      <div class="insight-metric">${Math.round(current.temperature_2m ?? 0)}°</div>
      <p class="insight-summary">${weatherCodeToArabic(current.weather_code)} مع إحساس فعلي يقارب ${Math.round(current.apparent_temperature ?? 0)}°.</p>
      <ul class="insight-list">
        <li><span>العظمى اليوم</span><strong>${Math.round(todayMax ?? 0)}°</strong></li>
        <li><span>الصغرى اليوم</span><strong>${Math.round(todayMin ?? 0)}°</strong></li>
        <li><span>سرعة الرياح</span><strong>${Math.round(current.wind_speed_10m ?? 0)} كم/س</strong></li>
      </ul>
      <p class="insight-footnote">المصدر: Open-Meteo</p>
    `;
  } catch (error) {
    renderInsightError(weatherWidget, "الطقس", "تعذر جلب حالة الطقس الآن. حاول تحديث الصفحة بعد قليل.");
  }
}

async function initCurrencyWidget() {
  if (!currencyWidget) return;

  try {
    const data = await fetchJson("https://api.frankfurter.dev/v1/latest?base=USD&symbols=AED,EUR,SAR,EGP");
    const rates = data.rates || {};

    currencyWidget.innerHTML = `
      <div class="insight-card-head">
        <span class="insight-badge">العملات</span>
        <h3>سعر صرف الدولار الآن</h3>
      </div>
      <p class="insight-summary">عرض سريع لأسعار 1 دولار أمريكي مقابل أهم العملات المستخدمة في المنطقة.</p>
      <ul class="insight-list">
        <li><span>درهم إماراتي</span><strong>${rates.AED?.toFixed(2) ?? "--"} AED</strong></li>
        <li><span>ريال سعودي</span><strong>${rates.SAR?.toFixed(2) ?? "--"} SAR</strong></li>
        <li><span>جنيه مصري</span><strong>${rates.EGP?.toFixed(2) ?? "--"} EGP</strong></li>
        <li><span>يورو</span><strong>${rates.EUR?.toFixed(2) ?? "--"} EUR</strong></li>
      </ul>
      <p class="insight-footnote">آخر تحديث: ${formatDateArabic(data.date)} | المصدر: Frankfurter</p>
    `;
  } catch (error) {
    renderInsightError(currencyWidget, "العملات", "تعذر تحميل أسعار العملات الآن. حاول مرة أخرى لاحقًا.");
  }
}

async function initCryptoWidget() {
  if (!cryptoWidget) return;

  try {
    const [bitcoin, ethereum, solana] = await Promise.all([
      fetchJson("https://api.coinpaprika.com/v1/tickers/btc-bitcoin"),
      fetchJson("https://api.coinpaprika.com/v1/tickers/eth-ethereum"),
      fetchJson("https://api.coinpaprika.com/v1/tickers/sol-solana"),
    ]);

    const items = [
      { label: "Bitcoin", symbol: "BTC", price: bitcoin.quotes?.USD?.price, change: bitcoin.quotes?.USD?.percent_change_24h },
      { label: "Ethereum", symbol: "ETH", price: ethereum.quotes?.USD?.price, change: ethereum.quotes?.USD?.percent_change_24h },
      { label: "Solana", symbol: "SOL", price: solana.quotes?.USD?.price, change: solana.quotes?.USD?.percent_change_24h },
    ];

    cryptoWidget.innerHTML = `
      <div class="insight-card-head">
        <span class="insight-badge">الكريبتو</span>
        <h3>حركة العملات المشفرة</h3>
      </div>
      <p class="insight-summary">نظرة مركزة على أبرز العملات المشفرة الأكثر متابعة داخل السوق.</p>
      <ul class="insight-list">
        ${items
          .map((item) => {
            const changeClass = item.change >= 0 ? "is-up" : "is-down";
            const sign = item.change >= 0 ? "+" : "";
            return `<li><span>${item.label} <small>${item.symbol}</small></span><strong>$${item.price?.toLocaleString("en-US", { maximumFractionDigits: 2 }) ?? "--"} <em class="${changeClass}">${sign}${item.change?.toFixed(2) ?? "--"}%</em></strong></li>`;
          })
          .join("")}
      </ul>
      <p class="insight-footnote">المصدر: CoinPaprika</p>
    `;
  } catch (error) {
    renderInsightError(cryptoWidget, "الكريبتو", "تعذر تحميل أسعار العملات المشفرة الآن. حاول لاحقًا.");
  }
}

function renderTechFeedError() {
  if (!techFeedGrid || !techFeedStatus) return;
  techFeedStatus.textContent = "تعذر تحميل التغذية التقنية الآن.";
  techFeedGrid.innerHTML = `
    <div class="col-12">
      <article class="external-article-card">
        <div class="external-article-body">
          <span class="article-tag">تحديث</span>
          <h3>لم نتمكن من جلب المقالات التقنية في هذه اللحظة</h3>
          <p>الصفحة ما زالت تحتوي على مكتبة المقالات الداخلية أسفل هذا القسم، ويمكن إعادة المحاولة بتحديث الصفحة لاحقًا.</p>
        </div>
      </article>
    </div>
  `;
}

async function initTechFeed() {
  if (!techFeedGrid || !techFeedStatus) return;

  try {
    const articles = await fetchJson("https://dev.to/api/articles?tag=technology&per_page=6");
    const safeArticles = Array.isArray(articles) ? articles.slice(0, 6) : [];

    techFeedStatus.textContent = "يتم تحديث هذا القسم مباشرة من DEV API بالمقالات التقنية العامة.";

    techFeedGrid.innerHTML = safeArticles
      .map((article) => {
        const cover = article.cover_image || article.social_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";
        const readingTime = article.reading_time_minutes ? `${article.reading_time_minutes} دقائق قراءة` : "مقال تقني";
        return `
          <div class="col-lg-4 col-md-6">
            <article class="external-article-card">
              <div class="external-article-media">
                <img src="${cover}" alt="${article.title}" loading="lazy" />
              </div>
              <div class="external-article-body">
                <span class="article-tag">تقنية حديثة</span>
                <h3>${article.title}</h3>
                <p>${article.description || "مقال تقني حديث حول البرمجة، المنتجات الرقمية، أو الاتجاهات التقنية الحالية."}</p>
                <div class="external-article-meta">
                  <span>${article.user?.name || "DEV Community"}</span>
                  <span>${formatDateArabic(article.published_at)}</span>
                  <span>${readingTime}</span>
                </div>
                <a href="${article.url}" target="_blank" rel="noreferrer">قراءة المقال</a>
              </div>
            </article>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    renderTechFeedError();
  }
}

function initLiveDataSections() {
  initWeatherWidget();
  initCurrencyWidget();
  initCryptoWidget();
  initTechFeed();
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
  sponsorMarqueeInner.style.removeProperty("transform");
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
  removeDirectPhoneContacts();
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
  initLiveDataSections();
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
