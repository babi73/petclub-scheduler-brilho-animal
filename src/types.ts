
import type { LucideIcon } from 'lucide-react';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  weight: number;
  notes: string;
  ownerId: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
}

export interface Appointment {
  id: string;
  petId: string;
  date: Date;
  services: Service[];
  status: 'agendado' | 'concluido' | 'cancelado';
  notes?: string;
}

export interface AppointmentWithDetails extends Appointment {
  pet: Pet;
  owner: Owner;
}

export type PetType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';

export type Service = 
  | 'banho-simples' 
  | 'banho-medicamentoso' 
  | 'tosa-higienica' 
  | 'tosa-completa' 
  | 'corte-unhas' 
  | 'limpeza-ouvidos';

export interface ServiceOption {
  id: Service;
  name: string;
  price: number;
  icon: LucideIcon;
  duration: number; // in minutes
}

// Product types
export type ProductCategory = 
  | 'racao' 
  | 'brinquedo' 
  | 'higiene' 
  | 'acessorio' 
  | 'cama' 
  | 'comedouro' 
  | 'coleira' 
  | 'arranhador'
  | 'areia'
  | 'gaiola'
  | 'habitat';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  petType: PetType[];
  brand: string;
  inStock: number;
  petSize?: 'pequeno' | 'medio' | 'grande';
  isNew?: boolean;
  isPromotion?: boolean;
  promotionalPrice?: number;
  featured?: boolean;
}

export interface ProductFilter {
  petType?: PetType;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  petSize?: 'pequeno' | 'medio' | 'grande';
  inPromotion?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cartao' | 'pix' | 'boleto' | 'loja';
export type DeliveryMethod = 'entrega' | 'retirada';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
    }
  };
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  status: 'pendente' | 'pago' | 'enviado' | 'entregue' | 'cancelado';
  createdAt: Date;
}
