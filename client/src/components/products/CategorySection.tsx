import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { selectProductsByCategory } from "@/store/productsSlice";
import { ProductCard } from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

interface CategorySectionProps {
  category: Category;
  index: number;
}

export function CategorySection({ category, index }: CategorySectionProps) {
  const products = useSelector(selectProductsByCategory(category.id));
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from(element.querySelector(".section-header"), {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          once: true,
        },
      });

      // Animate product cards with stagger
      const cards = element.querySelectorAll(".product-card");
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          once: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);

    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  if (products.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16"
      id={`category-${category.id}`}
      data-testid={`section-category-${category.id}`}
    >
      {/* Section Header */}
      <div className="section-header container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-2"
              data-testid={`text-category-title-${category.id}`}
            >
              {category.name}
            </h2>
            <p className="text-muted-foreground max-w-xl">
              {category.description}
            </p>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Défiler à gauche"
              data-testid={`button-scroll-left-${category.id}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Défiler à droite"
              data-testid={`button-scroll-right-${category.id}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 md:px-[max(1rem,calc((100vw-1280px)/2+1rem))] scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-1rem)] lg:w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
