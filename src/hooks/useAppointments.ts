import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Pet {
  id: string;
  owner_id?: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
  notes: string;
}

export interface Appointment {
  id: string;
  pet_id: string;
  owner_id: string;
  date: string;
  services: string[];
  status: string;
  notes: string;
  created_at: string;
  pets?: Pet;
}

export const useAppointments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          pets (
            id,
            name,
            type,
            breed,
            weight,
            notes
          )
        `)
        .eq('owner_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Appointment[];
    },
    enabled: !!user,
  });

  const createAppointment = useMutation({
    mutationFn: async ({
      petData,
      appointmentData,
    }: {
      petData: {
        name: string;
        type: string;
        breed: string;
        weight: number;
        notes: string;
      };
      appointmentData: {
        date: string;
        services: string[];
        notes: string;
      };
    }) => {
      if (!user) throw new Error('User not authenticated');

      // First, create or get the pet
      const { data: existingPets } = await supabase
        .from('pets')
        .select('id')
        .eq('owner_id', user.id)
        .eq('name', petData.name)
        .single();

      let petId: string;

      if (existingPets) {
        petId = existingPets.id;
      } else {
        const { data: newPet, error: petError } = await supabase
          .from('pets')
          .insert([
            {
              owner_id: user.id,
              ...petData,
            },
          ])
          .select()
          .single();

        if (petError) throw petError;
        petId = newPet.id;
      }

      // Then create the appointment
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert([
          {
            pet_id: petId,
            owner_id: user.id,
            ...appointmentData,
          },
        ])
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      // Create notification
      const appointmentDate = new Date(appointmentData.date);
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: user.id,
            appointment_id: appointment.id,
            title: 'Agendamento confirmado! 🎉',
            message: `Seu agendamento para ${petData.name} foi confirmado para ${appointmentDate.toLocaleDateString('pt-BR')} às ${appointmentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`,
          },
        ]);

      if (notificationError) console.error('Error creating notification:', notificationError);

      // Get user profile for phone number
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', user.id)
        .single();

      // Send WhatsApp notification
      if (profile?.phone) {
        try {
          await supabase.functions.invoke('send-whatsapp-notification', {
            body: {
              to: profile.phone,
              message: `Seu agendamento para ${petData.name} foi confirmado!`,
              appointmentDate: appointmentDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          });
        } catch (error) {
          console.error('Error sending WhatsApp notification:', error);
          // Don't fail the appointment creation if WhatsApp fails
        }
      }

      return appointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: 'Agendamento criado!',
        description: 'Seu agendamento foi confirmado com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar agendamento',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    appointments,
    isLoading,
    createAppointment: createAppointment.mutate,
    isCreating: createAppointment.isPending,
  };
};
