import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ========================================
// 🎯 Configuration
// ========================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || window.innerWidth < 768;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Configurações globais do GSAP para animações profissionais
gsap.config({ force3D: true });
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8
});

// ========================================
// � Hero Section - Entrada Cinematográfica
// ========================================
function initHeroAnimation() {
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' }
  });

  // Badge - slide suave
  tl.from('.hero-section span.inline-flex', {
    y: 20,
    opacity: 0,
    duration: 0.6
  }, 0.1);

  // Título H1 - reveal elegante
  tl.from('.hero-section h1', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  }, 0.2);

  // Parágrafo
  tl.from('.hero-section p.text-gray', {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, 0.4);

  // Botão CTA - entrada com presença
  tl.from('.hero-section a.bg-primary', {
    y: 20,
    opacity: 0,
    scale: 0.95,
    duration: 0.6
  }, 0.5);

  // Card showcase - slide elegante
  tl.from('.hero-section > div > div:last-child', {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, 0.3);

  // Scroll indicator - aparece por último
  tl.from('a[href="#clientes"]', {
    y: -20,
    opacity: 0,
    duration: 0.6
  }, 0.8);
}

// ========================================
// 🖱️ Scroll Indicator - Animação Fluida
// ========================================
function initScrollIndicator() {
  const indicator = document.querySelector('a[href="#clientes"]');
  if (!indicator || prefersReducedMotion) return;

  // Animação suave de flutuação
  gsap.to(indicator, {
    y: 8,
    duration: 1.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  // Fade out ao scrollar
  gsap.to(indicator, {
    scrollTrigger: {
      start: 50,
      end: 200,
      scrub: true
    },
    opacity: 0,
    y: 30
  });
}

// ========================================
// 🎪 Logo Carousel - Movimento Contínuo
// ========================================
function initCarousel() {
  const carousel = document.querySelector('.animate-infinite-scroll') as HTMLElement;
  if (!carousel) return;

  const logos = carousel.querySelectorAll('img');
  if (logos.length === 0) return;

  const start = () => {
    // Calcular largura do primeiro set
    let width = 0;
    const half = Math.ceil(logos.length / 2);

    for (let i = 0; i < half; i++) {
      width += (logos[i] as HTMLElement).offsetWidth;
    }
    width += half * 48; // gaps

    if (width <= 0) width = half * 150;

    const speed = isMobile ? 35 : 25; // pixels por segundo
    const duration = width / speed;

    // Animação infinita suave
    const animation = gsap.to(carousel, {
      x: -width,
      duration,
      ease: 'none',
      repeat: -1
    });

    // Pause suave no hover
    if (!isMobile) {
      carousel.addEventListener('mouseenter', () => gsap.to(animation, { timeScale: 0.3, duration: 0.5 }));
      carousel.addEventListener('mouseleave', () => gsap.to(animation, { timeScale: 1, duration: 0.5 }));
    }
  };

  // Aguardar carregamento das imagens
  Promise.all(
    Array.from(logos).map(img => {
      if ((img as HTMLImageElement).complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    })
  ).then(() => setTimeout(start, 50));
}

// ========================================
// 📦 Cards - Reveal Profissional
// ========================================
function initCardAnimations() {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('.bg-\\[\\#111\\]');

  // Animação de entrada
  cards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: (i % 3) * 0.1,
      ease: 'power3.out'
    });
  });

  // Hover profissional (desktop)
  if (!isMobile) {
    cards.forEach(card => {
      const el = card as HTMLElement;

      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: -4,
          scale: 1.01,
          boxShadow: '0 20px 50px -12px rgba(16, 69, 217, 0.25)',
          borderColor: 'rgba(16, 69, 217, 0.3)',
          duration: 0.35,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y: 0,
          scale: 1,
          boxShadow: 'none',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          duration: 0.35,
          ease: 'power2.out'
        });
      });
    });
  }
}

// ========================================
// ✨ Section Elements - Staggered Reveal
// ========================================
function initSectionAnimations() {
  if (prefersReducedMotion) return;

  // Títulos de seção (h2)
  gsap.utils.toArray('section:not(.hero-section) h2').forEach((el: any) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power4.out'
    });
  });

  // Subtítulos (p após h2)
  gsap.utils.toArray('section:not(.hero-section) h2 + p').forEach((el: any) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.1
    });
  });

  // Badges
  gsap.utils.toArray('section span.inline-flex').forEach((el: any) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      y: 15,
      opacity: 0,
      scale: 0.9,
      duration: 0.5
    });
  });

  // Grids com stagger
  gsap.utils.toArray('.grid').forEach((grid: any) => {
    const items = grid.querySelectorAll(':scope > *');
    if (items.length === 0) return;

    gsap.from(items, {
      scrollTrigger: { trigger: grid, start: 'top 82%' },
      y: 35,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out'
    });
  });

  // Ícones em containers
  gsap.utils.toArray('.bg-primary\\/10, .bg-red-500\\/10').forEach((el: any) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.5)'
    });
  });

  // Listas (ul/li)
  gsap.utils.toArray('ul.space-y-3').forEach((list: any) => {
    const items = list.querySelectorAll('li');
    gsap.from(items, {
      scrollTrigger: { trigger: list, start: 'top 85%' },
      x: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08
    });
  });

  // Imagens em seções
  gsap.utils.toArray('section:not(.hero-section) img').forEach((el: any) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      scale: 0.95,
      opacity: 0,
      duration: 0.7
    });
  });

  // Botões CTA em seções
  gsap.utils.toArray('section:not(.hero-section) a.bg-primary').forEach((el: any) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.5
    });
  });
}

