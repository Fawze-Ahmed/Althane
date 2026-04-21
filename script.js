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
const chatbotKnowledgeBase = [
  {
    id: "services",
    label: "ما خدمات BLINK؟",
    keywords: ["الخدمات", "خدمات", "تقدمون", "بتشتغلوا", "شو تقدمون", "شو خدماتكم"],
    answer:
      "BLINK تقدم منظومة خدمات متكاملة تشمل تطوير المواقع والمنصات، تطبيقات الهاتف، الأمن السيبراني، التداول الخوارزمي، التصميم والهوية، التشغيل الرقمي، التسويق، تطوير المبيعات، خدمة العملاء، الذكاء الاصطناعي، الاستشارات القانونية، والتمويلات.",
  },
  {
    id: "choose-service",
    label: "كيف أختار الخدمة؟",
    keywords: ["اختار", "اختيار", "مناسب", "انسب", "محتاج", "أبدأ منين", "ابدا منين"],
    answer:
      "إذا كان هدفك الظهور والاقتناع فنبدأ عادة بالموقع والهوية والتسويق. وإذا كان هدفك التنظيم والسرعة فنركز على التشغيل والأتمتة وخدمة العملاء. وإذا كان هدفك النمو بثقة فنمزج بين أكثر من خدمة حسب المرحلة والميزانية.",
  },
  {
    id: "web-apps",
    label: "هل تنفذون مواقع وتطبيقات؟",
    keywords: ["موقع", "مواقع", "متجر", "متاجر", "تطبيق", "تطبيقات", "ويب", "woocommerce", "wordpress"],
    answer:
      "نعم، ننفذ مواقع تعريفية، متاجر إلكترونية، منصات خدمية، ولوحات تشغيل، وكذلك تطبيقات هاتف iOS وAndroid عندما تكون التجربة المتكررة على الموبايل جزءًا أساسيًا من الخدمة.",
  },
  {
    id: "ai-automation",
    label: "هل لديكم ذكاء اصطناعي وأتمتة؟",
    keywords: ["ذكاء", "اصطناعي", "ai", "أتمتة", "اوتوميشن", "automation", "bot", "روبوت"],
    answer:
      "نعم، نوفر حلول ذكاء اصطناعي وأتمتة عملية مثل المساعدين الذكيين، تسريع الردود، تحليل البيانات، وربط الخطوات التشغيلية لتقليل الجهد اليومي ورفع سرعة الأداء.",
  },
  {
    id: "pricing",
    label: "كيف أطلب عرض سعر؟",
    keywords: ["سعر", "تكلفة", "عرض سعر", "quote", "ميزانية", "budget", "سعركم"],
    answer:
      "أفضل طريقة لعرض سعر دقيق هي إرسال اسمك، نوع النشاط، الخدمة المطلوبة، وأهم تفاصيل المشروع. بعد ذلك نراجع الطلب ونرتب المسار الأنسب حسب الاحتياج الفعلي وليس باسم الخدمة فقط.",
  },
  {
    id: "timeline",
    label: "كم يستغرق التنفيذ؟",
    keywords: ["مدة", "وقت", "كم يستغرق", "التنفيذ", "موعد", "timeline"],
    answer:
      "مدة التنفيذ تختلف حسب نوع المشروع وحجم المحتوى وعدد التكاملات المطلوبة. المشاريع البسيطة أسرع، بينما المنصات والتجارب المتكاملة تحتاج مرحلة تحليل وتنفيذ أوسع. يمكننا تقدير المدة بدقة بعد استلام التفاصيل.",
  },
];
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

