/* Toggles the hamburger mobile menu open/closed. */
function toggleMenu() {
  document.querySelector(".menu-links").classList.toggle("open");
  document.querySelector(".hamburger-icon").classList.toggle("open");
}

/* Adds a 'scrolled' class to the desktop nav once the user scrolls past 24 px. */
function initNavScroll() {
  const nav = document.getElementById("desktop-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  }, { passive: true });
}

/* Fades and slides up every element with class 'reveal' as it enters the viewport. */
function initScrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* Adds a hover 'tl-active' class to each timeline item for the accent highlight. */
function initTimeline() {
  document.querySelectorAll(".tl-item").forEach((item) => {
    item.addEventListener("mouseenter", () => item.classList.add("tl-active"));
    item.addEventListener("mouseleave", () => item.classList.remove("tl-active"));
  });
}

/* Toggles the expandable drawer inside a bento project card. */
function initBentoCards() {
  document.querySelectorAll(".bento-toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const drawer = document.getElementById(btn.dataset.target);
      if (!drawer) return;

      const isOpen = drawer.classList.contains("open");

      /* Close all drawers first */
      document.querySelectorAll(".bento-drawer.open").forEach((d) => d.classList.remove("open"));
      document.querySelectorAll(".bento-toggle-btn.open").forEach((b) => {
        b.classList.remove("open");
        b.querySelector("span").textContent = "View Details";
      });

      /* Open this one if it was closed */
      if (!isOpen) {
        drawer.classList.add("open");
        btn.classList.add("open");
        btn.querySelector("span").textContent = "Hide Details";
      }
    });
  });
}

/* Applies a subtle perspective tilt to hovered tilt-card elements. */
function initTiltCards() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

/* Adds 'reveal' to profile elements and 'tilt-card' to bento cards. */
function tagAnimatables() {
  /* Profile section hero elements (HTML not changed) */
  [".section__text", ".section__pic-container"].forEach((sel) =>
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"))
  );

  /* Bento cards get the tilt interaction */
  document.querySelectorAll(".bento-card").forEach((el) => el.classList.add("tilt-card"));
}

/* ═══════════════════════════════════════════════════════════════════
   FCAS MILESTONE ROADMAP  ← UNCHANGED
   ═══════════════════════════════════════════════════════════════════ */

const MILESTONES = [
  {
    id: "p",    label: "P",      fullName: "Probability",
    category: "Preliminary",  status: "passed",   passYear: "2022",
    desc: "Probability theory, random variables, and common distributions foundational to actuarial modeling.",
    topics: ["Probability Theory", "Random Variables", "Distributions", "Risk Modeling"]
  },
  {
    id: "fm",   label: "FM",     fullName: "Financial Mathematics",
    category: "Preliminary",  status: "passed",   passYear: "2022",
    desc: "Interest theory, annuities, bonds, and an introduction to financial derivatives pricing.",
    topics: ["Interest Theory", "Annuities", "Bonds", "Derivatives"]
  },
  {
    id: "mas1", label: "MAS-I",  fullName: "Modern Actuarial Statistics I",
    category: "Associateship", status: "passed",  passYear: "2023",
    desc: "Extended linear models, time series analysis, credibility theory, and simulation methods.",
    topics: ["Linear Models", "Time Series", "Credibility", "Simulation"]
  },
  {
    id: "mas2", label: "MAS-II", fullName: "Modern Actuarial Statistics II",
    category: "Associateship", status: "upcoming",
    desc: "Bayesian analysis, generalized linear models, and machine learning applied to actuarial problems.",
    topics: ["Bayesian Analysis", "GLMs", "Machine Learning", "Advanced Stats"]
  },
  {
    id: "e5",   label: "5",      fullName: "Exam 5 — Ratemaking",
    category: "Fellowship",   status: "upcoming",
    desc: "Basic ratemaking and reserving fundamentals for P&C, including loss development triangles.",
    topics: ["Ratemaking", "Loss Development", "Reserving", "P&C Principles"]
  },
  {
    id: "e6",   label: "6-CAN",  fullName: "Exam 6 — Canada",
    category: "Fellowship",   status: "upcoming",
    desc: "Canadian regulatory environment, IFRS 17, and P&C reserving requirements.",
    topics: ["IFRS 17", "Canadian Regulation", "Reserving", "Compliance"]
  },
  {
    id: "e7",   label: "7",      fullName: "Exam 7 — Loss Reserving",
    category: "Fellowship",   status: "upcoming",
    desc: "Advanced ratemaking, development, credibility, and emerging topics in P&C practice.",
    topics: ["Advanced Ratemaking", "Credibility", "Loss Development", "Emerging Topics"]
  },
  {
    id: "e8",   label: "8",      fullName: "Exam 8 — Advanced Ratemaking",
    category: "Fellowship",   status: "upcoming",
    desc: "Stochastic reserving, reinsurance, and advanced IBNR estimation methods.",
    topics: ["Stochastic Reserving", "Reinsurance", "IBNR", "Reserve Variability"]
  },
  {
    id: "e9",   label: "9",      fullName: "Exam 9 — Financial Risk",
    category: "Fellowship",   status: "upcoming",
    desc: "Enterprise risk management frameworks and insurance company finance.",
    topics: ["ERM", "Financial Risk", "Insurance Finance", "Capital Modeling"]
  },
  {
    id: "fcas", label: "FCAS",   fullName: "Fellowship",
    category: "Designation",  status: "upcoming",
    desc: "Fellow of the Casualty Actuarial Society — the highest credential in P&C actuarial science.",
    topics: ["P&C Expertise", "Global Credential", "Professional Recognition"]
  }
];

