// ===== Theme Toggle =====
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setupThemeToggle() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const htmlEl = document.documentElement;

  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    htmlEl.classList.remove('dark-mode');
  } else {
    // Use system preference
    if (prefersDarkScheme.matches) {
      htmlEl.classList.add('dark-mode');
    }
  }

  // Theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'btn--secondary theme-toggle';
  themeToggle.type = 'button';
  themeToggle.ariaLabel = 'Toggle theme';
  themeToggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M20.9 14.3L19.5 15l-5-5L7.51 9.9 3.1 5.2L2 7.06l4.9-4.6a1.23 1.23 0 0 1 1.85 0L20.9 14.3z"/><path d="M6 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-1.9 2-2 2zm0 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-1.9 2-2 2z"/><path d="M2 21.9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-1.9 2-2 2zM7.5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-1.9 2-2 2s-1 2-1.5 2zm12.5 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-1.9 2-2 2s-1 2-1.5 2z"/></svg>';
  themeToggle.addEventListener('click', () => {
    htmlEl.classList.toggle('dark-mode');
    const isDark = htmlEl.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Insert theme toggle after the navbar
  const navbarInner = document.querySelector('.navbar__inner');
  if (navbarInner) {
    navbarInner.insertBefore(themeToggle, navbarInner.firstElementChild.nextElementSibling);
  }
}

// ===== Mobile Navigation =====
function setupMobileNav() {
  const mobileNavBtn = document.querySelector('.mobile-nav__btn');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileNav = document.querySelector('.mobile-nav');
  const navbarLinks = document.querySelectorAll('.navbar__link');

  if (!mobileNavBtn || !mobileNavClose || !mobileNav) return;

  mobileNavBtn.addEventListener('click', () => {
    mobileNav.classList.add('mobile-nav__open');
    document.body.style.overflow = 'hidden';
  });

  mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('mobile-nav__open');
    document.body.style.overflow = '';
  });

  // Close menu when clicking a link
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('mobile-nav__open');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-nav__btn')) {
      mobileNav.classList.remove('mobile-nav__open');
      document.body.style.overflow = '';
    }
  });
}

// ===== Smooth Scroll for Anchor Links =====
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== Active Navigation Link Highlight on Scroll =====
function setupActiveNavLinks() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar__link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  // Initial check
  updateActiveNav();
}

// ===== Reveal-on-Scroll Animations =====
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
}

// ===== Reduced Motion Support =====
function setupReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
  }
}

// Initialize all functionality on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupMobileNav();
  setupSmoothScroll();
  setupActiveNavLinks();
  setupScrollReveal();
  setupReducedMotion();
});