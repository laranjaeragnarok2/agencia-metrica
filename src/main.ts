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
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(section);
  });

  // Add reveal to cards
  const cards = document.querySelectorAll('.bg-\\[\\#111\\]');
  cards.forEach((card, index) => {
    card.classList.add('reveal-card');
    (card as HTMLElement).style.transitionDelay = `${index * 0.05}s`;
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

      // Header Logic (moved here for optimization)
      if (headerElement) {
        // Background blur
        if (scrolled > 50) {
          headerElement.classList.add('shadow-xl');
          (headerElement as HTMLElement).style.backdropFilter = 'blur(20px) saturate(180%)';
        } else {
          headerElement.classList.remove('shadow-xl');
          (headerElement as HTMLElement).style.backdropFilter = 'blur(12px)';
        }

        // Auto-hide
        if (scrolled > lastScroll && scrolled > 100) {
          (headerElement as HTMLElement).style.transform = 'translateY(-100%)';
        } else {
          (headerElement as HTMLElement).style.transform = 'translateY(0)';
        }

        // Safety reset
        (headerElement as HTMLElement).style.scale = '1';
      }
      lastScroll = scrolled;

      // Update Scroll Progress Bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPct = (winScroll / height) * 100;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) progressBar.style.width = `${scrolledPct}%`;

      // Parallax for background glows
      parallaxGlows.forEach((glow, index) => {
        if (!(glow as HTMLElement).closest('header')) {
          const speed = 0.3 + (index * 0.05);
          const scale = 1 + (scrolled * 0.0002);
          (glow as HTMLElement).style.transform = `translateY(${scrolled * speed * 0.08}px) scale(${scale})`;
        }
      });

      // Parallax for hero section
      if (heroSection && scrolled < window.innerHeight) {
        (heroSection as HTMLElement).style.transform = `translateY(${scrolled * 0.4}px)`;
        (heroSection as HTMLElement).style.opacity = `${Math.max(0, 1 - scrolled / 800)}`;
      }

      // Parallax for images
      parallaxImages.forEach((img) => {
        const htmlImg = img as HTMLElement;
        const rect = htmlImg.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          const scrollPosition = rect.top / window.innerHeight;
          const movement = (scrollPosition - 0.5) * 20;
          htmlImg.style.transform = `translateY(${movement}px)`;
        }
      });

      // Parallax for cards
      parallaxCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          const scrollPosition = rect.top / window.innerHeight;
          const direction = index % 2 === 0 ? 1 : -1;
          const movement = (scrollPosition - 0.5) * 10 * direction;
          (card as HTMLElement).style.transform = `translateY(${movement}px)`;
        }
      });

      ticking = false;
    });

    ticking = true;
  }
});

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
if (window.innerWidth > 768) {
  const createTrail = (e: MouseEvent) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 800);
  };

  let throttle = false;
  document.addEventListener('mousemove', (e) => {
    if (!throttle) {
      createTrail(e);
      throttle = true;
      setTimeout(() => { throttle = false; }, 100);
    }
  });
}

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
import { EffectCoverflow, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

function initSwiperCarousel() {
  const swiperElement = document.querySelector('.mySwiper');
  if (!swiperElement) return;

  const swiper = new Swiper('.mySwiper', {
    modules: [EffectCoverflow, Autoplay, Navigation],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 3,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 2.5,
      slideShadows: false,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 800,
  });

  // Custom Navigation Buttons
  const btnPrev = document.getElementById('prev-3d');
  const btnNext = document.getElementById('next-3d');

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      swiper.slidePrev();
    });

    btnNext.addEventListener('click', () => {
      swiper.slideNext();
    });
  }
}

initSwiperCarousel();


