import './style.css'

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('bg-dark/90');
    } else {
      header.classList.remove('bg-dark/90');
    }
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
