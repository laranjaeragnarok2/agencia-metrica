import './style.css'

// ========================================
// 🎨 Eye Candies & Smooth Interactions
// ========================================

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Header scroll effect - Logic moved to optimized scroll listener
let lastScroll = 0;

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLAnchorElement;
    const targetId = target.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 100;
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

// ========================================
// ✨ Scroll Reveal Animations
// ========================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const revealCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

// Add reveal animation to sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Add reveal to cards
  const cards = document.querySelectorAll('.bg-\\[\\#111\\]');
  cards.forEach((card, index) => {
    card.classList.add('reveal-card');
    (card as HTMLElement).style.transitionDelay = `${Math.min(index * 0.03, 0.2)}s`;
    observer.observe(card);
  });
});

// ========================================
// 🎭 Enhanced Parallax Effects
// ========================================
let ticking = false;

// Cache elements for performance
const headerElement = document.querySelector('header');
const parallaxGlows = document.querySelectorAll('[class*="blur-"]');
const heroSection = document.querySelector('.min-h-screen');
const parallaxImages = document.querySelectorAll('img:not(#carousel-3d img)');
const parallaxCards = document.querySelectorAll('.bg-\\[\\#111\\]');

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;

      // Header Logic
      if (headerElement) {
        if (scrolled > 50) {
          headerElement.classList.add('shadow-xl');
          (headerElement as HTMLElement).style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
          headerElement.classList.remove('shadow-xl');
          (headerElement as HTMLElement).style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }

        // Hide/Show on scroll
        if (scrolled > lastScroll && scrolled > 100) {
          (headerElement as HTMLElement).style.transform = 'translateY(-100%)';
        } else {
          (headerElement as HTMLElement).style.transform = 'translateY(0)';
        }
      }
      lastScroll = scrolled;

      // Update Scroll Progress Bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPct = (winScroll / height) * 100;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) progressBar.style.width = `${scrolledPct}%`;

      // Simplified Parallax for hero only (most visible)
      if (heroSection && scrolled < window.innerHeight) {
        (heroSection as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
        (heroSection as HTMLElement).style.opacity = `${Math.max(0, 1 - scrolled / 600)}`;
      }

      ticking = false;
    });

    ticking = true;
  }
}, { passive: true });

// ========================================
// 🖱️ Magnetic Button Effect
// ========================================
const buttons = document.querySelectorAll('.bg-primary, .hover\\:bg-primary\\/90');
buttons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const mouseEvent = e as MouseEvent;
    const rect = (button as HTMLElement).getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left - rect.width / 2;
    const y = mouseEvent.clientY - rect.top - rect.height / 2;

    (button as HTMLElement).style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
  });

  button.addEventListener('mouseleave', () => {
    (button as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
  });
});

// ========================================
// ✨ Image Hover Zoom Effects
// ========================================
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

// ========================================
// 🌟 Cursor Trail Effect (Desktop only)
// ========================================
// Cursor trail removed for performance


// ========================================
// ⏳ Counter Animation
// ========================================
const animateCounter = (element: HTMLElement, target: number, suffix: string = '') => {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 30);
};

// Observe counters
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
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.text-3xl, .text-5xl, .text-7xl, .text-8xl').forEach(el => {
  if (el.textContent?.match(/\d+/)) {
    counterObserver.observe(el);
  }
});

// ========================================
// 🎯 Header Transitions
// ========================================
const header = document.querySelector('header');
if (header) {
  (header as HTMLElement).style.transition = 'backdrop-filter 0.3s ease, box-shadow 0.3s ease, transform 0.4s ease';
}

// ========================================
// 🏢 3D Carousel Logic (Optimized)
// ========================================
// ========================================
// 🏢 Swiper 3D Carousel Logic
// ========================================
import Swiper from 'swiper';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';

function initSwiperCarousel() {
  const swiperElement = document.querySelector('.mySwiper');
  if (!swiperElement) return;

  const swiper = new Swiper('.mySwiper', {
    modules: [EffectCoverflow, Autoplay, Navigation, Pagination],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,
    loop: true,
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    breakpoints: {
      320: {
        coverflowEffect: {
          rotate: 20,
          depth: 50,
        }
      },
      768: {
        coverflowEffect: {
          rotate: 30,
          depth: 100,
        }
      }
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    speed: 600,
  });

  // Custom Navigation Buttons
  const btnPrev = document.getElementById('prev-3d');
  const btnNext = document.getElementById('next-3d');

  if (btnPrev && btnNext) {
    btnPrev.onclick = () => swiper.slidePrev();
    btnNext.onclick = () => swiper.slideNext();
  }
}

initSwiperCarousel();


