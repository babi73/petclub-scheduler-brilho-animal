
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PawPrint, Calendar, Clock, Check, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { owners, pets, services } from '@/data';
import { Pet, PetType } from '@/types';
import { Link, useNavigate } from 'react-router-dom';

const petTypes: { value: PetType; label: string }[] = [
  { value: 'dog', label: 'Cachorro' },
  { value: 'cat', label: 'Gato' },
  { value: 'bird', label: 'Pássaro' },
  { value: 'rabbit', label: 'Coelho' },
  { value: 'other', label: 'Outro' }
];

const AppointmentForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Pet information
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<PetType>('dog');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petNotes, setPetNotes] = useState('');
  
  // Owner information
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  
  // Appointment information
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('10:00');

  // Select an existing pet
  const [selectedPet, setSelectedPet] = useState<string>('');
  const [useExistingPet, setUseExistingPet] = useState(false);
  
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handlePetSelection = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    if (pet) {
      const owner = owners.find(o => o.id === pet.ownerId);
      
      setSelectedPet(petId);
      setPetName(pet.name);
      setPetType(pet.type);
      setPetBreed(pet.breed);
      setPetWeight(pet.weight.toString());
      setPetNotes(pet.notes);
      
      if (owner) {
        setOwnerName(owner.name);
        setOwnerPhone(owner.phone);
      }
      
      setUseExistingPet(true);
    }
  };
  
  const handleCreateNewPet = () => {
    setSelectedPet('');
    setPetName('');
    setPetType('dog');
    setPetBreed('');
    setPetWeight('');
    setPetNotes('');
    setOwnerName('');
    setOwnerPhone('');
    setUseExistingPet(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      toast({
        title: "Erro ao agendar",
        description: "Selecione pelo menos um serviço.",
        variant: "destructive"
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "Erro ao agendar",
        description: "Selecione uma data para o agendamento.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, we would save the data to a database
    toast({
      title: "Agendamento Criado",
      description: `${petName} foi agendado para ${format(date, "dd/MM/yyyy")} às ${time}.`,
      action: (
        <Button variant="outline" size="sm" className="bg-petYellow/20">
          <Check className="h-4 w-4" />
        </Button>
      )
    });
    
    // Navigate back to appointments
    navigate('/');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-petBrown">Novo Agendamento</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Pet Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-petYellow-light">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-petOrange" />
            <span>Informações do Pet</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <Label className="text-sm text-petBrown/70">Escolha um pet cadastrado ou cadastre um novo</Label>
              <div className="flex items-center mt-1 space-x-2">
                <Select 
                  value={selectedPet} 
                  onValueChange={handlePetSelection}
                  disabled={!useExistingPet}
                >
                  <SelectTrigger className={`pet-input ${!useExistingPet ? 'opacity-50' : ''}`}>
                    <SelectValue placeholder="Selecione um pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map(pet => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  type="button"
                  variant={useExistingPet ? "outline" : "default"}
                  onClick={() => setUseExistingPet(!useExistingPet)}
                  className={!useExistingPet ? "bg-petYellow hover:bg-petYellow-dark text-petBrown" : ""}
                >
                  {useExistingPet ? "Novo Pet" : "Pet Existente"}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="petName" className="text-sm text-petBrown/70">Nome do Pet</Label>
              <Input 
                id="petName" 
                value={petName} 
                onChange={(e) => setPetName(e.target.value)} 
                className="pet-input"
                required
                disabled={useExistingPet && selectedPet}
              />
            </div>
            
            <div>
              <Label htmlFor="petType" className="text-sm text-petBrown/70">Tipo de Animal</Label>
              <Select 
                value={petType} 
                onValueChange={(value) => setPetType(value as PetType)}
                disabled={useExistingPet && selectedPet}
              >
                <SelectTrigger id="petType" className="pet-input">
                  <SelectValue placeholder="Tipo de Animal" />
                </SelectTrigger>
                <SelectContent>
                  {petTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="petBreed" className="text-sm text-petBrown/70">Raça</Label>
              <Input 
                id="petBreed" 
                value={petBreed} 
                onChange={(e) => setPetBreed(e.target.value)} 
                className="pet-input"
                disabled={useExistingPet && selectedPet}
              />
            </div>
            
            <div>
              <Label htmlFor="petWeight" className="text-sm text-petBrown/70">Peso (kg)</Label>
              <Input 
                id="petWeight" 
                type="number" 
                step="0.1" 
                min="0"
                value={petWeight} 
                onChange={(e) => setPetWeight(e.target.value)} 
                className="pet-input"
                disabled={useExistingPet && selectedPet}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="petNotes" className="text-sm text-petBrown/70">Observações Especiais</Label>
              <Textarea 
                id="petNotes" 
                value={petNotes} 
                onChange={(e) => setPetNotes(e.target.value)} 
                placeholder="Ex: Alergias, comportamento, cuidados específicos..."
                className="pet-input min-h-[100px] resize-none"
                disabled={useExistingPet && selectedPet}
              />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-petOrange" />
            <span>Dados do Tutor</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ownerName" className="text-sm text-petBrown/70">Nome do Tutor</Label>
              <Input 
                id="ownerName" 
                value={ownerName} 
                onChange={(e) => setOwnerName(e.target.value)} 
                className="pet-input"
                required
                disabled={useExistingPet && selectedPet}
              />
            </div>
            
            <div>
              <Label htmlFor="ownerPhone" className="text-sm text-petBrown/70">Telefone</Label>
              <Input 
                id="ownerPhone" 
                value={ownerPhone} 
                onChange={(e) => setOwnerPhone(e.target.value)} 
                placeholder="(00) 00000-0000"
                className="pet-input"
                required
                disabled={useExistingPet && selectedPet}
              />
            </div>
          </div>
        </div>
        
        {/* Services */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-petYellow-light">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
            <List className="h-5 w-5 text-petOrange" />
            <span>Serviços</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map(service => {
              const ServiceIcon = service.icon;
              const isSelected = selectedServices.includes(service.id);
              
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceToggle(service.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected 
                      ? 'border-petOrange bg-petOrange/10' 
                      : 'border-gray-200 hover:border-petYellow hover:bg-petYellow/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${isSelected ? 'bg-petOrange/20' : 'bg-gray-100'}`}>
                        {ServiceIcon && <ServiceIcon className={`h-4 w-4 ${isSelected ? 'text-petOrange' : 'text-gray-500'}`} />}
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-petOrange bg-petOrange' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-petBrown/70">{service.duration} min</span>
                    <span className="font-medium">R$ {service.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {selectedServices.length === 0 && (
            <p className="text-sm text-red-500 mt-4">Selecione pelo menos um serviço</p>
          )}
        </div>
        
        {/* Date and Time */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-petYellow-light">
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-petOrange" />
            <span>Data e Hora</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm text-petBrown/70 mb-2 block">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="pet-input w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Escolha uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="time" className="text-sm text-petBrown/70 mb-2 block">Horário</Label>
              <div className="relative">
                <Input 
                  id="time" 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  className="pet-input"
                  min="08:00"
                  max="18:00"
                  required
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-petBrown/50" size={18} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-petOrange hover:bg-petOrange-dark text-white"
          >
            Agendar Serviço
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
