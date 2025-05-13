
import { Product, ProductCategory, PetType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create products
const createProduct = (
  name: string,
  description: string,
  price: number,
  category: ProductCategory,
  petType: PetType[],
  brand: string,
  inStock: number,
  image: string,
  options: Partial<Product> = {}
): Product => ({
  id: uuidv4(),
  name,
  description,
  price,
  category,
  petType,
  brand,
  inStock,
  image,
  ...options
});

// Mock products
export const products: Product[] = [
  // Dog Products
  createProduct(
    'Ração Premium Cães Adultos',
    'Ração balanceada para cães adultos de todas as raças.',
    129.90,
    'racao',
    ['dog'],
    'Royal Canin',
    25,
    '/images/products/dog-food-1.jpg',
    { petSize: 'medio', featured: true }
  ),
  createProduct(
    'Coleira de Nylon com Fecho Seguro',
    'Coleira confortável e resistente para passeios.',
    39.90,
    'coleira',
    ['dog'],
    'PetLove',
    40,
    '/images/products/dog-collar-1.jpg',
    { isPromotion: true, promotionalPrice: 29.90 }
  ),
  createProduct(
    'Bola Interativa com Dispenser de Petiscos',
    'Estimula o raciocínio e diverte seu cão por horas.',
    45.50,
    'brinquedo',
    ['dog'],
    'Pet Games',
    15,
    '/images/products/dog-toy-1.jpg',
    { isNew: true }
  ),
  createProduct(
    'Cama Ortopédica para Cães Grandes',
    'Proporciona conforto e suporte para cães de grande porte ou idosos.',
    189.90,
    'cama',
    ['dog'],
    'Comfort Pet',
    8,
    '/images/products/dog-bed-1.jpg',
    { petSize: 'grande' }
  ),
  createProduct(
    'Shampoo Hipoalergênico',
    'Ideal para cães com pele sensível.',
    35.90,
    'higiene',
    ['dog'],
    'Pet Clean',
    30,
    '/images/products/dog-shampoo-1.jpg'
  ),

  // Cat Products
  createProduct(
    'Ração Premium Gatos Castrados',
    'Fórmula especial para gatos castrados, controla o peso e promove saúde urinária.',
    115.90,
    'racao',
    ['cat'],
    'Royal Feline',
    20,
    '/images/products/cat-food-1.jpg',
    { featured: true }
  ),
  createProduct(
    'Arranhador Poste com Plataforma',
    'Ideal para gatos afiarem as unhas e brincarem, protegendo seus móveis.',
    99.90,
    'arranhador',
    ['cat'],
    'Cat Fun',
    12,
    '/images/products/cat-scratcher-1.jpg',
    { isNew: true }
  ),
  createProduct(
    'Varinha com Pena e Guizo',
    'Brinquedo interativo que estimula o instinto de caça.',
    29.90,
    'brinquedo',
    ['cat'],
    'Play Cat',
    35,
    '/images/products/cat-toy-1.jpg',
    { isPromotion: true, promotionalPrice: 19.90 }
  ),
  createProduct(
    'Areia Higiênica Premium Clumping',
    'Controle de odor e fácil limpeza, rende mais.',
    45.90,
    'areia',
    ['cat'],
    'Clean Cat',
    40,
    '/images/products/cat-litter-1.jpg'
  ),
  createProduct(
    'Fonte de Água para Gatos 2L',
    'Estimula o consumo de água com filtragem constante.',
    149.90,
    'comedouro',
    ['cat'],
    'Hydro Pet',
    10,
    '/images/products/cat-fountain-1.jpg',
    { featured: true }
  ),

  // Bird Products
  createProduct(
    'Mix de Sementes para Calopsitas',
    'Mistura balanceada para calopsitas e outros periquitos.',
    25.90,
    'racao',
    ['bird'],
    'Bird Life',
    30,
    '/images/products/bird-food-1.jpg'
  ),
  createProduct(
    'Gaiola Grande com Poleiros',
    'Espaçosa e segura para pássaros de médio porte.',
    259.90,
    'gaiola',
    ['bird'],
    'Happy Birds',
    5,
    '/images/products/bird-cage-1.jpg',
    { isNew: true, featured: true }
  ),
  createProduct(
    'Conjunto de Brinquedos para Pássaros',
    'Kit com diferentes brinquedos para entreter seu pássaro.',
    49.90,
    'brinquedo',
    ['bird'],
    'Bird Toys',
    15,
    '/images/products/bird-toys-1.jpg'
  ),

  // Rabbit/Rodent Products
  createProduct(
    'Ração para Coelhos com Fibras',
    'Alimento balanceado rico em fibras para a saúde digestiva.',
    35.90,
    'racao',
    ['rabbit'],
    'Rabbit Care',
    20,
    '/images/products/rabbit-food-1.jpg'
  ),
  createProduct(
    'Habitat para Pequenos Roedores',
    'Gaiola completa com todos os acessórios para hamsters e outros pequenos roedores.',
    199.90,
    'habitat',
    ['rabbit', 'other'],
    'Small Pets',
    8,
    '/images/products/rodent-habitat-1.jpg',
    { featured: true }
  ),
  createProduct(
    'Brinquedo Túnel para Roedores',
    'Túnel flexível para hamsters, gerbils e outros pequenos animais.',
    39.90,
    'brinquedo',
    ['rabbit', 'other'],
    'Fun Rodent',
    25,
    '/images/products/rodent-toy-1.jpg',
    { isPromotion: true, promotionalPrice: 29.90 }
  ),
];

// Get products by pet type
export const getProductsByPetType = (petType: PetType): Product[] => {
  return products.filter(product => product.petType.includes(petType));
};

// Get products by category
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Get new products
export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

// Get promotion products
export const getPromotionProducts = (): Product[] => {
  return products.filter(product => product.isPromotion);
};

// Filter products based on criteria
export const filterProducts = (filters: {
  petType?: PetType;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  petSize?: 'pequeno' | 'medio' | 'grande';
  inPromotion?: boolean;
}): Product[] => {
  return products.filter(product => {
    // Check pet type
    if (filters.petType && !product.petType.includes(filters.petType)) {
      return false;
    }
    
    // Check category
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Check min price
    if (filters.minPrice !== undefined && 
        (product.isPromotion ? product.promotionalPrice! : product.price) < filters.minPrice) {
      return false;
    }
    
    // Check max price
    if (filters.maxPrice !== undefined && 
        (product.isPromotion ? product.promotionalPrice! : product.price) > filters.maxPrice) {
      return false;
    }
    
    // Check brand
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    
    // Check pet size
    if (filters.petSize && product.petSize !== filters.petSize) {
      return false;
    }
    
    // Check promotion
    if (filters.inPromotion && !product.isPromotion) {
      return false;
    }
    
    return true;
  });
};

// Get all brands
export const getAllBrands = (): string[] => {
  const brands = new Set<string>();
  products.forEach(product => brands.add(product.brand));
  return Array.from(brands);
};

// Get price range
export const getPriceRange = (): { min: number; max: number } => {
  let min = Infinity;
  let max = 0;
  
  products.forEach(product => {
    const price = product.isPromotion && product.promotionalPrice ? 
      product.promotionalPrice : product.price;
    
    if (price < min) min = price;
    if (price > max) max = price;
  });
  
  return { min, max };
};
