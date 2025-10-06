import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductFilter } from '@/types';

export const useProducts = (filters?: ProductFilter) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.petType) {
        query = query.contains('pet_type', [filters.petType]);
      }

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.brand) {
        query = query.eq('brand', filters.brand);
      }

      if (filters?.petSize) {
        query = query.eq('pet_size', filters.petSize);
      }

      if (filters?.inPromotion) {
        query = query.eq('is_promotion', true);
      }

      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice.toString());
      }

      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice.toString());
      }

      if (filters?.inStock !== undefined && filters.inStock) {
        query = query.gt('in_stock', 0);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform database format to app format
      return (data || []).map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        category: product.category,
        petType: product.pet_type,
        brand: product.brand,
        inStock: product.in_stock,
        petSize: product.pet_size,
        isNew: product.is_new,
        isPromotion: product.is_promotion,
        promotionalPrice: product.promotional_price ? Number(product.promotional_price) : undefined,
        featured: product.featured,
        specifications: product.specifications,
      })) as Product[];
    },
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;

      if (!data) return null;

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        image: data.image,
        category: data.category,
        petType: data.pet_type,
        brand: data.brand,
        inStock: data.in_stock,
        petSize: data.pet_size,
        isNew: data.is_new,
        isPromotion: data.is_promotion,
        promotionalPrice: data.promotional_price ? Number(data.promotional_price) : undefined,
        featured: data.featured,
        specifications: data.specifications,
      } as Product;
    },
    enabled: !!productId,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .range(0, 5);

      if (error) throw error;

      return (data || []).map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        category: product.category,
        petType: product.pet_type,
        brand: product.brand,
        inStock: product.in_stock,
        petSize: product.pet_size,
        isNew: product.is_new,
        isPromotion: product.is_promotion,
        promotionalPrice: product.promotional_price ? Number(product.promotional_price) : undefined,
        featured: product.featured,
      })) as Product[];
    },
  });
};
