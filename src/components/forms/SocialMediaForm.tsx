import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { UserCheck, Twitter, Facebook, Instagram, Unlink, Link as LinkIcon } from 'lucide-react';

interface PlatformOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
}

const platforms: PlatformOption[] = [
  { 
    id: 'twitter', 
    name: 'Twitter', 
    icon: <Twitter size={18} className="text-blue-400" />,
    placeholder: '@username'
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: <Instagram size={18} className="text-purple-400" />,
    placeholder: 'username'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: <Facebook size={18} className="text-blue-500" />,
    placeholder: 'profile.name'
  }
];

const SocialMediaForm: React.FC<FormStepProps> = ({ userData, setUserData, nextStep, prevStep }) => {
  const [socialPlatform, setSocialPlatform] = useState('twitter');
  const [username, setUsername] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  
  const handleConnect = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setError('');
    setConnecting(true);
    
    setTimeout(() => {
      setConnecting(false);
      
      const existingIndex = userData.socialMedia.findIndex(
        sm => sm.platform === socialPlatform
      );
      
      const newSocialMedia = {
        platform: socialPlatform,
        username: username,
        connected: true,
        relevanceScore: Math.floor(Math.random() * 40) + 60,
        interactionCount: Math.floor(Math.random() * 500) + 50
      };
      
      if (existingIndex >= 0) {
        const updatedSocialMedia = [...userData.socialMedia];
        updatedSocialMedia[existingIndex] = newSocialMedia;
        
        setUserData(prev => ({
          ...prev,
          socialMedia: updatedSocialMedia
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          socialMedia: [...prev.socialMedia, newSocialMedia]
        }));
      }
      
      setUsername('');
    }, 2000);
  };
  
  const handleDisconnect = (platform: string) => {
    setUserData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter(sm => sm.platform !== platform)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const getPlatformDetails = (platformId: string) => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Contas em Redes Sociais</h2>
  
      <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <UserCheck size={24} className="text-blue-300 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-300">Melhore seu Perfil de Fã</h3>
            <p className="text-gray-300 text-sm">
              Conecte suas contas de redes sociais para analisar seu engajamento com esports.
              Vamos identificar conteúdos, times e jogos com os quais você interage para criar
              um perfil de fã mais completo.
            </p>
          </div>
        </div>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-4">Conectar uma Conta</h3>
  
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => setSocialPlatform(platform.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                    socialPlatform === platform.id
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {platform.icon}
                  <span className="ml-2">{platform.name}</span>
                </button>
              ))}
            </div>
  
            <div className="flex">
              <div className="flex items-center bg-gray-700 rounded-l-md px-3">
                {getPlatformDetails(socialPlatform).icon}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={getPlatformDetails(socialPlatform).placeholder}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
  
            {error && <p className="text-red-400 text-sm">{error}</p>}
  
            <button
              type="button"
              onClick={handleConnect}
              disabled={connecting}
              className={`w-full flex justify-center items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                connecting
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-white text-black'
              }`}
            >
              {connecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Conectando...
                </>
              ) : (
                <>
                  <LinkIcon size={18} className="mr-2" />
                  Conectar Conta
                </>
              )}
            </button>
          </div>
        </div>
  
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-4">Contas Conectadas</h3>
  
          {userData.socialMedia.length > 0 ? (
            <div className="space-y-3">
              {userData.socialMedia.map((account, index) => {
                const platform = getPlatformDetails(account.platform);
  
                return (
                  <div key={index} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {platform.icon}
                        <span className="ml-2 font-medium text-gray-200">{platform.name}</span>
                        <span className="ml-2 text-gray-400">@{account.username}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDisconnect(account.platform)}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                      >
                        <Unlink size={18} />
                      </button>
                    </div>
  
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-xs text-gray-400 mb-1">Pontuação de Relevância</div>
                        <div className="text-lg font-bold text-blue-300">{account.relevanceScore}%</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-xs text-gray-400 mb-1">Interações com Esports</div>
                        <div className="text-lg font-bold text-purple-300">{account.interactionCount}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Nenhuma conta conectada ainda. Conecte suas redes sociais acima.
            </p>
          )}
        </div>
  
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Voltar
          </button>
  
          <button
            type="submit"
            className="px-6 py-2 bg-gray-300 text-black hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center"
          >
            Próxima Etapa
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default SocialMediaForm;