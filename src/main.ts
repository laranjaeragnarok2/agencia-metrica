import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ========================================
// 🎯 Configuration
// ========================================
const isMobile = window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// GSAP defaults
gsap.config({ force3D: true });

// ========================================
// 🎬 Hero Animation
// ========================================
function initHero() {
  if (prefersReducedMotion) return;

  // Animar elementos do hero em sequência
  const tl = gsap.timeline({ delay: 0.2 });

  // Badge
  const badge = document.querySelector('.hero-section .inline-flex');
  if (badge) {
    gsap.set(badge, { opacity: 0, y: 20 });
    tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }

  // Título
  const title = document.querySelector('.hero-section h1');
  if (title) {
    gsap.set(title, { opacity: 0, y: 40 });
    tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');
  }

  // Parágrafo
  const paragraph = document.querySelector('.hero-section p.text-gray');
  if (paragraph) {
    gsap.set(paragraph, { opacity: 0, y: 30 });
    tl.to(paragraph, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  }

  // Botão
  const button = document.querySelector('.hero-section a.bg-primary');
  if (button) {
    gsap.set(button, { opacity: 0, scale: 0.9 });
    tl.to(button, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2');
  }

  // Card do hero
  const heroCard = document.querySelector('.hero-section .hidden.sm\\:flex');
  if (heroCard) {
    gsap.set(heroCard, { opacity: 0, x: 50 });
    tl.to(heroCard, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
  }

  // Scroll indicator
  const scrollIndicator = document.querySelector('a[href="#clientes"]');
  if (scrollIndicator) {
    gsap.set(scrollIndicator, { opacity: 0 });
    tl.to(scrollIndicator, { opacity: 1, duration: 0.5 }, '-=0.3');

    // Flutuação suave do container inteiro
    gsap.to(scrollIndicator, {
      y: 8,
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1
    });

    // Animar a bolinha interna descendo
    const scrollDot = scrollIndicator.querySelector('div > div');
    if (scrollDot) {
      gsap.to(scrollDot, {
        y: 20,
        opacity: 0,
        duration: 1.5,
        ease: 'power1.in',
        repeat: -1,
        repeatDelay: 0.5,
        delay: 1.5
      });
    }
  }
}

// ========================================
// 🎪 Carousel
// ========================================
function initCarousel() {
  const carousel = document.querySelector('.animate-infinite-scroll') as HTMLElement;
  if (!carousel) return;

  const images = carousel.querySelectorAll('img');
  if (images.length === 0) return;

  // Aguardar imagens
  let loadedCount = 0;
  const checkStart = () => {
    loadedCount++;
    if (loadedCount >= images.length) {
      startCarousel();
    }
  };

  images.forEach(img => {
    if ((img as HTMLImageElement).complete) {
      checkStart();
    } else {
      img.addEventListener('load', checkStart);
      img.addEventListener('error', checkStart);
    }
  });

  function startCarousel() {
    // Calcular largura
    let width = 0;
    const half = Math.ceil(images.length / 2);
    for (let i = 0; i < half; i++) {
      width += images[i].offsetWidth + 48;
    }

    if (width <= 100) width = 1500; // fallback

    const duration = width / (isMobile ? 40 : 30);

    // Animação infinita
    gsap.to(carousel, {
      x: -width,
      duration: duration,
      ease: 'none',
      repeat: -1
    });
  }
}

// ========================================
// 📦 Cards Animation
// ========================================
function initCards() {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('.bg-\\[\\#111\\]');

  cards.forEach((card, index) => {
    // Scroll animation
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: (index % 3) * 0.1,
      ease: 'power2.out'
    });

    // Hover effect (desktop only)
    if (!isMobile) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(16, 69, 217, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });
}

// ========================================
// ✨ Section Animations
// ========================================
function initSections() {
  if (prefersReducedMotion) return;

  // Todos os títulos h2
  document.querySelectorAll('section h2').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
  });

  // Subtítulos
  document.querySelectorAll('section h2 + p').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out'
    });
  });

  // Badges
  document.querySelectorAll('section .inline-flex').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.5)'
    });
  });

  // Grid items com stagger
  document.querySelectorAll('.grid').forEach(grid => {
    const items = grid.children;
    if (items.length === 0) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  });

  // Ícones com pop
  document.querySelectorAll('.bg-primary\\/10, .bg-red-500\\/10').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%'
      },
      scale: 0,
      rotation: -90,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(2)'
    });
  });

  // Listas
  document.querySelectorAll('ul').forEach(list => {
    const items = list.querySelectorAll('li');
    if (items.length === 0) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: list,
        start: 'top 85%'
      },
      x: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out'
    });
  });

  // Imagens
  document.querySelectorAll('section:not(.hero-section) img:not(.animate-infinite-scroll img)').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Botões CTA
  document.querySelectorAll('section:not(.hero-section) a.bg-primary').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 90%'
      },
      y: 20,
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}

