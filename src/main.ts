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

// Header scroll effect with scale animation
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const currentScroll = window.scrollY;

  if (header) {
    // Background blur on scroll
    if (currentScroll > 50) {
      header.classList.add('shadow-xl');
    } else {
      header.classList.remove('shadow-xl');
    }

    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }

  lastScroll = currentScroll;
});

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
// 🎭 Parallax Effect
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  // Parallax for background glows
  const glows = document.querySelectorAll('[class*="blur-"]');
  glows.forEach((glow, index) => {
    const speed = 0.5 + (index * 0.1);
    (glow as HTMLElement).style.transform = `translateY(${scrolled * speed * 0.1}px)`;
  });

  // Parallax for hero section
  const hero = document.querySelector('.min-h-screen');
  if (hero && scrolled < window.innerHeight) {
    (hero as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
    (hero as HTMLElement).style.opacity = `${1 - scrolled / 1000}`;
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
// 📊 Counter Animation
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
// 🎯 Add smooth transitions to header
// ========================================
const header = document.querySelector('header');
if (header) {
  (header as HTMLElement).style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}