// ========================================
// 🔢 Counter Animation
// ========================================
function initCounters() {
  if (prefersReducedMotion) return;

  const counters = document.querySelectorAll('.text-3xl, .text-5xl, .text-7xl, .text-8xl');

  counters.forEach(counter => {
    const text = counter.textContent || '';
    if (!text.match(/\d+/)) return;

    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.includes('+') ? '+' : text.includes('%') ? '%' : '';

    if (!number) return;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(counter,
          { textContent: '0' },
          {
            textContent: number,
            duration: 1.8,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function () {
              counter.textContent = Math.round(parseFloat(this.targets()[0].textContent)) + suffix;
            }
          }
        );
      }
    });
  });
}

// ========================================
// � Header - Smart Hide/Show
// ========================================
function initHeader() {
  const header = document.querySelector('header') as HTMLElement;
  const progressBar = document.getElementById('scroll-progress');
  if (!header) return;

  let lastY = 0;
  let hidden = false;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();

      // Background
      header.style.backgroundColor = y > 50
        ? 'rgba(10, 10, 10, 0.95)'
        : 'rgba(10, 10, 10, 0.8)';

      // Auto-hide
      if (!isMobile && y > 100) {
        const delta = y - lastY;
        if (delta > 8 && !hidden) {
          gsap.to(header, { y: '-100%', duration: 0.3, ease: 'power2.inOut' });
          hidden = true;
        } else if (delta < -8 && hidden) {
          gsap.to(header, { y: '0%', duration: 0.3, ease: 'power2.out' });
          hidden = false;
        }
      } else if (hidden) {
        gsap.to(header, { y: '0%', duration: 0.3 });
        hidden = false;
      }

      // Progress
      if (progressBar) {
        progressBar.style.width = `${self.progress * 100}%`;
      }

      lastY = y;
    }
  });
}

// ========================================
// 🔗 Smooth Scroll
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;

        gsap.to(window, {
          scrollTo: { y, autoKill: false },
          duration: 1,
          ease: 'power3.inOut'
        });
      }
    });
  });
}

// ========================================
// 🖱️ Button Effects
// ========================================
function initButtons() {
  if (isMobile || prefersReducedMotion) return;

  document.querySelectorAll('.bg-primary').forEach(btn => {
    const el = btn as HTMLElement;

    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.02, duration: 0.2 });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.3 });
    });

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
      gsap.to(el, { x, y, duration: 0.2 });
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

  const open = () => {
    menu.style.display = 'flex';
    toggle.classList.add('menu-open');
    menu.classList.add('menu-active');
    document.body.classList.add('overflow-hidden');
    gsap.fromTo(menu, { y: '-100%' }, { y: 0, duration: 0.4, ease: 'power3.out' });
  };

  const close = () => {
    toggle.classList.remove('menu-open');
    document.body.classList.remove('overflow-hidden');
    gsap.to(menu, {
      y: '-100%',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        menu.style.display = 'none';
        menu.classList.remove('menu-active');
      }
    });
  };

  toggle.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.contains('menu-active') ? close() : open();
  });

  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', close));
}

// ========================================
// 🎭 Parallax Effects (subtle)
// ========================================
function initParallax() {
  if (isMobile || prefersReducedMotion) return;

  // Glows background parallax
  gsap.utils.toArray('.blur-\\[100px\\], .blur-\\[120px\\], .blur-\\[150px\\]').forEach((el: any) => {
    gsap.to(el, {
      scrollTrigger: {
        scrub: 1
      },
      y: 50,
      ease: 'none'
    });
  });
}

// ========================================
// 🚀 Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {

  // Inicializar animações
  initHeroAnimation();
  initScrollIndicator();
  initCarousel();
  initCardAnimations();
  initSectionAnimations();
  initCounters();
  initHeader();
  initSmoothScroll();
  initButtons();
  initMobileMenu();
  initParallax();
});

// Resize handler
let resizeTimer: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
});