// ========================================
// 🔢 Counters
// ========================================
function initCounters() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.text-3xl, .text-5xl, .text-7xl, .text-8xl').forEach(el => {
    const text = el.textContent || '';
    const match = text.match(/\d+/);
    if (!match) return;

    const number = parseInt(match[0]);
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const suffix = hasPlus ? '+' : hasPercent ? '%' : '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: number,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });
}

// ========================================
// 🔝 Header
// ========================================
function initHeader() {
  const header = document.querySelector('header') as HTMLElement;
  const progress = document.getElementById('scroll-progress');
  if (!header) return;

  let lastY = 0;
  let hidden = false;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Background
    if (y > 50) {
      header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    } else {
      header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
    }

    // Hide/show
    if (!isMobile && y > 100) {
      if (y > lastY + 10 && !hidden) {
        gsap.to(header, { y: '-100%', duration: 0.3 });
        hidden = true;
      } else if (y < lastY - 10 && hidden) {
        gsap.to(header, { y: '0%', duration: 0.3 });
        hidden = false;
      }
    } else if (hidden) {
      gsap.to(header, { y: '0%', duration: 0.3 });
      hidden = false;
    }

    // Progress bar
    if (progress) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = (y / scrollHeight) * 100;
      progress.style.width = `${progressPercent}%`;
    }

    lastY = y;
  }, { passive: true });
}

// ========================================
// 🔗 Smooth Scroll & Back to Top
// ========================================
function initSmoothScroll() {
  const backToTop = document.getElementById('back-to-top');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: y, autoKill: true },
          ease: 'power4.inOut'
        });
      }
    });
  });

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('translate-y-24', 'opacity-0');
        backToTop.classList.add('translate-y-0', 'opacity-100');
      } else {
        backToTop.classList.add('translate-y-24', 'opacity-0');
        backToTop.classList.remove('translate-y-0', 'opacity-100');
      }
    });

    backToTop.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: 0, autoKill: true },
        ease: 'power4.inOut'
      });
    });
  }
}

// ========================================
// 🖱️ Button Effects
// ========================================
function initButtons() {
  if (isMobile || prefersReducedMotion) return;

  document.querySelectorAll('.bg-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.2 });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.2 });
    });
  });
}

// ========================================
// 📱 Mobile Menu
// ========================================
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', e => {
    e.stopPropagation();

    if (menu.classList.contains('menu-active')) {
      // Close
      toggle.classList.remove('menu-open');
      document.body.classList.remove('overflow-hidden');
      gsap.to(menu, {
        y: '-100%',
        duration: 0.3,
        onComplete: () => {
          menu.style.display = 'none';
          menu.classList.remove('menu-active');
        }
      });
    } else {
      // Open
      menu.style.display = 'flex';
      toggle.classList.add('menu-open');
      menu.classList.add('menu-active');
      document.body.classList.add('overflow-hidden');
      gsap.fromTo(menu, { y: '-100%' }, { y: '0%', duration: 0.3 });
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle?.click();
    });
  });
}

// ========================================
// 🚀 Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initCarousel();
  initCards();
  initSections();
  initCounters();
  initHeader();
  initSmoothScroll();
  initButtons();
  initMobileMenu();

  console.log('✨ Animations initialized');
});

// Resize handler
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
