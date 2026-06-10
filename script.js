/* Toggles the hamburger mobile menu open/closed. */
function toggleMenu() {
  document.querySelector(".menu-links").classList.toggle("open");
  document.querySelector(".hamburger-icon").classList.toggle("open");
}

/* Adds a glass-blur class to the nav when the page has been scrolled. */
function initNavScroll() {
  const nav = document.getElementById("desktop-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });
}

/* Creates a soft radial glow that follows the mouse cursor. */
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.id = "cursor-glow";
  document.body.appendChild(glow);
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
  }, { passive: true });
}

/* Spawns floating ambient particles in the background. */
function initParticles() {
  const colors = ["rgba(10,132,255,0.5)", "rgba(191,90,242,0.4)", "rgba(48,209,88,0.4)", "rgba(255,255,255,0.25)"];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}vw;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${12 + Math.random() * 18}s;
      animation-delay:${Math.random() * 14}s;
    `;
    document.body.appendChild(p);
  }
}

/* Wires up IntersectionObserver to fade-in elements with class "reveal" as they enter the viewport. */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => obs.observe(el));
}

/* Applies a subtle 3-D tilt transform to elements with class "tilt-card" based on mouse position. */
function initTiltCards() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateZ(0)";
    });
  });
}

/* Renders the Chart.js FCAS exam progress line chart with glass-styled options. */
function initExamChart() {
  const canvas = document.getElementById("examProgressChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const exams      = ["FM","P","MAS-I","MAS-II","Exam 5","Exam 6","Exam 7","Exam 8","Exam 9","FCAS"];
  const completion = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  const total      = completion.length;
  const cumulative = completion.map((_, i) =>
    (completion.slice(0, i + 1).reduce((a, b) => a + b, 0) / total) * 100
  );

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0,   "rgba(10,132,255,0.9)");
  gradient.addColorStop(0.3, "rgba(191,90,242,0.85)");
  gradient.addColorStop(1,   "rgba(48,209,88,0.5)");

  const fillGrad = ctx.createLinearGradient(0, 0, 0, 340);
  fillGrad.addColorStop(0, "rgba(10,132,255,0.22)");
  fillGrad.addColorStop(1, "rgba(10,132,255,0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: exams,
      datasets: [{
        label: "Progress",
        data: cumulative,
        fill: true,
        borderColor: gradient,
        backgroundColor: fillGrad,
        borderWidth: 3,
        tension: 0.45,
        pointRadius: 6,
        pointHoverRadius: 9,
        pointBackgroundColor: "#0a84ff",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(15,15,28,0.88)",
          borderColor: "rgba(255,255,255,0.14)",
          borderWidth: 1,
          titleColor: "rgba(255,255,255,0.9)",
          bodyColor: "rgba(255,255,255,0.6)",
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.raw.toFixed(0)}% complete`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "rgba(255,255,255,0.55)", font: { family: "Inter", size: 12 } },
          border: { color: "rgba(255,255,255,0.1)" }
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: {
            color: "rgba(255,255,255,0.55)",
            font: { family: "Inter", size: 12 },
            callback: (v) => v + "%"
          },
          border: { color: "rgba(255,255,255,0.1)" }
        }
      },
      animation: { duration: 1800, easing: "easeOutQuart" }
    }
  });
}

/* Adds the "reveal" and "tilt-card" classes to the appropriate DOM elements before animations run. */
function tagRevealElements() {
  const selectors = [
    ".details-container",
    ".experience-item",
    ".project-card",
    ".contact-info-container",
    ".section__text",
    "#examProgressChart",
    ".section__pic-container",
    ".text-container",
  ];
  selectors.forEach((sel) =>
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"))
  );

  document.querySelectorAll(".details-container, .experience-item, .project-card")
    .forEach((el) => el.classList.add("tilt-card"));
}

/* Wraps project detail divs in a unified .project-card element for consistent styling. */
function upgradeProjectCards() {
  document.querySelectorAll("#projects .details-container").forEach((el) => {
    el.classList.add("project-card");
    const h2 = el.querySelector(".experience-sub-title");
    if (h2) h2.classList.add("project-title-text");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  upgradeProjectCards();
  tagRevealElements();
  initNavScroll();
  initCursorGlow();
  initParticles();
  initScrollReveal();
  initTiltCards();
  initExamChart();
});
