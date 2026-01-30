import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from '@studio-freight/lenis'

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
    gsap.to(".reveal-line", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top 80%",
        }
    });
}

// ========================================
// 🚀 Execute All
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMagnetic();
    initTextReveal();
});
