import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceOption, Service } from '@/types';
import { 
  Bath, 
  Heart, 
  Scissors, 
  Sparkles, 
  type LucideIcon 
} from 'lucide-react';

// Map icon names to actual components
const iconMap: Record<string, LucideIcon> = {
  Bath,
  Heart,
  Scissors,
  Sparkles,
  Ear: Sparkles, // Using Sparkles as fallback for Ear
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) throw error;

      return (data || []).map((service: any) => ({
        id: service.service_id as Service,
        name: service.name,
        price: parseFloat(service.price),
        icon: iconMap[service.icon] || Bath,
        duration: service.duration,
      })) as ServiceOption[];
    },
  });
};
