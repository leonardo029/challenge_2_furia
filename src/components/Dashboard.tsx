import React, { useState } from 'react';
import { UserData } from '../types';
import { 
  UserCircle, Trophy, Calendar, ShoppingBag, 
  Gamepad, BarChart3, Twitter, Facebook, 
  Instagram, ExternalLink, Mail, MapPin, Hash, 
  User
} from 'lucide-react';

interface DashboardProps {
  userData: UserData;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const calculateCompleteness = (): number => {
    let score = 0;
    const total = 5;
    
    if (userData.basicInfo.name && userData.basicInfo.email && userData.basicInfo.cpf && userData.basicInfo.address) {
      score += 1;
    }
    
    if (userData.interests.favoriteGames.length > 0 || userData.interests.favoriteTeams.length > 0) {
      score += 1;
    }
    
    if (userData.documents.validationStatus === 'approved') {
      score += 1;
    }
    
    if (userData.socialMedia.length > 0) {
      score += 1;
    }
    
    if (userData.esportsProfiles.length > 0) {
      score += 1;
    }
    
    return Math.round((score / total) * 100);
  };
  
  const calculateFanScore = (): number => {
    let score = 0;
    
    score += Math.min(userData.interests.favoriteGames.length * 5, 25);
    score += Math.min(userData.interests.favoriteTeams.length * 5, 20);
    score += Math.min(userData.interests.attendedEvents.length * 10, 20);
    
    if (userData.interests.purchasedMerchandise) {
      score += 15;
    }
    
    const socialScore = userData.socialMedia.reduce((acc, social) => {
      return acc + (social.relevanceScore || 0) / 20;
    }, 0);
    score += Math.min(socialScore, 10);
    
    const profileScore = userData.esportsProfiles.reduce((acc, profile) => {
      return acc + (profile.relevanceScore || 0) / 20;
    }, 0);
    score += Math.min(profileScore, 10);
    
    return Math.min(Math.round(score), 100);
  };
  
