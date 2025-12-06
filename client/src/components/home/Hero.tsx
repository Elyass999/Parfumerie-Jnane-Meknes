import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial states
      gsap.set("[data-hero-animate]", { opacity: 0, y: 60 });
      gsap.set(".hero-monogram", { scale: 0, rotation: -180 });

      // Animate monogram
      tl.to(".hero-monogram", {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Animate text elements
      tl.to(
        "[data-hero-animate]",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        "-=0.5"
      );

      // Animate scroll indicator
      tl.to(
        ".scroll-indicator",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      );

      // Continuous scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("categories-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background with gradient overlay */}
      <div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/Videos/Background_Video_Jnan.mp4"
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 text-center pt-20"
      >
        {/* Animated Monogram */}
        <div
          className="hero-monogram flex items-center justify-center mb-8"
          data-testid="hero-monogram"
        >
          <img
            src="/assets/logos/Main_Logo.jpg"
            alt="Logo"
            className="h-32 w-auto rounded-full shadow-2xl shadow-primary/30"
          />
        </div>

        {/* Tagline */}
        <p
          data-hero-animate
          className="text-sm md:text-base uppercase tracking-[0.3em] text-primary mb-4"
        >
          Parfumerie Jnane Meknes
        </p>

        {/* Main Heading */}
        <h1
          data-hero-animate
          className="font-serif text-4xl md:text-5xl lg:text-7xl font-semibold mb-6 leading-tight"
        >
          L'Art de la
          <span className="block text-primary">Parfumerie</span>
        </h1>

        {/* Subtitle */}
        <p
          data-hero-animate
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Découvrez notre collection exclusive de parfums et cosmétiques de luxe,
          sélectionnés avec passion pour sublimer votre beauté.
        </p>

        {/* CTA Buttons */}
        <div
          data-hero-animate
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/produits">
            <Button
              size="lg"
              className="min-w-[200px] text-base font-medium"
              data-testid="button-discover-products"
            >
              Découvrir nos parfums
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] text-base font-medium"
              data-testid="button-contact-us"
            >
              Nous contacter
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProducts}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Défiler vers le bas"
        data-testid="button-scroll-down"
      >
        <span className="text-sm">Découvrir</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
