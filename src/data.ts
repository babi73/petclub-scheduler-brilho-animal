
import { Pet, Owner, Appointment, AppointmentWithDetails, ServiceOption } from './types';
import { Bath, Scissors, PawPrint } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Sample Owners
export const owners: Owner[] = [
  { id: '1', name: 'João Silva', phone: '(11) 98765-4321' },
  { id: '2', name: 'Maria Santos', phone: '(11) 91234-5678' },
  { id: '3', name: 'Carlos Oliveira', phone: '(11) 99876-5432' },
  { id: '4', name: 'Ana Souza', phone: '(11) 94321-8765' },
];

// Sample Pets
export const pets: Pet[] = [
  { 
    id: '1', 
    name: 'Rex', 
    type: 'dog', 
    breed: 'Golden Retriever', 
    weight: 25.5, 
    notes: 'Muito agitado durante o banho', 
    ownerId: '1' 
  },
  { 
    id: '2', 
    name: 'Luna', 
    type: 'cat', 
    breed: 'Siamês', 
    weight: 4.2, 
    notes: 'Não gosta de secador', 
    ownerId: '2' 
  },
  { 
    id: '3', 
    name: 'Pipoca', 
    type: 'dog', 
    breed: 'Shih Tzu', 
    weight: 5.8, 
    notes: 'Alérgico a shampoo com perfume', 
    ownerId: '3' 
  },
  { 
    id: '4', 
    name: 'Nina', 
    type: 'dog', 
    breed: 'Yorkshire', 
    weight: 3.1, 
    notes: '', 
    ownerId: '4' 
  },
  { 
    id: '5', 
    name: 'Whiskers', 
    type: 'cat', 
    breed: 'Persa', 
    weight: 5, 
    notes: 'Comportamento agressivo', 
    ownerId: '1' 
  },
];

// Sample Services - Updated to use LucideIcon type
export const services: ServiceOption[] = [
  { 
    id: 'banho-simples', 
    name: 'Banho Simples', 
    price: 50, 
    icon: Bath, 
    duration: 60 
  },
  { 
    id: 'banho-medicamentoso', 
    name: 'Banho Medicamentoso', 
    price: 80, 
    icon: Bath, 
    duration: 90 
  },
  { 
    id: 'tosa-higienica', 
    name: 'Tosa Higiênica', 
    price: 40, 
    icon: Scissors, 
    duration: 45 
  },
  { 
    id: 'tosa-completa', 
    name: 'Tosa Completa', 
    price: 70, 
    icon: Scissors, 
    duration: 120 
  },
  { 
    id: 'corte-unhas', 
    name: 'Corte de Unhas', 
    price: 20, 
    icon: PawPrint, 
    duration: 15 
  },
  { 
    id: 'limpeza-ouvidos', 
    name: 'Limpeza de Ouvidos', 
    price: 25, 
    icon: PawPrint, 
    duration: 20 
  },
];

// Sample Appointments
export const appointments: Appointment[] = [
  {
    id: '1',
    petId: '1',
    date: new Date('2025-05-14T10:00:00'),
    services: ['banho-simples', 'corte-unhas'],
    status: 'agendado',
    notes: '',
  },
  {
    id: '2',
    petId: '2',
    date: new Date('2025-05-14T14:30:00'),
    services: ['banho-simples'],
    status: 'agendado',
    notes: '',
  },
  {
    id: '3',
    petId: '3',
    date: new Date('2025-05-15T11:00:00'),
    services: ['tosa-completa', 'banho-simples', 'limpeza-ouvidos'],
    status: 'agendado',
    notes: 'Usar shampoo hipoalergênico',
  },
  {
    id: '4',
    petId: '4',
    date: new Date('2025-05-16T09:00:00'),
    services: ['banho-simples', 'tosa-higienica'],
    status: 'agendado',
    notes: '',
  },
  {
    id: '5',
    petId: '5',
    date: new Date('2025-05-13T16:00:00'),
    services: ['banho-medicamentoso'],
    status: 'concluido',
    notes: 'Tomar cuidado com comportamento agressivo',
  },
];

// Helper function to get full appointment details
export function getAppointmentWithDetails(id: string): AppointmentWithDetails | undefined {
  const appointment = appointments.find(a => a.id === id);
  if (!appointment) return undefined;
  
  const pet = pets.find(p => p.id === appointment.petId);
  if (!pet) return undefined;
  
  const owner = owners.find(o => o.id === pet.ownerId);
  if (!owner) return undefined;
  
  return {
    ...appointment,
    pet,
    owner,
  };
}

export function getAllAppointmentsWithDetails(): AppointmentWithDetails[] {
  return appointments
    .map(appointment => {
      const pet = pets.find(p => p.id === appointment.petId);
      if (!pet) return null;
      
      const owner = owners.find(o => o.id === pet.ownerId);
      if (!owner) return null;
      
      return {
        ...appointment,
        pet,
        owner,
      };
    })
    .filter((a): a is AppointmentWithDetails => a !== null);
}

export function getServiceById(id: string): ServiceOption | undefined {
  return services.find(s => s.id === id);
}