  const completenessScore = calculateCompleteness();
  const fanScore = calculateFanScore();
  
  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-lg p-5">
        <h3 className="font-semibold text-lg mb-3">Preenchimento do Perfil</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progresso</span>
          <span className="text-sm font-medium text-blue-400">{completenessScore}%</span>
        </div>
        <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${completenessScore}%` }}
          ></div>
        </div>
        <div className="mt-4">
          {completenessScore < 100 && (
            <p className="text-sm text-gray-400">
              Continue! Complete todas as seções para obter o perfil de fã mais preciso.
            </p>
          )}
          {completenessScore === 100 && (
            <p className="text-sm text-green-400">
              Parabéns! Seu perfil está completo.
            </p>
          )}
        </div>
      </div>
  
      <div className="bg-gray-800 rounded-lg p-5">
        <h3 className="font-semibold text-lg mb-3">Sua Pontuação de Fã</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-8 border-gray-700"></div>
              <div 
                className="absolute w-28 h-28 rounded-full border-8 border-transparent border-t-blue-500 border-r-purple-500 transition-all duration-500 ease-out"
                style={{ transform: `rotate(${fanScore * 3.6}deg)` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{fanScore}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-400">
            {fanScore < 40 && 'Você está começando sua jornada nos esports!'}
            {fanScore >= 40 && fanScore < 70 && 'Você é um entusiasta dos esports!'}
            {fanScore >= 70 && fanScore < 90 && 'Você é um fã dedicado dos esports!'}
            {fanScore >= 90 && 'Você é um super fã hardcore dos esports!'}
          </p>
        </div>
      </div>
  
      <div className="bg-gray-800 rounded-lg p-5">
        <div className="flex items-center mb-3">
          <UserCircle size={20} className="text-white mr-2" />
          <h3 className="font-semibold text-lg">Informações Pessoais</h3>
        </div>
  
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <User size={16} className="text-white" />
            <span className="text-gray-400">Nome:</span>
            <span>{userData.basicInfo.name || 'Não informado'}</span>
          </div>
  
          <div className="flex items-center space-x-2 text-gray-300">
            <Mail size={16} className="text-white" />
            <span className="text-gray-400">Email:</span>
            <span>{userData.basicInfo.email || 'Não informado'}</span>
          </div>
  
          <div className="flex items-center space-x-2 text-gray-300">
            <Hash size={16} className="text-white" />
            <span className="text-gray-400">CPF:</span>
            <span>{userData.basicInfo.cpf || 'Não informado'}</span>
          </div>
  
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin size={16} className="text-white" />
            <span className="text-gray-400">Localização:</span>
            <span>
              {userData.basicInfo.city && userData.basicInfo.state
                ? `${userData.basicInfo.city}, ${userData.basicInfo.state}`
                : 'Não informado'}
            </span>
          </div>
        </div>
      </div>
  
      <div className="bg-gray-800 rounded-lg p-5">
        <div className="flex items-center mb-3">
          <Gamepad size={20} className="text-white mr-2" />
          <h3 className="font-semibold text-lg">Interesses de Jogos</h3>
        </div>
  
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-400 block mb-1">Jogos Favoritos:</span>
            <div className="flex flex-wrap gap-2">
              {userData.interests.favoriteGames.slice(0, 3).map((game, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-gray-700 rounded text-xs text-blue-300">
                  {game}
                </span>
              ))}
              {userData.interests.favoriteGames.length === 0 && (
                <span className="text-sm text-gray-500 italic">Nenhum selecionado</span>
              )}
            </div>
          </div>
  
          <div>
            <span className="text-sm text-gray-400 block mb-1">Times Favoritos:</span>
            <div className="flex flex-wrap gap-2">
              {userData.interests.favoriteTeams.slice(0, 3).map((team, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-gray-700 rounded text-xs text-purple-300">
                  {team}
                </span>
              ))}
              {userData.interests.favoriteTeams.length === 0 && (
                <span className="text-sm text-gray-500 italic">Nenhum selecionado</span>
              )}
            </div>
          </div>
  
          <div>
            <span className="text-sm text-gray-400 block mb-1">Eventos Participados:</span>
            <span className="text-sm text-gray-200">
              {userData.interests.attendedEvents.length} eventos no último ano
            </span>
          </div>
        </div>
      </div>
    </div>
  );  
  
  const renderGaming = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-5">
        <div className="flex items-center mb-4">
          <Gamepad size={20} className="text-blue-400 mr-2" />
          <h3 className="font-semibold text-lg text-gray-200">Seus Jogos Favoritos</h3>
        </div>
  
        {userData.interests.favoriteGames.length > 0 ? (
          <div className="space-y-3">
            {userData.interests.favoriteGames.map((game, index) => (
              <div key={index} className="flex items-center bg-gray-700 p-3 rounded-lg">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <Gamepad size={20} className="text-blue-400" />
                </div>
                <span className="text-gray-200">{game}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            Nenhum jogo favorito adicionado ainda.
          </p>
        )}
      </div>
  
      <div className="bg-gray-800 rounded-lg p-5">
        <div className="flex items-center mb-4">
          <Trophy size={20} className="text-purple-400 mr-2" />
          <h3 className="font-semibold text-lg text-gray-200">Seus Times Favoritos</h3>
        </div>
  
        {userData.interests.favoriteTeams.length > 0 ? (
          <div className="space-y-3">
            {userData.interests.favoriteTeams.map((team, index) => (
              <div key={index} className="flex items-center bg-gray-700 p-3 rounded-lg">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <Trophy size={20} className="text-purple-400" />
                </div>
                <span className="text-gray-200">{team}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            Nenhum time favorito adicionado ainda.
          </p>
        )}
      </div>
  
      <div className="bg-gray-800 rounded-lg p-5">
        <div className="flex items-center mb-4">
          <Calendar size={20} className="text-green-400 mr-2" />
          <h3 className="font-semibold text-lg text-gray-200">Eventos Participados</h3>
        </div>
  
        {userData.interests.attendedEvents.length > 0 ? (
          <div className="space-y-3">
            {userData.interests.attendedEvents.map((event, index) => (
              <div key={index} className="flex items-center bg-gray-700 p-3 rounded-lg">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <Calendar size={20} className="text-green-400" />
                </div>
                <span className="text-gray-200">{event}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            Nenhum evento adicionado ainda.
          </p>
        )}
      </div>
  
      {userData.interests.purchasedMerchandise && (
        <div className="bg-gray-800 rounded-lg p-5">
          <div className="flex items-center mb-4">
            <ShoppingBag size={20} className="text-white mr-2" />
            <h3 className="font-semibold text-lg text-gray-200">Compras de Produtos</h3>
          </div>
  
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300">
              {userData.interests.purchaseDetails || 'Você comprou produtos de esports no último ano.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );  
  
  const renderSocial = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-5">
        <h3 className="font-semibold text-lg text-gray-200 mb-4">Redes Sociais Conectadas</h3>
  
        {userData.socialMedia.length > 0 ? (
          <div className="space-y-4">
            {userData.socialMedia.map((account, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                      {account.platform === 'twitter' && <Twitter size={20} className="text-blue-400" />}
                      {account.platform === 'instagram' && <Instagram size={20} className="text-purple-400" />}
                      {account.platform === 'facebook' && <Facebook size={20} className="text-blue-500" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200 capitalize">{account.platform}</h4>
                      <p className="text-sm text-gray-400">@{account.username}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-600 rounded-full flex items-center">
                      <BarChart3 size={16} className="text-blue-300 mr-2" />
                      <span className="text-sm text-blue-300 font-medium">{account.relevanceScore}%</span>
                    </div>
                  </div>
                </div>
  
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Interações com Esports</span>
                    <span className="text-sm text-blue-300">{account.interactionCount}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
                      style={{ width: `${account.relevanceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            Nenhuma conta de rede social conectada ainda.
          </p>
        )}
      </div>
  
      <div className="bg-gray-800 rounded-lg p-5">
        <h3 className="font-semibold text-lg text-gray-200 mb-4">Perfis de Jogos</h3>
  
        {userData.esportsProfiles.length > 0 ? (
          <div className="space-y-4">
            {userData.esportsProfiles.map((profile, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                      <Gamepad size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200 capitalize">{profile.platform}</h4>
                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline flex items-center"
                      >
                        Ver Perfil <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
  
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-gray-600 rounded-full flex items-center">
                      <BarChart3 size={16} className="text-blue-300 mr-2" />
                      <span className="text-sm text-blue-300 font-medium">{profile.relevanceScore}%</span>
                    </div>
                  </div>
                </div>
  
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Relevância do Conteúdo</span>
                    <span className="text-sm text-blue-300">{profile.relevanceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
                      style={{ width: `${profile.relevanceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            Nenhum perfil de jogo adicionado ainda.
          </p>
        )}
      </div>
    </div>
  );
    

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Seu Perfil de Fã</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Com base nas suas informações, analisamos o seu perfil de fã de esports. 
          Aqui está o que sabemos sobre você.
        </p>
      </div>
  
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 rounded-full p-1 inline-flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2 rounded-full transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('gaming')}
            className={`px-5 py-2 rounded-full transition-colors duration-200 ${
              activeTab === 'gaming'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Jogos
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-5 py-2 rounded-full transition-colors duration-200 ${
              activeTab === 'social'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Social & Perfis
          </button>
        </div>
      </div>
  
      <div className="mb-2">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'gaming' && renderGaming()}
        {activeTab === 'social' && renderSocial()}
      </div>
    </div>
  );
  
};

export default Dashboard;