import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "stagger";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * Hook for GSAP scroll-triggered animations
 */
export const useGSAPReveal = <T extends HTMLElement>(
  options: UseGSAPOptions = {}
) => {
  const ref = useRef<T>(null);
  const {
    animation = "fadeUp",
    duration = 0.8,
    delay = 0,
    staggerDelay = 0.1,
    threshold = 0.2,
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state based on animation type
    const initialState: gsap.TweenVars = { opacity: 0 };
    const animateState: gsap.TweenVars = { opacity: 1, duration, delay, ease: "power2.out" };

    switch (animation) {
      case "fadeUp":
        initialState.y = 50;
        animateState.y = 0;
        break;
      case "slideLeft":
        initialState.x = -100;
        animateState.x = 0;
        break;
      case "slideRight":
        initialState.x = 100;
        animateState.x = 0;
        break;
      case "scale":
        initialState.scale = 0.8;
        animateState.scale = 1;
        break;
      case "stagger":
        // For stagger, we animate children
        const children = element.children;
        if (children.length > 0) {
          gsap.set(children, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: element,
            start: `top ${100 - threshold * 100}%`,
            once,
            onEnter: () => {
              gsap.to(children, {
                opacity: 1,
                y: 0,
                duration,
                stagger: staggerDelay,
                ease: "power2.out",
              });
            },
          });
        }
        return;
      case "fadeIn":
      default:
        break;
    }

    gsap.set(element, initialState);

    ScrollTrigger.create({
      trigger: element,
      start: `top ${100 - threshold * 100}%`,
      once,
      onEnter: () => {
        gsap.to(element, animateState);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, duration, delay, staggerDelay, threshold, once]);

  return ref;
};

/**
 * Hook for hero entrance animations
 */
export const useHeroAnimation = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate hero elements with stagger
    const heroElements = element.querySelectorAll("[data-hero-animate]");
    
    tl.set(heroElements, { opacity: 0, y: 60 });
    tl.to(heroElements, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
};

/**
 * Hook for smooth scroll to element
 */
export const useSmoothScroll = () => {
  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;
    
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + offset;
      gsap.to(window, {
        scrollTo: { y, autoKill: true },
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return { scrollTo, scrollToTop };
};

/**
 * Hook for parallax effect
 */
export const useParallax = <T extends HTMLElement>(speed = 0.5) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element.parentElement) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
};

export { gsap, ScrollTrigger };
