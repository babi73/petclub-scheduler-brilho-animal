
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
  icon?: React.ReactNode;
  duration: number; // in minutes
}