/* Returns the SVG checkmark string used inside passed milestone nodes. */
function checkSVG() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="3"
    stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`;
}

/* Returns the SVG star string used inside the FCAS destination node. */
function starSVG() {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77
             l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>`;
}

/* Builds and returns the HTML string for one milestone node column. */
function renderNode(m) {
  const nodeClass = m.status === "passed" ? "passed"
                  : m.id    === "fcas"    ? "destination"
                  : "upcoming";

  const icon = m.status === "passed" ? checkSVG()
             : m.id    === "fcas"    ? starSVG()
             : `<span>${m.label}</span>`;

  const badgeClass = m.status === "passed" ? "passed" : "upcoming";
  const badgeText  = m.status === "passed" ? `Passed ${m.passYear}` : "Upcoming";

  return `
    <div class="milestone-item" data-id="${m.id}">
      <button class="milestone-node ${nodeClass}" aria-label="${m.fullName}">
        ${icon}
      </button>
      <div class="milestone-label">${m.label}</div>
      <div class="milestone-tooltip">
        <h4>${m.fullName}</h4>
        <p>${m.desc}</p>
        <span class="m-badge ${badgeClass}">${badgeText}</span>
        <span class="m-badge cat">${m.category}</span>
      </div>
    </div>`;
}

/* Positions the FCAS track rail and animates the progress fill to the last passed node. */
function positionTrack() {
  const wrapper   = document.querySelector(".fcas-timeline-wrapper");
  const trackBg   = document.querySelector(".fcas-track-bg");
  const trackFill = document.querySelector(".fcas-track-fill");
  const nodes     = document.querySelectorAll(".milestone-node");

  if (!wrapper || !trackBg || !nodes.length) return;

  const wRect       = wrapper.getBoundingClientRect();
  const firstCenter = nodes[0].getBoundingClientRect().left + nodes[0].offsetWidth / 2 - wRect.left;
  const lastCenter  = nodes[nodes.length - 1].getBoundingClientRect().left
                    + nodes[nodes.length - 1].offsetWidth / 2 - wRect.left;
  const totalWidth  = lastCenter - firstCenter;

  trackBg.style.left  = firstCenter + "px";
  trackBg.style.width = totalWidth  + "px";

  const passedNodes = [...nodes].filter(n => n.classList.contains("passed"));
  if (!passedNodes.length) return;

  const lpCenter = passedNodes[passedNodes.length - 1].getBoundingClientRect().left
                 + passedNodes[passedNodes.length - 1].offsetWidth / 2 - wRect.left;
  const pct = ((lpCenter - firstCenter) / totalWidth) * 100;

  requestAnimationFrame(() => {
    setTimeout(() => { trackFill.style.width = pct + "%"; }, 350);
  });
}

