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
  src: string; // This is the URL you are now using
  alt: string;
  category: "products" | "store" | "atmosphere";
  aspectRatio?: "square" | "portrait" | "landscape";
}

// NOTE: Replace these placeholder URLs with your actual public image URLs
const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/575614615_18068734994357014_5811109810473843495_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=105&ig_cache_key=MjkzMjM0OTUxNjA1MzU4NDQzOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjgyOHgxNDcyLnNkci5DMyJ9&_nc_ohc=uWkREdWGHAUQ7kNvwFyxTU6&_nc_oc=AdlnzmE3-pc1DUDSqizLaLAmDT34kJkBD3S-P9FetXh8JLSuhGVEUml189nHrq9CjFc&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=zirMOYG6byOgGGoVY9U2YQ&oh=00_AfnP5D5K73--L0v5Chs7SV8k2qnmhTW2Cci6U1ljkRO8bw&oe=6939D14E",
    alt: "Collection de parfums de luxe",
    category: "products",
    aspectRatio: "landscape",
  },
  {
    id: "g2",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/574344147_18156154447397121_6407981056249699399_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=100&ig_cache_key=MzI5MTAwNTAxMjIzMjE2NzYxNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNzB4MjA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=M9k4xh8CkuQQ7kNvwGWyW0e&_nc_oc=Adkpb57OcOYEw7NAXzTycona8_Cu7_yCu6SPD9Cd8volsJSsS35IYRH2XbO6i-nmIpM&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1s75-YJSk2vCwjYh0u-srg&oh=00_Afk2lwZZqv2aIBWe0CLg5ddraBs2BM24dTvJuhKRIyvIrQ&oe=6939D81F",
    alt: "Intérieur de notre boutique",
    category: "store",
    aspectRatio: "portrait",
  },
  {
    id: "g3",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/554865143_17979059669777543_6174264381433418051_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=102&ig_cache_key=MzI3MzYyNjYxNTAxMzIyNTQyNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNzB4MjA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=bPrY9N809G8Q7kNvwGQ8T0m&_nc_oc=AdmCJDRbSHpAW49OaKWXvmLtjyL2_PQg4zkRd4ijbS06Efyn_JRaA4QJXdYFNbGhmBg&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=17TCTQlNbb-b-x4lDCRO4w&oh=00_AfnVGABEaof1nytfiBs0b1MsvAMHyUQYbIj6r6jvNtV1cA&oe=6939F0A7",
    alt: "Présentoir de soins de la peau",
    category: "products",
    aspectRatio: "square",
  },
  {
    id: "g4",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/565031285_18077011211113448_798981497184094581_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=105&ig_cache_key=MzA1NjI3NDUwNDcwNzg5NTI2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjgyOHgxNDcyLnNkci5DMyJ9&_nc_ohc=K_g_vDdfptgQ7kNvwHjcV61&_nc_oc=Adn9AAJOWkbpAU9mEmYXKsliX3zliiFwExGiXffI4erPX_yQAO-HYL6O3c62CgwucvQ&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=DPczkZJ9EN80mTTzL4QIYw&oh=00_AfmDlFsRxUFnk0vcIqg4Tt7YAVUjLoBrkGMdc7lX5UGvbQ&oe=6939D3A7",
    alt: "Flacons de parfum artistiques",
    category: "atmosphere",
    aspectRatio: "portrait",
  },
  {
    id: "g5",
    src: "https://scontent.cdninstagram.com/v/t51.75761-15/485000796_17994667718780430_1703241022563669042_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=100&ig_cache_key=MzU4OTcwNDc1NDQ2MDM0NTAyNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyOTB4MjI5My5zZHIuQzMifQ%3D%3D&_nc_ohc=f3HrKtGy85QQ7kNvwGDkQeW&_nc_oc=AdnqngjbR2CsAvw5trKHdy2ttr49XS68T0O6YDCGVJI_2Fr0bJWAPbVA5ouOxwIaXgA&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1s75-YJSk2vCwjYh0u-srg&oh=00_AfkxYPSAvfJNcdzhy2TssvEMT0Acf6wUzn3nZSZgvrzgqA&oe=6939CD75",
    alt: "Collection de maquillage",
    category: "products",
    aspectRatio: "landscape",
  },
  {
    id: "g6",
    src: "https://lh3.googleusercontent.com/p/AF1QipNqxqg7Q-y33kjlefy8TKMoj_JBbNFjPCWvscCf=s1360-w1360-h1020-rw",
    alt: "Entrée de la boutique",
    category: "store",
    aspectRatio: "square",
  },
  {
    id: "g7",
    src: "https://drlunettes.ma/cdn/shop/files/lunettes-de-soleil-unisex-lenacci-romeo-noir-930734.jpg?v=1746264530",
    alt: "Présentoir de produits de luxe",
    category: "atmosphere",
    aspectRatio: "landscape",
  },
  {
    id: "g8",
    src: "https://scontent.cdninstagram.com/v/t51.75761-15/491417978_17999186036780430_2519182460526128444_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=105&ig_cache_key=MzYxOTQzOTc4ODQwMjI1NTQ1MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyOTB4MjI5My5zZHIuQzMifQ%3D%3D&_nc_ohc=igrV2tVHcJcQ7kNvwGyIQ03&_nc_oc=AdkC_s94nmI0lxcvUU1TcxZo-xpDfY1nqHlecCtfEQTBGcCUvIj0Z5M2ChPmAfIvYXI&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1s75-YJSk2vCwjYh0u-srg&oh=00_Afk1_oqwkFWtPt4ZZbVMB452PbA6kv3Z2Ok3oePM8w5o5g&oe=6939E995",
    alt: "Produits de beauté variés",
    category: "products",
    aspectRatio: "portrait",
  },
  {
    id: "g9",
    src: "https://deeplor.s3.us-west-2.amazonaws.com/upload/2025/12/06/df89f2d73fe04472b4d3d495ee84e6cf.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251206T105934Z&X-Amz-SignedHeaders=host&X-Amz-Expires=10800&X-Amz-Credential=AKIAROYXHKZUSZONTWIG%2F20251206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=90087cec32df15f4d8bb2bbdd15f9e9b7847a606adfe5f2c2f6c4f4420cd268c",
    alt: "Étagères de la boutique",
    category: "store",
    aspectRatio: "square",
  },
  {
    id: "g10",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/567213655_18090432079895576_2559878852510736765_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=106&ig_cache_key=MzI3MzYyNjYxNDk1NDY1MzU5OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNzB4MjA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=4z6oWP_oUnsQ7kNvwErpDgV&_nc_oc=AdkhOy8-Ius08L9XiwAeStSrFZDnKwsnzKTUUyKd_eT0YziCK-3KKZljzgZ2kD2Johk&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=7JakuD8KVlUN0dExud9NcQ&oh=00_AfnpEdQbzlgjTOLzpjECKVn2qoSa__1bT5fycGtfY6dIug&oe=6939F91D",
    alt: "Bar à fragrances",
    category: "atmosphere",
    aspectRatio: "landscape",
  },
  {
    id: "g11",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/567330613_18070064306370006_9080648259524223466_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=108&ig_cache_key=MzI3MzYyNjYzNjQyOTQyMzM1Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNzB4MjA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=FzEF04KxwWkQ7kNvwEQLhSM&_nc_oc=AdnZqOmbefdeP7je0qaZzfqa5Sr_aJlehpZhX-WBB8bTZ8JRgvjrARRxtVNNFKQtIrk&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=7JakuD8KVlUN0dExud9NcQ&oh=00_AfmQn0QFgibTOTLu06meboC2ODgDDE9M6oYT8UzWi6RT1g&oe=6939EA16",
    alt: "Détail cosmétiques",
    category: "products",
    aspectRatio: "square",
  },
  {
    id: "g12",
    src: "https://scontent.cdninstagram.com/v/t51.82787-15/561430241_18082489927951826_2692475790138980865_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=102&ig_cache_key=MzA2NTY0NDE3ODMzMDQ3NzUzMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjgyOHgxNDcyLnNkci5DMyJ9&_nc_ohc=f2zv7h7xHsUQ7kNvwEc4k_j&_nc_oc=Adn5n3ToVAp3-oB0yvLDTGykN9GfMh6y7tOyxKF0lz7eIPSOAsbfWVfRnL1xiMZpW6k&_nc_ad=z-m&_nc_cid=1404&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=J3oboMt3_k9M03o6RCggug&oh=00_AfkwkyFgN7xHS1vTzEO0uAuC9nPqtk1Rd2SSYJrt-2QILg&oe=6939DA4F",
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
                {/* --- START CORRECTION: RENDER ACTUAL IMAGE --- */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105",
                    // These aspect ratio classes will stretch/squish the image unless it's perfectly sized
                    image.aspectRatio === "portrait" && "aspect-[3/4]",
                    image.aspectRatio === "landscape" && "aspect-[4/3]",
                    image.aspectRatio === "square" && "aspect-square",
                  )}
                />
                {/* --- END CORRECTION: RENDER ACTUAL IMAGE --- */}

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

            {/* --- START CORRECTION: RENDER ACTUAL LIGHTBOX IMAGE --- */}
            <div className="max-w-full max-h-[80vh] flex items-center justify-center">
              <img 
                src={filteredImages[currentIndex]?.src} 
                alt={filteredImages[currentIndex]?.alt} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* --- END CORRECTION: RENDER ACTUAL LIGHTBOX IMAGE --- */}
            
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