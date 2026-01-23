import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar plugin
gsap.registerPlugin(ScrollTrigger)

// ========================================
// 🚀 Performance Optimizations
// ========================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || window.innerWidth < 768;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// 🎨 Initial Page Animation
// ========================================
if (!prefersReducedMotion) {
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
}

// ========================================
// 🎪 Infinite Logo Carousel with GSAP
// ========================================
function initCarousel() {
  const carousel = document.querySelector('.animate-infinite-scroll') as HTMLElement;
  if (!carousel) return;

  // Pegar todos os logos
  const logos = carousel.querySelectorAll('img');
  if (logos.length === 0) return;

  // Calcular largura total do primeiro set de logos
  let totalWidth = 0;
  logos.forEach((logo, index) => {
    if (index < logos.length / 2) {
      totalWidth += logo.offsetWidth + 48; // 48px = 3rem gap
    }
  });

  // Velocidade baseada no dispositivo
  const duration = isMobile ? 25 : 35;

  // Criar animação infinita com GSAP
  const tl = gsap.to(carousel, {
    x: -totalWidth,
    duration: duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
  });

  // Pausar no hover (apenas desktop)
  if (!isMobile) {
    carousel.addEventListener('mouseenter', () => tl.pause());
    carousel.addEventListener('mouseleave', () => tl.resume());
  }

  // Respeitar preferência de motion reduzida
  if (prefersReducedMotion) {
    tl.pause();
  }
}

// ========================================
// ✨ Scroll Reveal Animations
// ========================================
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // Animação de reveal para cards e seções
  const revealElements = document.querySelectorAll('section > div, .grid > div');

  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Animação especial para o Hero
  const heroContent = document.querySelector('.hero-section .text-center, .hero-section .lg\\:text-left');
  if (heroContent) {
    gsap.from(heroContent.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });
  }
}

// ========================================
// 📜 Header Scroll Effects
// ========================================
function initHeaderEffects() {
  const header = document.querySelector('header') as HTMLElement;
  const progressBar = document.getElementById('scroll-progress');

  if (!header) return;

  // Configurar transição inicial
  header.style.transition = 'background-color 0.2s ease, transform 0.3s ease';

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

      // Hide/Show header on desktop
      if (!isMobile && scrolled > 150) {
        if (scrolled > lastScroll + 15) {
          gsap.to(header, { y: '-100%', duration: 0.3, ease: 'power2.out' });
        } else if (scrolled < lastScroll - 15) {
          gsap.to(header, { y: '0%', duration: 0.3, ease: 'power2.out' });
        }
      } else {
        gsap.to(header, { y: '0%', duration: 0.3, ease: 'power2.out' });
      }

      // Progress bar
      if (progressBar) {
        const progress = self.progress * 100;
        progressBar.style.width = `${progress}%`;
      }

      lastScroll = scrolled;
    }
  });
}

// ========================================
// 🔗 Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
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
          window.scrollTo({
            top,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
  });
}

// ========================================
// ⏳ Counter Animation
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
        if (prefersReducedMotion) {
          counter.textContent = number + suffix;
          return;
        }

        gsap.from(counter, {
          textContent: 0,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            counter.textContent = Math.round(parseFloat(this.targets()[0].textContent)) + suffix;
          }
        });
      }
    });
  });
}

// ========================================
// 🖱️ Button Hover Effects (Desktop)
// ========================================
function initButtonEffects() {
  if (isMobile || prefersReducedMotion) return;

  const buttons = document.querySelectorAll('.bg-primary');

  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const mouseEvent = e as MouseEvent;
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = (mouseEvent.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (mouseEvent.clientY - rect.top - rect.height / 2) * 0.08;

      gsap.to(button, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ========================================
// 📱 Mobile Menu Logic
// ========================================
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuToggle || !mobileMenu) return;

  const closeMenu = () => {
    menuToggle.classList.remove('menu-open');
    gsap.to(mobileMenu, {
      y: '-100%',
      duration: 0.3,
      ease: 'power2.inOut',
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

    gsap.fromTo(mobileMenu,
      { y: '-100%' },
      { y: '0%', duration: 0.3, ease: 'power2.out' }
    );
  };

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
// 🚀 Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initScrollAnimations();
  initHeaderEffects();
  initSmoothScroll();
  initCounters();
  initButtonEffects();
  initMobileMenu();
});

// Recalcular no resize (debounced)
let resizeTimer: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
