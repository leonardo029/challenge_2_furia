import React from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    'Informações Básicas',
    'Interesses',
    'Documentos',
    'Redes Sociais',
    'Perfis de Esports'
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${index + 1 < currentStep 
                    ? 'bg-gray-900 text-white' 
                    : index + 1 === currentStep 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-700 text-gray-300'}
                  transition-all duration-300
                `}
              >
                {index + 1 < currentStep ? '✓' : index + 1}
              </div>
              <span 
                className={`
                  mt-2 text-xs hidden sm:block
                  ${index + 1 <= currentStep ? 'text-white' : 'text-gray-400'}
                `}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`
                  h-1 flex-1 mx-1
                  ${index + 1 < currentStep ? 'bg-gray-900' : 'bg-gray-700'}
                  transition-all duration-300
                `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center text-gray-300 text-sm">
        Etapa {currentStep} de {totalSteps}
      </div>
    </div>
  );
};

export default FormProgress;