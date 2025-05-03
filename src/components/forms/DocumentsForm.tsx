import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { FileText, Upload, AlertCircle, CheckCircle } from 'lucide-react';

const DocumentsForm: React.FC<FormStepProps> = ({ userData, setUserData, nextStep, prevStep }) => {
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setErrors(prev => ({ ...prev, idDocument: 'Por favor, envie uma imagem JPG ou PNG' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, idDocument: 'O tamanho do arquivo deve ser menor que 5MB' }));
        return;
      }
      
      setErrors(prev => ({ ...prev, idDocument: '' }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setUserData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          idDocument: file,
          validationStatus: 'pending'
        }
      }));
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setErrors(prev => ({ ...prev, selfie: 'Por favor, envie uma imagem JPG ou PNG' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, selfie: 'O tamanho do arquivo deve ser menor que 5MB' }));
        return;
      }
      
      setErrors(prev => ({ ...prev, selfie: '' }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setSelfiePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setUserData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          selfie: file,
          validationStatus: 'pending'
        }
      }));
    }
  };

  const validateDocuments = () => {
    if (!userData.documents.idDocument || !userData.documents.selfie) {
      setErrors(prev => ({ 
        ...prev, 
        general: 'Tanto o documento de identidade quanto a selfie são necessários para validação' 
      }));
      return;
    }
    
    setErrors({});
    setIsValidating(true);
    
    setTimeout(() => {
      setIsValidating(false);
      
      setUserData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          validationStatus: 'approved',
          validationMessage: 'Identidade validada com sucesso. Os documentos correspondem às informações do seu perfil.'
        }
      }));
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userData.documents.validationStatus !== 'approved') {
      setErrors(prev => ({ 
        ...prev, 
        general: 'Por favor, valide seus documentos antes de prosseguir' 
      }));
      return;
    }
    
    setErrors({});
    nextStep();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Verificação de Identidade</h2>
      
      <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <AlertCircle size={24} className="text-blue-300 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-300">Por que precisamos disso?</h3>
            <p className="text-gray-300 text-sm">
              Para fornecer experiências personalizadas e garantir perfis de fãs genuínos, 
              precisamos verificar sua identidade. Seus documentos são processados com segurança usando IA 
              e não são armazenados após a validação.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center mb-2">
            <FileText size={18} className="mr-2" />
            <span className="text-lg">Documento de Identidade</span>
          </label>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            {idPreview ? (
              <div className="space-y-3">
                <div className="relative w-48 h-36 mx-auto">
                  <img 
                    src={idPreview} 
                    alt="Prévia do Documento" 
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIdPreview(null);
                      setUserData(prev => ({
                        ...prev,
                        documents: {
                          ...prev.documents,
                          idDocument: null,
                          validationStatus: 'pending'
                        }
                      }));
                    }}
                    className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1 text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-400">{userData.documents.idDocument?.name}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload size={36} className="mx-auto text-gray-500" />
                <p className="text-gray-400">
                  Arraste e solte seu documento de identidade
                </p>
                <p className="text-xs text-gray-500">
                  Formatos suportados: JPG, PNG (máx 5MB)
                </p>
                <input
                  type="file"
                  id="idDocument"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleIdUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('idDocument')?.click()}
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
                >
                  Selecionar Arquivo
                </button>
              </div>
            )}
          </div>
          {errors.idDocument && <p className="text-red-400 text-sm mt-1">{errors.idDocument}</p>}
        </div>
        
        <div>
          <label className="flex items-center mb-2">
            <Upload size={18} className="mr-2" />
            <span className="text-lg">Foto</span>
          </label>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            {selfiePreview ? (
              <div className="space-y-3">
                <div className="relative w-36 h-36 mx-auto">
                  <img 
                    src={selfiePreview} 
                    alt="Prévia da Selfie" 
                    className="w-full h-full object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelfiePreview(null);
                      setUserData(prev => ({
                        ...prev,
                        documents: {
                          ...prev.documents,
                          selfie: null,
                          validationStatus: 'pending'
                        }
                      }));
                    }}
                    className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1 text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-400">{userData.documents.selfie?.name}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload size={36} className="mx-auto text-gray-500" />
                <p className="text-gray-400">
                  Envie uma foto selfie clara, ou <span className="text-blue-400">tire uma foto</span>
                </p>
                <p className="text-xs text-gray-500">
                  Uma foto clara e bem iluminada do seu rosto (máx 5MB)
                </p>
                <input
                  type="file"
                  id="selfie"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleSelfieUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('selfie')?.click()}
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
                >
                  Selecionar Arquivo
                </button>
              </div>
            )}
          </div>
          {errors.selfie && <p className="text-red-400 text-sm mt-1">{errors.selfie}</p>}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Status da Validação</h3>
            <div>
              {userData.documents.validationStatus === 'approved' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-800 text-green-200">
                  <CheckCircle size={16} className="mr-1" />
                  Aprovado
                </span>
              ) : userData.documents.validationStatus === 'processing' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-800 text-yellow-200">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-200" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando
                </span>
              ) : userData.documents.validationStatus === 'rejected' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-800 text-red-200">
                  <AlertCircle size={16} className="mr-1" />
                  Rejeitado
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                  Pendente
                </span>
              )}
            </div>
          </div>
          
          {userData.documents.validationMessage && (
            <p className={`text-sm ${
              userData.documents.validationStatus === 'approved' 
                ? 'text-green-300' 
                : userData.documents.validationStatus === 'rejected'
                  ? 'text-red-300'
                  : 'text-gray-400'
            }`}>
              {userData.documents.validationMessage}
            </p>
          )}
          
          <div className="mt-4">
            <button
              type="button"
              onClick={validateDocuments}
              disabled={!userData.documents.idDocument || !userData.documents.selfie || isValidating}
              className={`w-full px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center ${
                !userData.documents.idDocument || !userData.documents.selfie || isValidating
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              {isValidating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validando...
                </>
              ) : userData.documents.validationStatus === 'approved' ? (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Validado
                </>
              ) : (
                'Validar Identidade com IA'
              )}
            </button>
          </div>
        </div>
        
        {errors.general && (
          <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-lg p-3 text-red-300 text-sm">
            <div className="flex items-center">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              {errors.general}
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Voltar
          </button>
          
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

export default DocumentsForm;