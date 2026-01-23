import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar plugin
gsap.registerPlugin(ScrollTrigger)

// ========================================
// 🚀 Configuration
// ========================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || window.innerWidth < 768;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// 🎨 Hero Entrance Animation
// ========================================
function initHeroAnimation() {
  if (prefersReducedMotion) return;

  const heroContent = document.querySelector('.hero-section');
  if (!heroContent) return;

  // Timeline para entrada do hero
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Fade in do body
  tl.from('body', { opacity: 0, duration: 0.3 });

  // Badge animado
  tl.from('.hero-section span:first-child', {
    y: -20,
    opacity: 0,
    duration: 0.6,
    scale: 0.8
  }, 0.2);

  // Título com efeito de reveal
  tl.from('.hero-section h1', {
    y: 50,
    opacity: 0,
    duration: 0.8,
  }, 0.3);

  // Parágrafo
  tl.from('.hero-section p', {
    y: 30,
    opacity: 0,
    duration: 0.6,
  }, 0.5);

  // Botão com bounce
  tl.from('.hero-section a.bg-primary', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)'
  }, 0.6);

  // Card do lado direito
  tl.from('.hero-section .bg-\\[\\#111\\]', {
    x: 100,
    opacity: 0,
    rotation: 10,
    duration: 0.8,
    ease: 'power2.out'
  }, 0.4);
}

// ========================================
// 🖱️ Scroll Indicator Animation
// ========================================
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('a[href="#clientes"]');
  if (!scrollIndicator || prefersReducedMotion) return;

  // Animação flutuante infinita
  gsap.to(scrollIndicator, {
    y: 10,
    duration: 1.5,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true
  });

  // Pulso no círculo
  const circle = scrollIndicator.querySelector('div');
  if (circle) {
    gsap.to(circle, {
      scale: 1.1,
      opacity: 0.8,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  // Esconder ao scrollar
  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      const opacity = 1 - (self.scroll() / 300);
      gsap.to(scrollIndicator, {
        opacity: Math.max(0, opacity),
        duration: 0.2
      });
    }
  });
}

// ========================================
// 🎪 Infinite Logo Carousel
// ========================================
function initCarousel() {
  const carousel = document.querySelector('.animate-infinite-scroll') as HTMLElement;
  if (!carousel) return;

  const logos = carousel.querySelectorAll('img');
  if (logos.length === 0) return;

  const startAnimation = () => {
    // Calcular largura do primeiro set de logos
    let totalWidth = 0;
    const halfLength = Math.ceil(logos.length / 2);

    for (let i = 0; i < halfLength; i++) {
      const logo = logos[i] as HTMLElement;
      const style = getComputedStyle(carousel);
      const gap = parseFloat(style.gap) || 48;
      totalWidth += logo.offsetWidth + gap;
    }

    if (totalWidth <= 0) {
      // Fallback se não conseguir calcular
      totalWidth = halfLength * 150;
    }

    // Velocidade em pixels por segundo
    const speed = isMobile ? 40 : 30;
    const duration = totalWidth / speed;

    // Animação infinita suave
    gsap.to(carousel, {
      x: -totalWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
      force3D: true
    });

    // Hover pause/resume (desktop only)
    if (!isMobile) {
      carousel.addEventListener('mouseenter', () => {
        gsap.to(carousel, { timeScale: 0, duration: 0.5 });
      });
      carousel.addEventListener('mouseleave', () => {
        gsap.to(carousel, { timeScale: 1, duration: 0.5 });
      });
    }
  };

  // Aguardar imagens carregarem
  let loaded = 0;
  logos.forEach(img => {
    if ((img as HTMLImageElement).complete) {
      loaded++;
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === logos.length) startAnimation();
      });
    }
  });

  // Se todas já carregaram
  if (loaded === logos.length) {
    setTimeout(startAnimation, 100);
  }
}

// ========================================
// ✨ Card Animations (Fun & Interactive)
// ========================================
function initCardAnimations() {
  if (prefersReducedMotion) return;

  // Selecionar todos os cards
  const cards = document.querySelectorAll('.bg-\\[\\#111\\]');

  cards.forEach((card, index) => {
    const direction = index % 2 === 0 ? -1 : 1;

    // Animação de entrada com ScrollTrigger
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: 50 * direction,
      y: 30,
      opacity: 0,
      rotation: 3 * direction,
      scale: 0.95,
      duration: 0.7,
      ease: 'back.out(1.2)',
      delay: (index % 3) * 0.1
    });

    // Hover effect (desktop only)
    if (!isMobile) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          boxShadow: '0 20px 40px rgba(16, 69, 217, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });
}

