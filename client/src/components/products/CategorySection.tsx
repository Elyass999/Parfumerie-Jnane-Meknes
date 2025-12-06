import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { selectProductsByCategory } from "@/store/productsSlice";
import { ProductCard } from "./ProductCard";
import { useDragScroll } from "@/hooks/useDragScroll";

gsap.registerPlugin(ScrollTrigger);

interface CategorySectionProps {
  category: Category;
  index: number;
}

export function CategorySection({ category, index }: CategorySectionProps) {
  const products = useSelector(selectProductsByCategory(category.id));
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useDragScroll(containerRef);

  // GSAP entrance animations (unchanged)
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
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

      const cards = element.querySelectorAll(".product-card");
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
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

  // Apply responsive inline padding so grid never hugs viewport edges
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const applyPadding = () => {
      const rect = el.getBoundingClientRect();
      // responsive padding: min 16px, otherwise 3.5% of container width (rounded)
      const pad = Math.max(16, Math.round(rect.width * 0.035));
      el.style.paddingLeft = `${pad}px`;
      el.style.paddingRight = `${pad}px`;
      el.style.boxSizing = "border-box";
    };
    applyPadding();
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyPadding);
    };
    window.addEventListener("resize", onResize);

    // re-run when images load (they can affect sizing)
    const imgs = Array.from(el.querySelectorAll("img"));
    let loaded = 0;
    if (imgs.length === 0) applyPadding();
    else {
      imgs.forEach((img) => {
        if ((img as HTMLImageElement).complete) loaded++;
        else img.addEventListener("load", () => {
          loaded++;
          if (loaded === imgs.length) applyPadding();
        }, { once: true });
      });
      if (loaded === imgs.length) applyPadding();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [products.length]);

  if (products.length === 0) return null;

  return (
<section
  ref={sectionRef}
  id={`category-${category.id}`}
  data-testid={`section-category-${category.id}`}
  className="mt-20"
>
      {/* Section Header */}
      <div className="section-header container mx-auto px-4 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-gray-800 dark:text-white"
              data-testid={`text-category-title-${category.id}`}
            >
              {category.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm md:text-base mt-1">
              {category.description}
            </p>
          </div>

          {/* Keep arrow markup (inert / optional) */}
          <div className="hidden md:flex items-center gap-2" role="group" aria-label={`${category.name} navigation`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}}
              aria-label="Scroll left"
              data-testid={`button-scroll-left-${category.id}`}
              aria-disabled={true}
              className="rounded-full h-10 w-10 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}}
              aria-label="Scroll right"
              data-testid={`button-scroll-right-${category.id}`}
              aria-disabled={true}
              className="rounded-full h-10 w-10 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid (no horizontal scroll) */}
      <div className="relative">
        <div
          ref={containerRef}
          className={`flex gap-4 md:gap-6 pb-4 px-4 md:px-[max(1rem,calc((100vw-1280px)/2+1rem))] scrollbar-hide ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{
            // Grid replaces the flex-wrap approach — we keep your classes untouched
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            overflowX: "visible",
            // remove any snap behavior that could interfere
            // @ts-ignore
            scrollSnapType: "none",
            touchAction: "auto",
            alignItems: "start",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card flex-shrink-0 w-[90%] min-[450px]:w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-1rem)] lg:w-[300px] snap-start transition-transform hover:scale-[1.01] duration-300"
              style={{
                // allow the card to size naturally inside the grid cell
                width: "100%",
                flexShrink: 0,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
