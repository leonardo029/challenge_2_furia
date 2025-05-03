import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { Link as LinkIcon, ExternalLink, AlertTriangle, CheckCircle, Trash } from 'lucide-react';

interface PlatformOption {
  id: string;
  name: string;
  placeholder: string;
}

const platforms: PlatformOption[] = [
  { 
    id: 'steam', 
    name: 'Steam', 
    placeholder: 'Digite a URL do seu perfil Steam'
  },
  { 
    id: 'battlenet', 
    name: 'Battle.net', 
    placeholder: 'Digite a URL do seu perfil Battle.net'
  },
  { 
    id: 'leagueoflegends', 
    name: 'League of Legends', 
    placeholder: 'Digite a URL do seu perfil League of Legends'
  },
  { 
    id: 'valorant', 
    name: 'Valorant', 
    placeholder: 'Digite a URL do seu perfil Valorant'
  },
  { 
    id: 'faceit', 
    name: 'FACEIT', 
    placeholder: 'Digite a URL do seu perfil FACEIT'
  }
];

const EsportsProfilesForm: React.FC<FormStepProps> = ({ userData, setUserData, nextStep, prevStep }) => {
  const [platform, setPlatform] = useState(platforms[0].id);
  const [profileUrl, setProfileUrl] = useState('');
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState('');
  
  const handleValidate = () => {
    if (!profileUrl.trim() || !profileUrl.startsWith('http')) {
      setError('Por favor, insira uma URL válida');
      return;
    }

    setError('');
    setValidating(true);

    setTimeout(() => {
      setValidating(false);

      const existingIndex = userData.esportsProfiles.findIndex(
        ep => ep.platform === platform
      );

      const newProfile = {
        platform,
        profileUrl,
        validated: true,
        relevanceScore: Math.floor(Math.random() * 40) + 60
      };

      if (existingIndex >= 0) {
        const updatedProfiles = [...userData.esportsProfiles];
        updatedProfiles[existingIndex] = newProfile;

        setUserData(prev => ({
          ...prev,
          esportsProfiles: updatedProfiles
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          esportsProfiles: [...prev.esportsProfiles, newProfile]
        }));
      }

      setProfileUrl('');
    }, 2500);
  };

  const handleRemoveProfile = (platformId: string) => {
    setUserData(prev => ({
      ...prev,
      esportsProfiles: prev.esportsProfiles.filter(ep => ep.platform !== platformId)
    }));
  };

  const getPlatformDetails = (platformId: string) => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Perfis de Jogos</h2>

      <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <LinkIcon size={24} className="text-blue-300 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-300">Conecte seus perfis de jogos</h3>
            <p className="text-gray-300 text-sm">
              Vincule seus perfis das plataformas de jogos e e-sports para completar seu perfil de fã. 
              Nossa IA irá validar e analisar sua atividade para melhorar sua experiência.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-4">Adicionar Perfil</h3>

          <div className="space-y-4">
            <div>
              <label className="text-gray-300 mb-1 block">Plataforma</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {platforms.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-300 mb-1 block">URL do Perfil</label>
              <input
                type="text"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder={getPlatformDetails(platform).placeholder}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="button"
              onClick={handleValidate}
              disabled={validating}
              className={`w-full flex justify-center items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                validating
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-300 text-black'
              }`}
            >
              {validating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validando com IA...
                </>
              ) : (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Validar e Adicionar
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-4">Seus Perfis</h3>

          {userData.esportsProfiles.length > 0 ? (
            <div className="space-y-3">
              {userData.esportsProfiles.map((profile, index) => {
                const platform = getPlatformDetails(profile.platform);

                return (
                  <div key={index} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-200">{platform.name}</span>
                          {profile.validated ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-800 text-green-200">
                              <CheckCircle size={12} className="mr-1" />
                              Validado
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-800 text-yellow-200">
                              <AlertTriangle size={12} className="mr-1" />
                              Pendente
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center">
                            <span className="truncate max-w-xs">{profile.profileUrl}</span>
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-800 px-3 py-1 rounded-full">
                          <span className="text-sm font-bold text-blue-300">{profile.relevanceScore}%</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveProfile(profile.platform)}
                          className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Nenhum perfil adicionado ainda. Adicione acima.
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 flex items-center text-white"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Voltar
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-gray-100 hover:bg-white rounded-md transition-colors duration-200 flex items-center text-black"
          >
            Finalizar e Ver Perfil
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EsportsProfilesForm;