// ========================================
// 🎯 Section Reveal Animations
// ========================================
function initSectionAnimations() {
  if (prefersReducedMotion) return;

  // Animação para títulos de seções
  const sectionTitles = document.querySelectorAll('section h2');
  sectionTitles.forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Animação para badges/tags
  const badges = document.querySelectorAll('section span.inline-flex');
  badges.forEach(badge => {
    gsap.from(badge, {
      scrollTrigger: {
        trigger: badge,
        start: 'top 85%'
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(2)'
    });
  });

  // Animação para grid items com stagger
  const grids = document.querySelectorAll('.grid');
  grids.forEach(grid => {
    const items = grid.children;
    gsap.from(items, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    });
  });

  // Animação para ícones
  const icons = document.querySelectorAll('.bg-primary\\/10, .bg-red-500\\/10');
  icons.forEach(icon => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%'
      },
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.5)'
    });
  });
}

// ========================================
// 🔢 Counter Animation
// ========================================
function initCounters() {
  const counters = document.querySelectorAll('.text-3xl, .text-5xl, .text-7xl, .text-8xl');

  counters.forEach(counter => {
    const text = counter.textContent || '';
    if (!text.match(/\d+/)) return;

    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = hasPlus ? '+' : hasPercent ? '%' : '';

    if (!number) return;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: number,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });
}

// ========================================
// 📜 Header Scroll Effects
// ========================================
function initHeaderEffects() {
  const header = document.querySelector('header') as HTMLElement;
  const progressBar = document.getElementById('scroll-progress');

  if (!header) return;

  let lastScroll = 0;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const scrolled = self.scroll();

      // Background opacity
      if (scrolled > 50) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
      } else {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
      }

      // Hide/Show header on scroll
      if (!isMobile && scrolled > 150) {
        if (scrolled > lastScroll + 10) {
          gsap.to(header, { y: '-100%', duration: 0.3 });
        } else if (scrolled < lastScroll - 10) {
          gsap.to(header, { y: '0%', duration: 0.3 });
        }
      } else {
        gsap.to(header, { y: '0%', duration: 0.3 });
      }

      // Progress bar
      if (progressBar) {
        progressBar.style.width = `${self.progress * 100}%`;
      }

      lastScroll = scrolled;
    }
  });
}

// ========================================
// 🔗 Smooth Scroll
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

// ========================================
// 🖱️ Button Magnetic Effect
// ========================================
function initButtonEffects() {
  if (isMobile || prefersReducedMotion) return;

  const buttons = document.querySelectorAll('.bg-primary');

  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = ((e as MouseEvent).clientX - rect.left - rect.width / 2) * 0.1;
      const y = ((e as MouseEvent).clientY - rect.top - rect.height / 2) * 0.1;

      gsap.to(button, { x, y, duration: 0.3, ease: 'power2.out' });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

// ========================================
// 📱 Mobile Menu
// ========================================
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuToggle || !mobileMenu) return;

  const closeMenu = () => {
    menuToggle.classList.remove('menu-open');
    gsap.to(mobileMenu, {
      y: '-100%',
      duration: 0.3,
      onComplete: () => {
        mobileMenu.style.display = 'none';
        mobileMenu.classList.remove('menu-active');
      }
    });
    document.body.classList.remove('overflow-hidden');
  };

  const openMenu = () => {
    mobileMenu.style.display = 'flex';
    menuToggle.classList.add('menu-open');
    mobileMenu.classList.add('menu-active');
    document.body.classList.add('overflow-hidden');
    gsap.fromTo(mobileMenu, { y: '-100%' }, { y: '0%', duration: 0.3 });
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains('menu-active') ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ========================================
// 🚀 Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Animações principais
  initHeroAnimation();
  initScrollIndicator();
  initCarousel();
  initCardAnimations();
  initSectionAnimations();
  initCounters();

  // Funcionalidades
  initHeaderEffects();
  initSmoothScroll();
  initButtonEffects();
  initMobileMenu();
});

// Refresh ScrollTrigger no resize
let resizeTimer: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
});
