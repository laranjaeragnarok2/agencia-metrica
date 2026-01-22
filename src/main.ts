import './style.css'

// ========================================
// 🚀 Performance Optimizations
// ========================================

// Detect mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || window.innerWidth < 768;

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// 🎨 Loading Animation (Optimized)
// ========================================
window.addEventListener('load', () => {
  if (!prefersReducedMotion) {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '1';
    });
  }
});

// ========================================
// 🔗 Smooth Scroll (Native)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLAnchorElement;
    const targetId = target.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 80;
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
  });
});

// ========================================
// ✨ Scroll Reveal (Optimized for Mobile)
// ========================================
const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '50px',
  threshold: 0.05 // Lower threshold = earlier trigger
};

const revealCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Stop observing once revealed for performance
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Only observe major sections, not every element
  const revealElements = document.querySelectorAll('section > div, .grid > div');
  revealElements.forEach((el, index) => {
    el.classList.add('reveal-card');
    // Minimal stagger for mobile
    if (!isMobile) {
      (el as HTMLElement).style.transitionDelay = `${Math.min(index * 0.03, 0.15)}s`;
    }
    observer.observe(el);
  });
});

// ========================================
// 📜 Scroll Effects (Heavily Optimized)
// ========================================
let ticking = false;
let lastScroll = 0;
const headerElement = document.querySelector('header') as HTMLElement | null;
const progressBar = document.getElementById('scroll-progress');

// Calculate these once
const docHeight = () => document.documentElement.scrollHeight - document.documentElement.clientHeight;

const handleScroll = () => {
  const scrolled = window.pageYOffset;

  // Header effects
  if (headerElement) {
    // Background opacity
    if (scrolled > 50) {
      headerElement.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    } else {
      headerElement.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
    }

    // Hide/Show header - only on desktop or if user scrolled significantly
    if (!isMobile && scrolled > 150) {
      const scrollDelta = scrolled - lastScroll;
      if (scrollDelta > 15) {
        headerElement.style.transform = 'translateY(-100%)';
      } else if (scrollDelta < -15) {
        headerElement.style.transform = 'translateY(0)';
      }
    } else {
      headerElement.style.transform = 'translateY(0)';
    }
  }

  // Progress bar - simple calculation
  if (progressBar) {
    const scrolledPct = (scrolled / docHeight()) * 100;
    progressBar.style.width = `${scrolledPct}%`;
  }

  lastScroll = scrolled;
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

// ========================================
// 🖱️ Button Effects (Desktop Only)
// ========================================
if (!isMobile && !prefersReducedMotion) {
  const buttons = document.querySelectorAll('.bg-primary');
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const mouseEvent = e as MouseEvent;
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = (mouseEvent.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (mouseEvent.clientY - rect.top - rect.height / 2) * 0.08;
      (button as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });

    button.addEventListener('mouseleave', () => {
      (button as HTMLElement).style.transform = 'translate(0, 0)';
    });
  });
}

// ========================================
// ⏳ Counter Animation (Optimized)
// ========================================
const animateCounter = (element: HTMLElement, target: number, suffix: string = '') => {
  if (prefersReducedMotion) {
    element.textContent = target + suffix;
    return;
  }

  const duration = 1000; // 1 second
  const startTime = performance.now();

  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + suffix;
    }
  };

  requestAnimationFrame(updateCounter);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const text = entry.target.textContent || '';
      const hasPlus = text.includes('+');
      const hasPercent = text.includes('%');
      const number = parseInt(text.replace(/\D/g, ''));

      if (number) {
        const suffix = hasPlus ? '+' : hasPercent ? '%' : '';
        animateCounter(entry.target as HTMLElement, number, suffix);
      }
      // Stop observing
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.text-3xl, .text-5xl, .text-7xl, .text-8xl').forEach(el => {
  if (el.textContent?.match(/\d+/)) {
    counterObserver.observe(el);
  }
});

// ========================================
// 📱 Mobile Menu Logic
// ========================================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const closeMenu = () => {
  if (menuToggle && mobileMenu) {
    menuToggle.classList.remove('menu-open');
    mobileMenu.classList.remove('menu-active');
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      if (!mobileMenu.classList.contains('menu-active')) {
        mobileMenu.style.display = 'none';
      }
    }, 300);
  }
};

const openMenu = () => {
  if (menuToggle && mobileMenu) {
    mobileMenu.style.display = 'flex';
    requestAnimationFrame(() => {
      menuToggle.classList.add('menu-open');
      mobileMenu.classList.add('menu-active');
      document.body.classList.add('overflow-hidden');
    });
  }
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains('menu-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('menu-active') &&
      !mobileMenu.contains(e.target as Node) &&
      !menuToggle.contains(e.target as Node)) {
      closeMenu();
    }
  });
}

// ========================================
// 🎯 Header Transitions Setup
// ========================================
if (headerElement) {
  headerElement.style.transition = 'background-color 0.2s ease, transform 0.3s ease';
}
