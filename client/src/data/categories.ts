import type { Category } from "@shared/schema";

export const categories: Category[] = [
  {
    id: "paraspace",
    name: "ParaSpace",
    description: "Découvrez notre gamme exclusive ParaSpace, des produits de parapharmacie haut de gamme pour votre bien-être quotidien.",
    imageUrl: "/assets/categories/paraspace.jpg",
    order: 1,
  },
  {
    id: "parfum",
    name: "Parfums de Luxe",
    description: "Une collection raffinée de parfums exclusifs pour hommes et femmes, créés par les plus grandes maisons.",
    imageUrl: "/assets/categories/parfum.jpg",
    order: 2,
  },
  {
    id: "forever",
    name: "Forever Living",
    description: "Produits naturels à base d'Aloe Vera de la marque Forever Living pour votre santé et beauté.",
    imageUrl: "/assets/categories/forever.jpg",
    order: 3,
  },
  {
    id: "the-ordinary",
    name: "The Ordinary",
    description: "Soins de la peau efficaces et abordables. Des formules cliniques pour des résultats visibles.",
    imageUrl: "/assets/categories/the-ordinary.jpg",
    order: 4,
  },
  {
    id: "glasses",
    name: "Lunettes & Accessoires",
    description: "Collection de lunettes de soleil et accessoires de mode pour compléter votre style.",
    imageUrl: "/assets/categories/glasses.jpg",
    order: 5,
  },
  {
    id: "avon",
    name: "Avon",
    description: "Maquillage, soins et parfums Avon. La beauté accessible à tous depuis plus de 130 ans.",
    imageUrl: "/assets/categories/avon.jpg",
    order: 6,
  },
  {
    id: "maybelline",
    name: "Maybelline",
    description: "Maquillage tendance et innovant. Des produits professionnels pour un look parfait.",
    imageUrl: "/assets/categories/maybelline.jpg",
    order: 7,
  },
  {
    id: "lattafa",
    name: "Lattafa Parfums",
    description: "Parfums orientaux de luxe. Des fragrances envoûtantes inspirées des traditions arabes.",
    imageUrl: "/assets/categories/lattafa.jpg",
    order: 8,
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getCategoriesSorted = (): Category[] => {
  return [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));
};
