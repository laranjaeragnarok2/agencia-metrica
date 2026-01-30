import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from '@studio-freight/lenis'
import Swiper from 'swiper'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ========================================
// 🚀 1. Lenis Smooth Scroll (O padrão de luxo)
// ========================================
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// ========================================
// 🧲 3. Advanced Magnetic Elements
// ========================================
function initMagnetic() {
    const magneticElements = document.querySelectorAll('.magnetic-effect');

    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e: any) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const x = (e.clientX - centerX) * 0.35;
            const y = (e.clientY - centerY) * 0.35;

            gsap.to(el, {
                x: x,
                y: y,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });
}

// ========================================
// 🎭 4. Cinematic Text Reveal
// ========================================
function initTextReveal() {
    const revealLines = document.querySelectorAll('.reveal-line');

    revealLines.forEach((line) => {
        gsap.to(line, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: line,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });
}

// ========================================
// 📊 5. Scroll Progress Bar
// ========================================
function initScrollProgress() {
    gsap.to("#scroll-progress", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });
}

// ========================================
// 🎪 6. 3D Swiper Carousel
// ========================================
function initSwiper() {
    new Swiper('.swiper-container', {
        modules: [EffectCoverflow, Pagination, Autoplay],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// ========================================
// 🚀 Execute All
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMagnetic();
    initTextReveal();
    initScrollProgress();
    initSwiper();
});
