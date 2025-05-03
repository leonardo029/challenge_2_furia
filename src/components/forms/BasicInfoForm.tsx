import React from 'react';
import { FormStepProps } from '../../types';
import { User, Mail, MapPin, Hash } from 'lucide-react';

const BasicInfoForm: React.FC<FormStepProps> = ({ userData, setUserData, nextStep }) => {
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value
      }
    }));
  };

  const validateCPF = (cpf: string): boolean => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    
    if (!userData.basicInfo.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!userData.basicInfo.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(userData.basicInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!userData.basicInfo.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(userData.basicInfo.cpf)) {
      newErrors.cpf = 'O formato do CPF deve ser 123.456.789-00';
    }
    
    if (!userData.basicInfo.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Informações Pessoais</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center mb-1">
              <User size={16} className="mr-2" />
              <span>Nome Completo</span>
            </label>
            <input
              type="text"
              name="name"
              value={userData.basicInfo.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Digite seu nome completo"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>} 
          </div>
          
          <div>
            <label className="flex items-center mb-1">
              <Mail size={16} className="mr-2" />
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={userData.basicInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Digite seu email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="flex items-center mb-1">
              <Hash size={16} className="mr-2" />
              <span>CPF</span>
            </label>
            <input
              type="text"
              name="cpf"
              value={userData.basicInfo.cpf}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="123.456.789-00"
            />
            {errors.cpf && <p className="text-red-400 text-sm mt-1">{errors.cpf}</p>}
          </div>
          
          <div>
            <label className="flex items-center mb-1">
              <MapPin size={16} className="mr-2" />
              <span>Endereço</span>
            </label>
            <input
              type="text"
              name="address"
              value={userData.basicInfo.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Digite seu endereço completo"
            />
            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center mb-1">
                <span>Cidade</span>
              </label>
              <input
                type="text"
                name="city"
                value={userData.basicInfo.city}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Cidade"
              />
            </div>
            
            <div>
              <label className="flex items-center mb-1">
                <span>Estado</span>
              </label>
              <input
                type="text"
                name="state"
                value={userData.basicInfo.state}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Estado"
              />
            </div>
          </div>
          
          <div>
            <label className="flex items-center mb-1">
              <span>CEP</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={userData.basicInfo.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="CEP"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-300 text-black hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center"
          >
            Próxima Etapa
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;