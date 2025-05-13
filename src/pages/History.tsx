
import React from 'react';
import { Clock } from 'lucide-react';

const History: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-petBrown">Histórico</h1>
      
      <div className="text-center py-16 bg-white rounded-2xl border border-petYellow-light">
        <div className="bg-petYellow/30 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <Clock className="h-8 w-8 text-petBrown" />
        </div>
        <h3 className="text-lg font-medium mb-1">Histórico de Atendimentos</h3>
        <p className="text-petBrown/70 max-w-md mx-auto">
          Aqui você verá o histórico completo de atendimentos realizados na sua clínica pet.
        </p>
      </div>
    </div>
  );
};

export default History;
