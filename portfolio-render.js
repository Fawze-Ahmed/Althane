(function () {
  const projects = Array.isArray(window.blinkPortfolioProjects) ? window.blinkPortfolioProjects : [];
  if (!projects.length) return;

  const renderGrid = (target, items) => {
    if (!target) return;

    target.innerHTML = items
      .map((project, index) => {
        const category = project.category || "مشروع رقمي";
        const buttonLabel = project.projectUrl ? "عرض ما أنجزناه" : "تفاصيل التنفيذ";
        return `
          <div class="col-lg-4 col-md-6 reveal">
            <article class="portfolio-card portfolio-card-interactive" data-portfolio-id="${project.id}" tabindex="0" role="button" aria-haspopup="dialog">
              <div class="portfolio-card-media">
                <img src="${project.image}" alt="${project.title}" loading="lazy" />
              </div>
              <div class="portfolio-card-body">
                <div class="portfolio-card-head">
                  <span class="portfolio-card-index">${String(index + 1).padStart(2, "0")}</span>
                  <span class="portfolio-card-category">${category}</span>
                </div>
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
                <span class="portfolio-preview-btn">${buttonLabel}</span>
              </div>
            </article>
          </div>
        `;
      })
      .join("");
  };

  const createModal = () => {
    if (document.getElementById("portfolio-modal")) return document.getElementById("portfolio-modal");

    const modal = document.createElement("div");
    modal.id = "portfolio-modal";
    modal.className = "portfolio-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="portfolio-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
        <button id="portfolio-modal-close" class="portfolio-modal-close" type="button" aria-label="إغلاق المعاينة">
          <i class="bi bi-x-lg"></i>
        </button>
        <span id="portfolio-modal-category" class="portfolio-modal-tag"></span>
        <h3 id="portfolio-modal-title"></h3>
        <p id="portfolio-modal-summary" class="portfolio-modal-summary"></p>
        <div class="portfolio-modal-section">
          <strong>ما الذي أنجزناه في هذا المشروع؟</strong>
          <p id="portfolio-modal-details"></p>
        </div>
        <div class="portfolio-modal-section">
          <strong>أبرز ما تم التركيز عليه</strong>
          <ul id="portfolio-modal-list" class="portfolio-modal-list"></ul>
        </div>
        <div class="portfolio-modal-actions">
          <a id="portfolio-modal-link" class="btn-main" href="#" target="_blank" rel="noreferrer">زيارة المشروع</a>
          <button id="portfolio-modal-stay" class="btn-outline-dark" type="button">رجوع</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  };

  const modal = createModal();
  const modalTitle = modal.querySelector("#portfolio-modal-title");
  const modalTag = modal.querySelector("#portfolio-modal-category");
  const modalSummary = modal.querySelector("#portfolio-modal-summary");
  const modalDetails = modal.querySelector("#portfolio-modal-details");
  const modalList = modal.querySelector("#portfolio-modal-list");
  const modalLink = modal.querySelector("#portfolio-modal-link");
  const modalClose = modal.querySelector("#portfolio-modal-close");
  const modalStay = modal.querySelector("#portfolio-modal-stay");

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  const openModal = (projectId) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalTag.textContent = project.category || "مشروع رقمي";
    modalSummary.textContent = project.summary || "";
    modalDetails.textContent = project.details || "";
    modalList.innerHTML = (project.deliverables || [])
      .map((item) => `<li>${item}</li>`)
      .join("");

    if (project.projectUrl) {
      modalLink.href = project.projectUrl;
      modalLink.style.display = "inline-flex";
    } else {
      modalLink.removeAttribute("href");
      modalLink.style.display = "none";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.refreshDynamicTranslations === "function") {
      window.refreshDynamicTranslations();
    }
  };

  const bindCards = () => {
    document.querySelectorAll(".portfolio-card-interactive").forEach((card) => {
      const open = () => openModal(card.dataset.portfolioId);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
  };

  modalClose?.addEventListener("click", closeModal);
  modalStay?.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  const homeGrid = document.getElementById("home-portfolio-grid");
  const portfolioGrid = document.getElementById("portfolio-projects");

  if (homeGrid) {
    const featured = projects.filter((project) => project.homeFeatured).slice(0, 6);
    renderGrid(homeGrid, featured);
  }

  if (portfolioGrid) {
    renderGrid(portfolioGrid, projects);
  }

  bindCards();
})();
