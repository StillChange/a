const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const yearElement = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navContainer = document.getElementById("nav-links");
const revealItems = document.querySelectorAll(".reveal");

navLinks.forEach((link) => {
  const target = link.getAttribute("href");

  if (target === currentPage) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navContainer) {
  navToggle.addEventListener("click", () => {
    const isOpen = navContainer.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
