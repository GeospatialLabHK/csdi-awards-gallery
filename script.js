// Scroll reveal using IntersectionObserver (no libraries)
// reveal on enter + fade-out on exit (reverse scroll)

const items = document.querySelectorAll(".reveal");
const toTop = document.getElementById("toTop");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      } else {
        e.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  },
);

items.forEach((el) => io.observe(el));

// Go Top button after 100px
function onScroll() {
  if (window.scrollY > 100) toTop.classList.add("show");
  else toTop.classList.remove("show");
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====================== SHARP ANIMATED LIGHT GREY DIGITAL MAP BACKGROUND ======================
// FIXED: wrap-around movement so patterns NEVER disappear when scrolling down
function initDigitalMapBackground() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let points = [];
  let dpr = window.devicePixelRatio || 1;

  class Point {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.42;
      this.vy = (Math.random() - 0.5) * 0.52; // gentle vertical bias
      this.radius = Math.random() * 1.65 + 0.95;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around (infinite map) → patterns always visible when scrolling down
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);
    points = Array.from({ length: 58 }, () => new Point()); // more points for density
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Faint grid
    ctx.strokeStyle = "rgba(63, 81, 181, 0.085)";
    ctx.lineWidth = 1 / dpr;
    const step = 78;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Points + glow
    points.forEach((p) => {
      p.update();

      ctx.fillStyle = "#3f51b5";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(63, 81, 181, 0.18)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Very obvious connecting lines (as you liked)
    ctx.strokeStyle = "rgba(63, 81, 181, 0.28)";
    ctx.lineWidth = 1.4 / dpr;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 195 && dist > 8) {
          ctx.globalAlpha = ((195 - dist) / 195) * 0.92;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

window.addEventListener("load", initDigitalMapBackground);