/* Wires click events on milestone nodes to open/close the detail panel. */
function initMilestoneClicks() {
  const panel    = document.getElementById("fcas-detail");
  let   activeId = null;

  document.querySelectorAll(".milestone-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const m  = MILESTONES.find(x => x.id === id);
      if (!m) return;

      if (activeId === id) {
        panel.classList.remove("visible");
        item.classList.remove("active");
        activeId = null;
        return;
      }

      document.querySelectorAll(".milestone-item.active")
        .forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      activeId = id;

      const badgeClass = m.status === "passed" ? "passed" : "upcoming";
      const badgeText  = m.status === "passed" ? `✓ Passed ${m.passYear}` : "Upcoming";
      const topicsHTML = m.topics.map(t => `<span class="m-badge cat">${t}</span>`).join("");

      panel.innerHTML = `
        <div class="fcas-detail-top">
          <div>
            <h3>${m.fullName}</h3>
            <span class="m-badge cat" style="display:inline-block;margin-top:0.3rem">
              ${m.category}
            </span>
          </div>
          <button class="fcas-close-btn" aria-label="Close">×</button>
        </div>
        <p class="fcas-detail-desc">${m.desc}</p>
        <div class="fcas-detail-tags">
          <span class="m-badge ${badgeClass}">${badgeText}</span>
          ${topicsHTML}
        </div>`;

      panel.classList.add("visible");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });

      panel.querySelector(".fcas-close-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        panel.classList.remove("visible");
        item.classList.remove("active");
        activeId = null;
      });
    });
  });
}

/* Builds and injects the complete FCAS milestone roadmap into #fcas-roadmap. */
function initFCASRoadmap() {
  const container = document.getElementById("fcas-roadmap");
  if (!container) return;

  const passed    = MILESTONES.filter(m => m.status === "passed").length;
  const total     = MILESTONES.length;
  const pct       = Math.round((passed / total) * 100);
  const remaining = total - passed;

  container.innerHTML = `
    <div class="fcas-stats-row reveal">
      <div class="fcas-stat">
        <span class="fcas-stat-number">${passed}</span>
        <span class="fcas-stat-label">Exams Passed</span>
      </div>
      <div class="fcas-stat">
        <span class="fcas-stat-number">${remaining}</span>
        <span class="fcas-stat-label">Remaining</span>
      </div>
      <div class="fcas-stat">
        <span class="fcas-stat-number">${pct}%</span>
        <span class="fcas-stat-label">Complete</span>
      </div>
    </div>

    <div class="fcas-progress-container reveal">
      <div class="fcas-progress-header">
        <span>Journey to FCAS</span>
        <span>${pct}%</span>
      </div>
      <div class="fcas-progress-track">
        <div class="fcas-progress-fill" id="fcas-bar"></div>
      </div>
    </div>

    <div class="fcas-timeline-wrapper reveal">
      <div class="fcas-track-bg">
        <div class="fcas-track-fill"></div>
      </div>
      <div class="fcas-nodes">
        ${MILESTONES.map(renderNode).join("")}
      </div>
    </div>

    <div class="fcas-detail-panel" id="fcas-detail"></div>`;

  setTimeout(() => {
    const bar = document.getElementById("fcas-bar");
    if (bar) bar.style.width = pct + "%";
  }, 600);

  requestAnimationFrame(() => setTimeout(positionTrack, 120));
  initMilestoneClicks();
}

/* ═══════════════════════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initFCASRoadmap();
  tagAnimatables();
  initNavScroll();
  initScrollReveal();
  initTimeline();
  initBentoCards();
  initTiltCards();
});

window.addEventListener("resize", positionTrack, { passive: true });
