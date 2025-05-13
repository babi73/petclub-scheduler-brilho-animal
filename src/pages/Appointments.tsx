
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Search, AlertTriangle, PawPrint, Clock, User, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AppointmentWithDetails } from '@/types';
import { getAllAppointmentsWithDetails, getServiceById } from '@/data';

const AppointmentCard: React.FC<{ appointment: AppointmentWithDetails }> = ({ appointment }) => {
  const hasWarning = appointment.pet.notes.includes('agressivo') || 
                    appointment.pet.notes.includes('alérgico') || 
                    appointment.notes?.includes('cuidado');
                    
  return (
    <Card className="pet-card mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <div className="bg-petYellow rounded-full p-2.5 h-10 w-10 flex items-center justify-center">
            {appointment.pet.type === 'dog' ? (
              <PawPrint className="h-5 w-5 text-petBrown" />
            ) : appointment.pet.type === 'cat' ? (
              <PawPrint className="h-5 w-5 text-petBrown" />
            ) : (
              <PawPrint className="h-5 w-5 text-petBrown" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{appointment.pet.name}</h3>
              {hasWarning && (
                <div className="bg-red-100 rounded-full p-1" title="Possui observações importantes">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            <p className="text-sm text-petBrown-light">{appointment.pet.breed}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm bg-petYellow/30 px-3 py-1 rounded-full">
          <Clock className="h-4 w-4" />
          <span>
            {format(appointment.date, "HH'h'mm", { locale: ptBR })}
          </span>
        </div>
      </div>
      
      <div className="pl-12 mb-3">
        <div className="flex flex-wrap gap-2">
          {appointment.services.map(serviceId => {
            const service = getServiceById(serviceId);
            return service ? (
              <span 
                key={serviceId} 
                className="bg-petOrange/20 text-petBrown text-xs px-3 py-1 rounded-full"
              >
                {service.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-petBrown/70" />
          <span className="text-sm">{appointment.owner.name}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-petBrown/70" />
          <span className="text-sm">{appointment.owner.phone}</span>
        </div>
      </div>
    </Card>
  );
};

const Appointments: React.FC = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  
  const allAppointments = getAllAppointmentsWithDetails();
  
  // Filter appointments for the selected date and search term
  const filteredAppointments = allAppointments.filter(appointment => {
    const sameDay = appointment.date.toDateString() === date.toDateString();
    
    if (!sameDay) return false;
    
    const searchLower = search.toLowerCase();
    return (
      appointment.pet.name.toLowerCase().includes(searchLower) ||
      appointment.pet.breed.toLowerCase().includes(searchLower) ||
      appointment.owner.name.toLowerCase().includes(searchLower) ||
      appointment.owner.phone.includes(search)
    );
  });
  
  // Sort appointments by time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  );
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-petBrown">Agendamentos</h1>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-petYellow-light mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm text-petBrown/70 mb-1 block">Data</label>
            <div className="relative">
              <Input
                type="date"
                value={format(date, 'yyyy-MM-dd')}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="pet-input w-full"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-petBrown/50" size={18} />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="text-sm text-petBrown/70 mb-1 block">Buscar</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Nome do pet, raça, tutor ou telefone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pet-input w-full"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-petBrown/50" size={18} />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <h2 className="font-medium">
            {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h2>
          <span className="bg-petYellow-light px-3 py-1 rounded-full text-sm">
            {sortedAppointments.length} agendamentos
          </span>
        </div>
      </div>
      
      <div>
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-petYellow-light">
            <div className="bg-petYellow/30 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-petBrown" />
            </div>
            <h3 className="text-lg font-medium mb-1">Nenhum agendamento encontrado</h3>
            <p className="text-petBrown/70">
              Não há agendamentos para esta data ou critérios de busca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
