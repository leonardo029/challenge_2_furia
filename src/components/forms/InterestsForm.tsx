import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { Gamepad, Trophy, Calendar, ShoppingBag } from 'lucide-react';

const popularGames = [
  'Counter-Strike 2', 'League of Legends', 'Dota 2', 'Valorant', 
  'Overwatch 2', 'Fortnite', 'Apex Legends', 'Rainbow Six Siege'
];

const popularTeams = [
  'FURIA', 'MIBR', 'Team Liquid', 'Cloud9', 'G2 Esports', 
  'Fnatic', 'NaVi', 'FaZe Clan', 'T1', 'Evil Geniuses'
];

const InterestsForm: React.FC<FormStepProps> = ({ userData, setUserData, nextStep, prevStep }) => {
  const [selectedGames, setSelectedGames] = useState<string[]>(userData.interests.favoriteGames);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(userData.interests.favoriteTeams);
  const [customGame, setCustomGame] = useState('');
  const [customTeam, setCustomTeam] = useState('');
  const [customEvent, setCustomEvent] = useState('');

  const handleGameSelection = (game: string) => {
    setSelectedGames(prev => 
      prev.includes(game) 
        ? prev.filter(g => g !== game) 
        : [...prev, game]
    );
  };

  const handleTeamSelection = (team: string) => {
    setSelectedTeams(prev => 
      prev.includes(team) 
        ? prev.filter(t => t !== team) 
        : [...prev, team]
    );
  };

  const addCustomGame = () => {
    if (customGame.trim() && !selectedGames.includes(customGame.trim())) {
      setSelectedGames(prev => [...prev, customGame.trim()]);
      setCustomGame('');
    }
  };

  const addCustomTeam = () => {
    if (customTeam.trim() && !selectedTeams.includes(customTeam.trim())) {
      setSelectedTeams(prev => [...prev, customTeam.trim()]);
      setCustomTeam('');
    }
  };

  const addEvent = () => {
    if (customEvent.trim() && !userData.interests.attendedEvents.includes(customEvent.trim())) {
      setUserData(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          attendedEvents: [...prev.interests.attendedEvents, customEvent.trim()]
        }
      }));
      setCustomEvent('');
    }
  };

  const removeEvent = (event: string) => {
    setUserData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        attendedEvents: prev.interests.attendedEvents.filter(e => e !== event)
      }
    }));
  };

  const togglePurchasedMerchandise = () => {
    setUserData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        purchasedMerchandise: !prev.interests.purchasedMerchandise
      }
    }));
  };

  const handlePurchaseDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        purchaseDetails: e.target.value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUserData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        favoriteGames: selectedGames,
        favoriteTeams: selectedTeams
      }
    }));
    
    nextStep();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Interesses em Esports</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center mb-3">
            <Gamepad size={18} className="mr-2" />
            <span className="text-lg">Jogos Favoritos</span>
          </label>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {popularGames.map(game => (
              <button
                key={game}
                type="button"
                onClick={() => handleGameSelection(game)}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                  selectedGames.includes(game)
                    ? 'bg-gray-100 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={customGame}
              onChange={(e) => setCustomGame(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Adicionar outro jogo..."
            />
            <button
              type="button"
              onClick={addCustomGame}
              className="px-4 py-2 bg-gray-600 rounded-r-md hover:bg-gray-500 transition-colors duration-200"
            >
              Adicionar
            </button>
          </div>
        </div>
  
        <div>
          <label className="flex items-center mb-3">
            <Trophy size={18} className="mr-2" />
            <span className="text-lg">Times Favoritos</span>
          </label>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {popularTeams.map(team => (
              <button
                key={team}
                type="button"
                onClick={() => handleTeamSelection(team)}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                  selectedTeams.includes(team)
                    ? 'bg-gray-100 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {team}
              </button>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={customTeam}
              onChange={(e) => setCustomTeam(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Adicionar outro time..."
            />
            <button
              type="button"
              onClick={addCustomTeam}
              className="px-4 py-2 bg-gray-600 rounded-r-md hover:bg-gray-500 transition-colors duration-200"
            >
              Adicionar
            </button>
          </div>
        </div>
  
        <div>
          <label className="flex items-center mb-3">
            <Calendar size={18} className="mr-2" />
            <span className="text-lg">Eventos Participados (Último Ano)</span>
          </label>
          
          <div className="flex mb-3">
            <input
              type="text"
              value={customEvent}
              onChange={(e) => setCustomEvent(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Adicione um evento que participou..."
            />
            <button
              type="button"
              onClick={addEvent}
              className="px-4 py-2 bg-gray-600 rounded-r-md hover:bg-gray-500 transition-colors duration-200"
            >
              Adicionar
            </button>
          </div>
  
          {userData.interests.attendedEvents.length > 0 ? (
            <div className="space-y-2">
              {userData.interests.attendedEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-md">
                  <span>{event}</span>
                  <button
                    type="button"
                    onClick={() => removeEvent(event)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">Nenhum evento adicionado ainda</p>
          )}
        </div>
  
        <div>
          <label className="flex items-center mb-3">
            <ShoppingBag size={18} className="mr-2" />
            <span className="text-lg">Compras de Produtos</span>
          </label>
          
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="purchasedMerchandise"
              checked={userData.interests.purchasedMerchandise}
              onChange={togglePurchasedMerchandise}
              className="w-5 h-5 rounded border-gray-400 text-gray-600 focus:ring-gray-400"
            />
            <label htmlFor="purchasedMerchandise" className="ml-2 text-gray-300">
              Comprei produtos de esports no último ano
            </label>
          </div>
  
          {userData.interests.purchasedMerchandise && (
            <textarea
              value={userData.interests.purchaseDetails || ''}
              onChange={handlePurchaseDetailsChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Descreva quais produtos comprou (times, itens, etc.)..."
              rows={3}
            ></textarea>
          )}
        </div>
  
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center"
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

export default InterestsForm;