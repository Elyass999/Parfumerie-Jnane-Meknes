import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from "@/lib/utils"; // Assurez-vous d'avoir ce fichier utilitaire pour Tailwind

interface PreloaderProps {
  // Optionnel: Déclencher manuellement l'animation de masquage
  loading: boolean;
  // Optionnel: Callback une fois que l'animation de masquage est terminée
  onLoaded: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ loading, onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  
  // État local pour déterminer si le préchargeur doit être masqué (après l'animation)
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!loading) {
      // 1. Initialiser le contexte GSAP
      const ctx = gsap.context(() => {
        
        // 2. Animation d'entrée du logo (facultatif mais stylé)
        gsap.to(brandRef.current, { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            delay: 0.2, 
            ease: "power2.out" 
        });

        // 3. Animer le rideau de masquage après un court délai
        gsap.to(curtainRef.current, {
          scaleY: 0, // Réduit la hauteur à zéro (de bas en haut)
          transformOrigin: "bottom center",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 1.0, // Attend 1.0s après l'affichage du préchargeur
          onComplete: () => {
            // 4. Masquer le conteneur principal du préchargeur après le masquage du rideau
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                setIsHidden(true);
                onLoaded(); // Déclenche le callback pour indiquer que le site est prêt
              },
            });
          },
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading, onLoaded]);


  if (isHidden) {
    return null; // Ne rien rendre si le préchargeur est complètement terminé
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background pointer-events-auto transition-opacity"
      )}
    >
      {/* Le Rideau (Curtain) :
        C'est l'élément qui va se contracter pour révéler le contenu derrière.
      */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-primary/95 transform scale-y-100"
        style={{ transformOrigin: "bottom center" }}
      />
      
      {/* Contenu du Préchargeur (Brand Name/Logo) :
        Ceci est l'élément central que l'utilisateur voit pendant le chargement.
      */}
      <h1
        ref={brandRef}
        className="font-serif text-3xl md:text-5xl font-bold text-white z-10"
        style={{ transform: 'translateY(20px)', opacity: 0 }} // État initial GSAP
      >
        Parfumerie Jnane Meknes
      </h1>
    </div>
  );
};

export default Preloader;