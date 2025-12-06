import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Heart, Leaf, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "Nous sélectionnons uniquement les meilleurs produits pour vous offrir une expérience de qualité exceptionnelle.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Notre amour pour la parfumerie et la beauté guide chacune de nos décisions et recommandations.",
  },
  {
    icon: Users,
    title: "Service Client",
    description:
      "Votre satisfaction est notre priorité. Notre équipe est dédiée à vous accompagner dans vos choix.",
  },
  {
    icon: Leaf,
    title: "Responsabilité",
    description:
      "Nous privilégions les marques éthiques et les produits respectueux de l'environnement.",
  },
];

const stats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "50K+", label: "Clients satisfaits" },
  { value: "500+", label: "Produits disponibles" },
  { value: "8", label: "Marques partenaires" },
];

const team = [
  {
    name: "Marie Dupont",
    role: "Fondatrice & Directrice",
    description: "",
  },
  {
    name: "Jean-Pierre Martin",
    role: "Expert Parfumeur",
    description: "Ancien nez chez de grandes maisons de parfum",
  },
  {
    name: "Sophie Bernard",
    role: "Conseillère Beauté",
    description: "Spécialiste en soins de la peau et maquillage",
  },
];

// NOUVEAU : Composant Counter pour l'animation de comptage
interface CounterProps {
  finalValue: string;
  className: string;
}

const Counter: React.FC<CounterProps> = ({ finalValue, className }) => {
  const counterRef = useRef<HTMLParagraphElement>(null);
  
  // Extraire la valeur numérique et l'unité (K+, +)
  const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
  const unit = finalValue.replace(/[\d.,]/g, '');

  useEffect(() => {
    // Utiliser un contexte GSAP pour gérer proprement l'animation
    const ctx = gsap.context(() => {
      const obj = { count: 0 };
      
      gsap.to(obj, {
        count: numericValue,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 80%", // Déclenche l'animation lorsque l'élément est à 80% de la fenêtre
          toggleActions: "play none none none", // Joue une seule fois
        },
        onUpdate: () => {
          if (counterRef.current) {
            let displayValue: string | number;
            
            // Logique de formatage pour gérer les entiers, K+ et +
            if (unit === 'K+' && obj.count >= 1000) {
              displayValue = `${(obj.count / 1000).toFixed(0)}K+`;
            } else if (unit === '+') {
              displayValue = `${Math.round(obj.count)}${unit}`;
            } else {
              displayValue = Math.round(obj.count);
            }

            counterRef.current.textContent = String(displayValue) + unit.replace('K+', '').replace('+', '');
          }
        }
      });
    }, counterRef);

    return () => ctx.revert();
  }, [numericValue, unit]);

  // Afficher la valeur initiale (0 ou 0K+, etc.) avant le défilement
  return (
    <p ref={counterRef} className={className}>
      0{unit}
    </p>
  );
};


export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null); // NOUVEAU : Ref pour la section Stats

  useEffect(() => {
    document.title = "À Propos - Parfumerie Jnane Meknes";
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current?.querySelectorAll("[data-animate]") || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Values animation
      gsap.from(valuesRef.current?.querySelectorAll(".value-card") || [], {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      });
      
      // NOTE: L'animation de la section Stats est gérée par le composant Counter lui-même
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen pt-20 md:pt-24" data-testid="page-about">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p
              data-animate
              className="text-sm uppercase tracking-[0.3em] text-primary mb-4"
            >
              Notre Histoire
            </p>
            <h1
              data-animate
              className="font-serif text-3xl md:text-5xl font-semibold mb-6"
            >
              À Propos de Parfumerie Jnane Meknes
            </h1>
            <p
              data-animate
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Parfumerie Jnane Meknes est votre destination beauté de
              confiance. Notre passion pour les parfums et cosmétiques de qualité
              nous guide dans la sélection des meilleurs produits pour vous.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
                Notre Mission
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fondée par Marie Dupont, une passionnée de parfumerie, notre
                  boutique est née d'un rêve : rendre accessible l'excellence en
                  matière de beauté et de parfumerie.
                </p>
                <p>
                  Nous croyons que chaque personne mérite de se sentir belle et
                  confiante. C'est pourquoi nous sélectionnons avec soin des
                  produits de qualité exceptionnelle, des grandes marques aux
                  découvertes exclusives.
                </p>
                <p>
                  Notre équipe d'experts est là pour vous guider dans vos choix,
                  vous offrir des conseils personnalisés et vous faire vivre une
                  expérience d'achat unique.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl  flex items-center justify-center">
                <div className="text-center p-8">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipNqxqg7Q-y33kjlefy8TKMoj_JBbNFjPCWvscCf=s1360-w1360-h1020-rw"
                  alt="Boutique Parfumerie Élégance"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  loading="lazy"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (MODIFIÉ) */}
      <section ref={statsRef} className="py-16 bg-card border-y border-card-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <Counter // Utilisation du nouveau composant Counter
                  finalValue={stat.value}
                  className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2"
                />
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
              Nos Valeurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ces principes guident notre travail quotidien et notre engagement
              envers vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="value-card text-center">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold">
                    Horaires d'Ouverture
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span>Lundi - Jeudi</span>
                    <span className="font-medium">10h30 - 23h00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span>Vendredi</span>
                    <span className="font-medium">16h30 - 23h00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Samedi - Dimanche</span>
                    <span className="font-medium text-muted-foreground">
                      <span className="font-medium">10h30 - 23h00</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}