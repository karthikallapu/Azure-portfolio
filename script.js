// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

// Animated counters in hero stats
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
  statNumbers.forEach((num) => {
    const target = +num.getAttribute("data-target");
    const duration = 1500; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      num.textContent = value;

      if (progress < 1) requestAnimationFrame(update);
      else num.textContent = target; // ensure final value
    }

    requestAnimationFrame(update);
  });
}

function checkStatsInView() {
  const heroSection = document.getElementById("home");
  const rect = heroSection.getBoundingClientRect();

  if (!statsAnimated && rect.top < window.innerHeight - 120) {
    animateStats();
    statsAnimated = true;
  }
}

window.addEventListener("scroll", checkStatsInView);
window.addEventListener("load", checkStatsInView);

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
