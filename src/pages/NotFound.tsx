
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PawPrint, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-petYellow rounded-full opacity-20 animate-ping"></div>
          <div className="bg-petYellow rounded-full p-6 relative inline-block">
            <PawPrint className="h-16 w-16 text-petOrange" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-petBrown mb-4">Página não encontrada</h1>
        <p className="text-petBrown/70 mb-8">
          Essa página parece ter fugido como um cachorrinho travesso! Vamos voltar para a página inicial?
        </p>
        
        <Link to="/">
          <Button className="bg-petOrange hover:bg-petOrange-dark text-white">
            <Home className="mr-2 h-4 w-4" />
            Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
