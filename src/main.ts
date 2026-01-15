import './style.css'

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Exit Intent Popup
let popupShown = false;
const popup = document.getElementById('exitPopup');
const closeBtn = document.getElementById('closePopup');

document.addEventListener('mouseleave', (e) => {
  if (e.clientY < 0 && !popupShown) {
    if (popup) {
      popup.style.display = 'flex';
      popupShown = true;
    }
  }
});

if (closeBtn && popup) {
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
}

// Stats Animation (Simple on view)
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-up');
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-item, .method-step, .service-card').forEach(el => {
  observer.observe(el);
});