function refreshDynamicTranslations() {
  const savedLang = getSavedLanguage();
  if (savedLang !== "en") return;

  window.setTimeout(() => {
    applyGoogleTranslate("en");
    document.body.classList.add("translated-ltr");
    hideGoogleTranslateArtifacts();
  }, 200);
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

function normalizeArabicText(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[أإآا]/g, "ا")
    .replace(/[ة]/g, "ه")
    .replace(/[ى]/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getChatbotReply(message) {
  const normalized = normalizeArabicText(message);
  if (!normalized) {
    return "اكتب سؤالك باختصار، وسأرشدك إلى الخدمة أو الخطوة الأنسب.";
  }

  const match = chatbotKnowledgeBase.find((item) =>
    item.keywords.some((keyword) => normalized.includes(normalizeArabicText(keyword))),
  );

  if (match) return match.answer;

  return "أستطيع مساعدتك في فهم خدمات BLINK، اختيار المسار المناسب، أو توجيهك إلى طلب عرض سعر. إذا كان سؤالك يحتاج متابعة من الفريق، استخدم خيار التواصل مع أحد مسؤولي الشركة داخل نفس النافذة.";
}

function initChatAssistant() {
  if (!document.body || document.querySelector(".chatbot-floating")) return;

  const widget = document.createElement("div");
  widget.className = "chatbot-floating";
  widget.innerHTML = `
    <button id="chatbot-toggle" class="chatbot-toggle" type="button" aria-label="مساعد BLINK الذكي">
      <span class="chatbot-toggle-ring"></span>
      <span class="chatbot-toggle-core">
        <i class="bi bi-robot"></i>
        <span class="chatbot-toggle-spark chatbot-toggle-spark-one"></span>
        <span class="chatbot-toggle-spark chatbot-toggle-spark-two"></span>
        <span class="chatbot-toggle-spark chatbot-toggle-spark-three"></span>
      </span>
    </button>
    <div id="chatbot-panel" class="chatbot-panel" aria-hidden="true">
      <div class="chatbot-header">
        <div>
          <span class="chatbot-badge">BLINK Assistant</span>
          <strong>كيف أقدر أساعدك؟</strong>
          <p>مساعد سريع مبني على خدمات BLINK وطريقة عملنا.</p>
        </div>
        <button id="chatbot-close" class="chatbot-close" type="button" aria-label="إغلاق المساعد">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div id="chatbot-conversation" class="chatbot-body">
        <div class="chatbot-message bot">
          <p>مرحبًا، أقدر أجاوب على أكثر الأسئلة شيوعًا عن الخدمات، التنفيذ، واختيار المسار المناسب.</p>
        </div>
      </div>

      <div class="chatbot-quick-actions">
        ${chatbotKnowledgeBase
          .slice(0, 6)
          .map((item) => `<button class="chatbot-chip" type="button" data-chatbot-prompt="${item.label}">${item.label}</button>`)
          .join("")}
      </div>

      <form id="chatbot-input-form" class="chatbot-input-wrap">
        <input id="chatbot-input" type="text" placeholder="اكتب سؤالك هنا" autocomplete="off" />
        <button type="submit" aria-label="إرسال السؤال"><i class="bi bi-arrow-up-left"></i></button>
      </form>

      <div class="chatbot-escalation">
        <button id="chatbot-escalate" class="chatbot-escalate-btn" type="button">التواصل مع أحد مسؤولي الشركة</button>
      </div>

      <div id="chatbot-lead-panel" class="chatbot-lead-panel">
        <div class="chatbot-lead-head">
          <strong>أرسل طلبك مباشرة</strong>
          <p>املأ النموذج المختصر وسيصل إلى نفس بريد التواصل المعتمد لدى BLINK.</p>
        </div>
        <form id="chatbot-lead-form" class="chatbot-lead-form" action="https://formsubmit.co/blinkagency4u@gmail.com" method="POST" target="chatbot-submit-frame">
          <input type="hidden" name="_subject" value="طلب جديد من مساعد BLINK الذكي" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div class="row g-2">
            <div class="col-12"><input class="form-control" type="text" name="name" placeholder="الاسم الكامل" required /></div>
            <div class="col-md-6"><input class="form-control" type="tel" name="phone" placeholder="رقم الهاتف" required /></div>
            <div class="col-md-6"><input class="form-control" type="email" name="email" placeholder="البريد الإلكتروني" required /></div>
            <div class="col-md-6"><input class="form-control" type="text" name="company" placeholder="اسم الشركة" /></div>
            <div class="col-md-6"><input class="form-control" type="text" name="service" placeholder="الخدمة المطلوبة" /></div>
            <div class="col-12"><textarea class="form-control" name="message" rows="4" placeholder="اكتب نبذة مختصرة عن طلبك" required></textarea></div>
            <div class="col-12"><button class="chatbot-form-submit" type="submit">إرسال الطلب</button></div>
          </div>
        </form>
        <p id="chatbot-form-status" class="chatbot-form-status"></p>
        <iframe name="chatbot-submit-frame" title="chatbot submit frame" class="chatbot-submit-frame"></iframe>
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  const panel = widget.querySelector("#chatbot-panel");
  const toggle = widget.querySelector("#chatbot-toggle");
  const close = widget.querySelector("#chatbot-close");
  const conversation = widget.querySelector("#chatbot-conversation");
  const inputForm = widget.querySelector("#chatbot-input-form");
  const input = widget.querySelector("#chatbot-input");
  const escalateButton = widget.querySelector("#chatbot-escalate");
  const leadPanel = widget.querySelector("#chatbot-lead-panel");
  const leadForm = widget.querySelector("#chatbot-lead-form");
  const formStatus = widget.querySelector("#chatbot-form-status");

  const appendMessage = (type, text) => {
    if (!conversation || !text) return;
    const bubble = document.createElement("div");
    bubble.className = `chatbot-message ${type}`;
    bubble.innerHTML = `<p>${text}</p>`;
    conversation.appendChild(bubble);
    conversation.scrollTop = conversation.scrollHeight;
    refreshDynamicTranslations();
  };

  const togglePanel = (open) => {
    const shouldOpen = typeof open === "boolean" ? open : !panel?.classList.contains("open");
    panel?.classList.toggle("open", shouldOpen);
    panel?.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
    if (shouldOpen) {
      window.setTimeout(() => input?.focus(), 120);
    }
  };

  toggle?.addEventListener("click", () => togglePanel());
  close?.addEventListener("click", () => togglePanel(false));

  document.addEventListener("click", (event) => {
    if (!panel || !toggle) return;
    if (panel.contains(event.target) || toggle.contains(event.target)) return;
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });

  widget.querySelectorAll("[data-chatbot-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.getAttribute("data-chatbot-prompt");
      appendMessage("user", prompt);
      window.setTimeout(() => appendMessage("bot", getChatbotReply(prompt)), 180);
    });
  });

  inputForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input?.value.trim();
    if (!question) return;
    appendMessage("user", question);
    input.value = "";
    window.setTimeout(() => appendMessage("bot", getChatbotReply(question)), 220);
  });

  escalateButton?.addEventListener("click", () => {
    leadPanel?.classList.toggle("open");
    if (leadPanel?.classList.contains("open")) {
      formStatus.textContent = "";
      leadPanel.querySelector("input[name='name']")?.focus();
    }
  });

  leadForm?.addEventListener("submit", () => {
    if (!formStatus) return;
    formStatus.textContent = "تم إرسال الطلب. سيصل إلى فريق BLINK على نفس بريد التواصل وسنراجع التفاصيل بأسرع وقت.";
    window.setTimeout(() => {
      leadForm.reset();
    }, 400);
  });

  refreshDynamicTranslations();
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
      <p class="insight-footnote">Open-Meteo</p>
    `;
    refreshDynamicTranslations();
  } catch (error) {
    renderInsightError(weatherWidget, "الطقس", "تعذر جلب حالة الطقس الآن. حاول تحديث الصفحة بعد قليل.");
    refreshDynamicTranslations();
  }
}

async function initCurrencyWidget() {
  if (!currencyWidget) return;

  try {
    const data = await fetchJson("https://open.er-api.com/v6/latest/USD");
    const rates = data.rates || {};
    const updatedAt = formatDateArabic(data.time_last_update_utc || "");

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
      <p class="insight-footnote">${updatedAt ? `${updatedAt} | ` : ""}ExchangeRate-API</p>
    `;
    refreshDynamicTranslations();
  } catch (error) {
    renderInsightError(currencyWidget, "العملات", "تعذر تحميل أسعار العملات الآن. حاول مرة أخرى لاحقًا.");
    refreshDynamicTranslations();
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
      <p class="insight-footnote">CoinPaprika</p>
    `;
    refreshDynamicTranslations();
  } catch (error) {
    renderInsightError(cryptoWidget, "الكريبتو", "تعذر تحميل أسعار العملات المشفرة الآن. حاول لاحقًا.");
    refreshDynamicTranslations();
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
  refreshDynamicTranslations();
}

async function initTechFeed() {
  if (!techFeedGrid || !techFeedStatus) return;

  try {
    const articles = await fetchJson("https://dev.to/api/articles?tag=technology&per_page=6");
    const safeArticles = Array.isArray(articles) ? articles.slice(0, 6) : [];

    techFeedStatus.textContent = "يتم تحديث هذا القسم تلقائيًا بأحدث المقالات التقنية.";

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
    refreshDynamicTranslations();
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

function formatFinanceCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, Number(value) || 0));
}

function getFinanceReadinessLabel(score) {
  if (score >= 86) return "جاهزية قوية جدًا";
  if (score >= 74) return "جاهزية قوية";
  if (score >= 62) return "جاهزية جيدة";
  if (score >= 50) return "جاهزية متوسطة";
  return "تحتاج تجهيزًا أكبر";
}

function initFinanceAnalyzer() {
  const form = document.getElementById("finance-analyzer-form");
  const result = document.getElementById("finance-analysis-result");
  if (!form || !result) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const gaugeCircumference = 339.292;
  const banks = [
    { name: "Emirates NBD", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "ADCB", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 64, salaryTransfer: "preferred" },
    { name: "FAB", type: "تقليدي", minSalary: 7000, unlistedSalary: 9000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Mashreq", type: "تقليدي", minSalary: 5000, unlistedSalary: 10000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "required" },
    { name: "Commercial Bank of Dubai", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "RAKBANK", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "National Bank of Fujairah", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "optional" },
    { name: "United Arab Bank", type: "تقليدي", minSalary: 5000, unlistedSalary: 8000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Commercial Bank International", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "optional" },
    { name: "Bank of Sharjah", type: "تقليدي", minSalary: 7000, unlistedSalary: 9000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "optional" },
    { name: "National Bank of Umm Al Qaiwain", type: "تقليدي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "optional" },
    { name: "Arab Bank", type: "تقليدي", minSalary: 8000, unlistedSalary: 10000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "HSBC UAE", type: "دولي", minSalary: 15000, unlistedSalary: 18000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "required" },
    { name: "Standard Chartered UAE", type: "دولي", minSalary: 8000, unlistedSalary: 10000, minServiceMonths: 6, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Dubai Islamic Bank", type: "إسلامي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Emirates Islamic", type: "إسلامي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Abu Dhabi Islamic Bank", type: "إسلامي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Ajman Bank", type: "إسلامي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Sharjah Islamic Bank", type: "إسلامي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
    { name: "Al Hilal Bank", type: "إسلامي", minSalary: 5000, unlistedSalary: 7000, minServiceMonths: 3, ageMin: 21, ageMax: 60, salaryTransfer: "preferred" },
  ];

  const evaluateBank = (bank, data) => {
    const salaryTarget = data.employerType === "unlisted" ? bank.unlistedSalary : bank.minSalary;
    let score = 82;
    const reasons = [];

    if (data.salary < salaryTarget) {
      score -= clamp(Math.round((salaryTarget - data.salary) / 400), 14, 40);
      reasons.push(`الراتب الحالي أقل من المستوى الأقرب لهذا البنك وهو ${formatFinanceCurrency(salaryTarget)} AED تقريبًا.`);
    } else {
      reasons.push(`الدخل الحالي مناسب مبدئيًا لحدود هذا البنك عند مستوى ${formatFinanceCurrency(salaryTarget)} AED أو أعلى.`);
      if (data.salary >= salaryTarget * 1.35) score += 5;
    }

    if (data.age < bank.ageMin || data.age > bank.ageMax) {
      score -= 30;
      reasons.push(`العمر خارج النطاق المعتاد لهذه الفئة التمويلية (${bank.ageMin}-${bank.ageMax}).`);
    } else {
      reasons.push("العمر ضمن النطاق المقبول مبدئيًا لهذا النوع من المنتجات.");
    }

    if (data.serviceMonths < bank.minServiceMonths) {
      score -= clamp((bank.minServiceMonths - data.serviceMonths) * 3, 8, 24);
      reasons.push(`مدة الخدمة الحالية أقل من المستوى المريح لهذا البنك (${bank.minServiceMonths} أشهر أو أكثر).`);
    } else {
      reasons.push("الاستقرار الوظيفي الحالي يدعم الملف في القراءة الأولية.");
    }

    if (data.dbr > 0.5) {
      score -= clamp(Math.round((data.dbr - 0.5) * 90), 14, 30);
      reasons.push("عبء الالتزامات مرتفع مقارنة بالدخل وقد يضغط على القرار الأولي.");
    } else {
      reasons.push("عبء الالتزامات ما زال ضمن النطاق الأقرب للراحة الائتمانية.");
      if (data.dbr <= 0.32) score += 4;
    }

    if (bank.salaryTransfer === "required" && data.salaryTransfer !== "yes") {
      score -= 18;
      reasons.push("هذا البنك يفضل بصورة أكبر الملفات القابلة لتحويل الراتب.");
    } else if (bank.salaryTransfer === "preferred" && data.salaryTransfer !== "yes") {
      score -= 10;
      reasons.push("تحويل الراتب هنا يعطي الملف راحة أكبر في التقييم.");
    } else if (data.salaryTransfer === "yes") {
      score += 4;
    }

    if (data.employerType === "government") {
      score += 5;
    } else if (data.employerType === "listed") {
      score += 3;
    } else {
      score -= 6;
      reasons.push("جهة العمل غير المدرجة تجعل ترتيب المستندات وإثبات الدخل أكثر أهمية.");
    }

    if (data.employmentStatus === "self_employed") {
      score -= 12;
      reasons.push("الدخل المتغير يحتاج دعمًا أكبر بالمستندات وكشف الحركة البنكية.");
    }

    if (data.existingLoans === "yes") {
      score -= 6;
    }

    if (data.creditCards >= 4) {
      score -= 5;
      reasons.push("تعدد بطاقات الائتمان قد يرفع حساسية التقييم الأولي.");
    }

    if (data.bankAccount === "yes") score += 2;
    if (data.loanPurpose === "debt") score -= 3;
    if (data.loanPurpose === "business" && bank.type === "دولي") score += 3;
    if (data.residency === "national") score += 2;
    if (data.maritalStatus === "married" && data.dependents >= 4) score -= 4;

    return {
      ...bank,
      score: clamp(Math.round(score), 18, 96),
      reasons: reasons.slice(0, 4),
    };
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      fullName: formData.get("full_name")?.toString().trim() || "العميل",
      nationality: formData.get("nationality")?.toString().trim() || "",
      residency: formData.get("residency"),
      age: Number(formData.get("age") || 0),
      maritalStatus: formData.get("marital_status"),
      salary: Number(formData.get("salary") || 0),
      liabilities: Number(formData.get("liabilities") || 0),
      employerType: formData.get("employer_type"),
      employerName: formData.get("employer_name")?.toString().trim() || "",
      serviceMonths: Number(formData.get("service_months") || 0),
      salaryTransfer: formData.get("salary_transfer"),
      employmentStatus: formData.get("employment_status"),
      existingLoans: formData.get("existing_loans"),
      creditCards: Number(formData.get("credit_cards") || 0),
      dependents: Number(formData.get("dependents") || 0),
      loanPurpose: formData.get("loan_purpose"),
      bankAccount: formData.get("bank_account"),
      loanAmount: Number(formData.get("loan_amount") || 0),
    };

    const dbr = data.salary > 0 ? data.liabilities / data.salary : 1;
    data.dbr = dbr;

    const evaluatedBanks = banks.map((bank) => evaluateBank(bank, data)).sort((a, b) => b.score - a.score);
    const topSix = evaluatedBanks.slice(0, 6);

    const overallScore = Math.round(
      evaluatedBanks.reduce((sum, bank) => sum + bank.score, 0) / evaluatedBanks.length,
    );
    const upliftScore = Math.min(97, overallScore + (overallScore >= 78 ? 7 : overallScore >= 62 ? 10 : 14));
    const dbrPercent = Math.round(dbr * 100);
    const salaryStrength = clamp(Math.round((data.salary / 12000) * 100), 8, 100);
    const stabilityStrength = clamp(Math.round((data.serviceMonths / 12) * 100) + (data.salaryTransfer === "yes" ? 8 : 0), 10, 100);
    const debtComfort = clamp(100 - dbrPercent, 5, 100);
    const disposableIncome = Math.max(0, data.salary - data.liabilities);
    const strongMatches = evaluatedBanks.filter((bank) => bank.score >= 75).length;
    const mediumMatches = evaluatedBanks.filter((bank) => bank.score >= 60 && bank.score < 75).length;
    const highIncomeFit = evaluatedBanks.filter((bank) => bank.score >= 80).length;

    const readinessTips = [];
    if (data.salary < 7000) readinessTips.push("رفع الدخل الموثق أو اختيار شريحة بنوك أدق سيجعل الصورة أقوى وأكثر تناسقًا.");
    if (data.serviceMonths < 6) readinessTips.push("تحسن مدة الخدمة الحالية سيزيد من استقرار الملف ويقوي ترتيبه أمام عدد أكبر من البنوك.");
    if (dbr > 0.5) readinessTips.push("خفض الالتزامات أو إعادة هيكلتها سيظهر القدرة التمويلية بصورة أهدأ وأكثر إقناعًا.");
    if (data.salaryTransfer === "no") readinessTips.push("إتاحة تحويل الراتب تظل من أقوى العناصر التي ترفع راحة عدد كبير من جهات التمويل.");
    if (data.employerType === "unlisted") readinessTips.push("تجهيز خطاب راتب واضح وكشف حساب قوي ومستندات جهة العمل يصبح أكثر أهمية مع الشركات غير المدرجة.");
    if (data.employmentStatus === "self_employed") readinessTips.push("إبراز انتظام الدخل عبر كشوف الحركة البنكية والملخصات المالية سيمنح الملف ثقة أكبر.");
    if (!readinessTips.length) readinessTips.push("ملفك يبدو متماسكًا مبدئيًا، والتركيز الآن يجب أن يكون على جودة التقديم وترتيب المستندات وطريقة عرض الطلب.");

    result.innerHTML = `
      <div class="finance-result-shell">
        <div class="finance-insight-grid">
          <article class="finance-chart-card">
            <span class="portfolio-eyebrow">مؤشر الجاهزية</span>
            <div class="finance-gauge-wrap">
              <div class="finance-gauge-stack">
                <svg class="finance-gauge" viewBox="0 0 120 120" style="--gauge-value:${overallScore}">
                  <defs>
                    <linearGradient id="financeGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#12a4d9"></stop>
                      <stop offset="55%" stop-color="#0d83c9"></stop>
                      <stop offset="100%" stop-color="#ffb545"></stop>
                    </linearGradient>
                  </defs>
                  <circle class="finance-gauge-track" cx="60" cy="60" r="54"></circle>
                  <circle class="finance-gauge-fill" cx="60" cy="60" r="54" style="stroke-dasharray:${gaugeCircumference};stroke-dashoffset:${gaugeCircumference - (gaugeCircumference * overallScore) / 100}"></circle>
                </svg>
                <div class="finance-gauge-score">
                  <strong>${overallScore}%</strong>
                  <span>${getFinanceReadinessLabel(overallScore)}</span>
                </div>
              </div>
              <div class="finance-metric-list">
                <div class="finance-metric-row">
                  <span>قوة الدخل</span>
                  <div class="finance-bar-track"><div class="finance-bar-fill" style="width:${salaryStrength}%"></div></div>
                  <strong>${salaryStrength}%</strong>
                </div>
                <div class="finance-metric-row">
                  <span>راحة الالتزامات</span>
                  <div class="finance-bar-track"><div class="finance-bar-fill ${dbrPercent > 50 ? "is-risk" : ""}" style="width:${dbrPercent > 50 ? dbrPercent : debtComfort}%"></div></div>
                  <strong>${debtComfort}%</strong>
                </div>
                <div class="finance-metric-row">
                  <span>الاستقرار</span>
                  <div class="finance-bar-track"><div class="finance-bar-fill" style="width:${stabilityStrength}%"></div></div>
                  <strong>${stabilityStrength}%</strong>
                </div>
              </div>
            </div>
          </article>

          <article class="finance-chart-card">
            <span class="portfolio-eyebrow">مؤشرات الملف</span>
            <h3>${data.fullName}، هذه صورة أولية لملفك الحالي</h3>
            <p class="finance-chart-caption">القراءة التالية مصممة لتقريب القرار للعميل وتوضيح أقرب الجهات لملفه بشكل بصري سريع وواضح.</p>
            <div class="finance-distribution-grid">
              <div>
                <strong>${formatFinanceCurrency(data.salary)}</strong>
                <span>دخل شهري موثق</span>
              </div>
              <div>
                <strong>${formatFinanceCurrency(disposableIncome)}</strong>
                <span>سيولة شهرية بعد الالتزامات</span>
              </div>
              <div>
                <strong>${dbrPercent}%</strong>
                <span>نسبة الالتزامات من الراتب</span>
              </div>
              <div>
                <strong>${strongMatches}</strong>
                <span>جهات بملاءمة قوية</span>
              </div>
              <div>
                <strong>${mediumMatches}</strong>
                <span>جهات بملاءمة جيدة</span>
              </div>
              <div>
                <strong>${highIncomeFit}</strong>
                <span>خيارات عالية التوافق</span>
              </div>
            </div>
          </article>
        </div>

        <div class="finance-summary-grid">
          <article class="finance-summary-card">
            <span class="portfolio-eyebrow">ملخص الجاهزية</span>
            <div class="finance-summary-score"><strong class="finance-score-value">${overallScore}%</strong><span class="finance-score-label">${getFinanceReadinessLabel(overallScore)}</span></div>
            <h3>الملف يبدو ${overallScore >= 74 ? "قويًا" : overallScore >= 62 ? "واعدًا" : "قابلاً للتحسين"} ضمن القراءة الأولية الحالية</h3>
            <p>أقوى نقطة في الملف الآن هي ${salaryStrength >= stabilityStrength && salaryStrength >= debtComfort ? "قوة الدخل مقارنة بعدد كبير من الجهات" : stabilityStrength >= debtComfort ? "الاستقرار الوظيفي وترتيب عناصر الملف" : "مساحة الحركة المتاحة بعد الالتزامات الشهرية"}.</p>
            <div class="finance-summary-meta">
              <span>الراتب: ${formatFinanceCurrency(data.salary)} AED</span>
              <span>الالتزامات: ${formatFinanceCurrency(data.liabilities)} AED</span>
              <span>عبء الالتزامات: ${dbrPercent}%</span>
              <span>مبلغ الطلب: ${formatFinanceCurrency(data.loanAmount)} AED</span>
            </div>
          </article>
          <article class="finance-summary-card">
            <span class="portfolio-eyebrow">أين نرفع الملف؟</span>
            <h3>أهم التحسينات التي ستقوي موقفك أمام البنوك</h3>
            <ul class="finance-tip-list">
              ${readinessTips.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
          </article>
        </div>

        <article class="finance-chart-card">
          <span class="portfolio-eyebrow">أقرب 6 جهات الآن</span>
          <h3>هذا الرسم يوضح البنوك الأعلى ملاءمة لملفك في المرحلة الحالية</h3>
          <ul class="finance-bank-chart-bars">
            ${topSix
              .map(
                (bank) => `
                  <li>
                    <span>${bank.name}</span>
                    <div class="finance-bar-track"><div class="finance-bar-fill" style="width:${bank.score}%"></div></div>
                    <strong>${bank.score}%</strong>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </article>

        <div>
          <div class="section-title">
            <span>جميع الجهات المقيمة</span>
            <h2>أدناه ترتيب موسع للبنوك والجهات الممولة داخل التقييم الحالي، حتى يرى العميل السوق بصورة أشمل لا بصورة ضيقة.</h2>
          </div>
          <div class="finance-bank-grid">
            ${evaluatedBanks
              .map(
                (bank) => `
                  <article class="finance-bank-card">
                    <div class="finance-bank-head">
                      <div>
                        <small>مؤشر ملاءمة أولي</small>
                        <h3>${bank.name}</h3>
                        <p>نوع الجهة: ${bank.type} ${bank.salaryTransfer === "required" ? "• يفضل تحويل راتب" : bank.salaryTransfer === "preferred" ? "• تحويل الراتب يعطي أفضلية" : "• مرونة أعلى في الهيكلة"}</p>
                      </div>
                      <div class="finance-score-pill">
                        <strong>${bank.score}%</strong>
                        <span>ملاءمة أولية</span>
                      </div>
                    </div>
                    <ul class="finance-bank-points">
                      ${bank.reasons.map((reason) => `<li>${reason}</li>`).join("")}
                    </ul>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>

        <article class="finance-marketing-panel">
          <span class="portfolio-eyebrow">جاهزية أعلى عند التقديم</span>
          <h3>التقديم عبر Amwali قد يرفع قوة عرض الملف من ${overallScore}% إلى ${upliftScore}%</h3>
          <p>
            الفارق هنا لا يكون في الأرقام فقط، بل في طريقة ترتيب المستندات، صياغة الطلب، إبراز عناصر القوة،
            واختيار الجهة الأنسب من البداية. كل ذلك يرفع وضوح الملف ويجعله أكثر احترافية عند التقديم.
          </p>
          <a href="https://amwali.tech" target="_blank" rel="noreferrer" class="btn-main">انقل ملفك إلى Amwali</a>
        </article>
      </div>
    `;

    refreshDynamicTranslations();
    result.scrollIntoView({ behavior: "smooth", block: "start" });
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
  initFinanceAnalyzer();
  initChatAssistant();
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
