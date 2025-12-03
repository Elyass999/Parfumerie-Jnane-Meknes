import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "products" | "store" | "atmosphere";
  aspectRatio?: "square" | "portrait" | "landscape";
}

const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/assets/gallery/parfum-collection.jpg",
    alt: "Collection de parfums de luxe",
    category: "products",
    aspectRatio: "landscape",
  },
  {
    id: "g2",
    src: "/assets/gallery/store-interior.jpg",
    alt: "Intérieur de notre boutique",
    category: "store",
    aspectRatio: "portrait",
  },
  {
    id: "g3",
    src: "/assets/gallery/skincare-display.jpg",
    alt: "Présentoir de soins de la peau",
    category: "products",
    aspectRatio: "square",
  },
  {
    id: "g4",
    src: "/assets/gallery/perfume-bottles.jpg",
    alt: "Flacons de parfum artistiques",
    category: "atmosphere",
    aspectRatio: "portrait",
  },
  {
    id: "g5",
    src: "/assets/gallery/makeup-collection.jpg",
    alt: "Collection de maquillage",
    category: "products",
    aspectRatio: "landscape",
  },
  {
    id: "g6",
    src: "/assets/gallery/store-entrance.jpg",
    alt: "Entrée de la boutique",
    category: "store",
    aspectRatio: "square",
  },
  {
    id: "g7",
    src: "/assets/gallery/luxury-display.jpg",
    alt: "Présentoir de produits de luxe",
    category: "atmosphere",
    aspectRatio: "landscape",
  },
  {
    id: "g8",
    src: "/assets/gallery/beauty-products.jpg",
    alt: "Produits de beauté variés",
    category: "products",
    aspectRatio: "portrait",
  },
  {
    id: "g9",
    src: "/assets/gallery/store-shelves.jpg",
    alt: "Étagères de la boutique",
    category: "store",
    aspectRatio: "square",
  },
  {
    id: "g10",
    src: "/assets/gallery/fragrance-bar.jpg",
    alt: "Bar à fragrances",
    category: "atmosphere",
    aspectRatio: "landscape",
  },
  {
    id: "g11",
    src: "/assets/gallery/cosmetics-detail.jpg",
    alt: "Détail cosmétiques",
    category: "products",
    aspectRatio: "square",
  },
  {
    id: "g12",
    src: "/assets/gallery/elegant-display.jpg",
    alt: "Présentoir élégant",
    category: "atmosphere",
    aspectRatio: "portrait",
  },
];

const categories = [
  { id: "all", label: "Tout" },
  { id: "products", label: "Produits" },
  { id: "store", label: "Boutique" },
  { id: "atmosphere", label: "Ambiance" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    document.title = "Galerie - Parfumerie Élégance";
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = galleryRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        gsap.from(items, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        });
      }
    }, galleryRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24" data-testid="page-gallery">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Notre Galerie
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'univers de Parfumerie Élégance à travers notre collection
            de photos de produits, de notre boutique et de notre atmosphère unique.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              data-testid={`button-gallery-filter-${cat.id}`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          ref={galleryRef}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(index)}
              data-testid={`gallery-item-${image.id}`}
            >
              <div className="relative overflow-hidden rounded-xl bg-muted">
                <div
                  className={cn(
                    "w-full bg-gradient-to-br from-primary/20 to-primary/5",
                    image.aspectRatio === "portrait" && "aspect-[3/4]",
                    image.aspectRatio === "landscape" && "aspect-[4/3]",
                    image.aspectRatio === "square" && "aspect-square",
                    !image.aspectRatio && "aspect-square"
                  )}
                >
                  <div className="w-full h-full flex items-center justify-center text-primary/30">
                    <ZoomIn className="h-12 w-12" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <ZoomIn className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Aucune image dans cette catégorie
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
          <DialogTitle className="sr-only">
            {filteredImages[currentIndex]?.alt || "Image de la galerie"}
          </DialogTitle>
          <div className="relative min-h-[60vh] flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setLightboxOpen(false)}
              data-testid="button-close-lightbox"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            {filteredImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={prevImage}
                  data-testid="button-lightbox-prev"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={nextImage}
                  data-testid="button-lightbox-next"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image Placeholder */}
            <div className="max-w-full max-h-[80vh] flex items-center justify-center">
              <div className="bg-gradient-to-br from-primary/30 to-primary/10 w-[600px] h-[400px] rounded-lg flex items-center justify-center">
                <p className="text-white/70 text-center p-4">
                  {filteredImages[currentIndex]?.alt}
                </p>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
