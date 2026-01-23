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
// 🎪 Infinite Logo Carousel with GSAP (Optimized)
// ========================================
function initCarousel() {
  const carousel = document.querySelector('.animate-infinite-scroll') as HTMLElement;
  if (!carousel) return;

  const logos = carousel.querySelectorAll('img');
  if (logos.length === 0) return;

  // Esperar imagens carregarem para calcular largura correta
  const initAnimation = () => {
    // Calcular largura do primeiro set de logos (metade)
    let totalWidth = 0;
    const halfLength = Math.ceil(logos.length / 2);

    for (let i = 0; i < halfLength; i++) {
      const logo = logos[i] as HTMLElement;
      totalWidth += logo.offsetWidth;
    }
    // Adicionar gaps (3rem = 48px por logo)
    totalWidth += halfLength * 48;

    if (totalWidth === 0) return;

    // Velocidade: pixels por segundo (mais consistente que duration)
    const pixelsPerSecond = isMobile ? 50 : 40;
    const duration = totalWidth / pixelsPerSecond;

    // Criar timeline para animação suave
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(carousel, {
      x: -totalWidth,
      duration: duration,
      ease: 'none',
      force3D: true,  // Força GPU acceleration
    });

    // Pausar no hover (apenas desktop)
    if (!isMobile) {
      carousel.addEventListener('mouseenter', () => {
        gsap.to(tl, { timeScale: 0, duration: 0.3 });
      });
      carousel.addEventListener('mouseleave', () => {
        gsap.to(tl, { timeScale: 1, duration: 0.3 });
      });
    }

    // Respeitar preferência de motion reduzida
    if (prefersReducedMotion) {
      tl.pause();
    }
  };

  // Aguardar todas as imagens carregarem
  let loadedCount = 0;
  const totalImages = logos.length;

  logos.forEach((img) => {
    if ((img as HTMLImageElement).complete) {
      loadedCount++;
      if (loadedCount === totalImages) initAnimation();
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === totalImages) initAnimation();
      });
      img.addEventListener('error', () => {
        loadedCount++;
        if (loadedCount === totalImages) initAnimation();
      });
    }
  });

  // Fallback se as imagens já estiverem carregadas
  if (loadedCount === totalImages) initAnimation();
}

// ========================================
// ✨ Scroll Reveal Animations (Optimized)
// ========================================
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // Animar apenas elementos principais, não todos os divs
  const sections = document.querySelectorAll('section:not(.hero-section)');

  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true  // Remove listener após executar
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true
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
