import React from 'react';
import logoFuria from '/assets/images/logoFuria.svg';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white backdrop-blur-sm shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
      <img src={logoFuria} alt="Logo FURIA" className="w-18" />
        <div className="flex items-center space-x-2">
          <h1 className="text-xl md:text-3xl font-bold text-white">
            <span className="text-black">Know</span>{' '}
            <span style={{ WebkitTextStroke: '1px black' }}>Your Fan</span>
          </h1>
        </div>
        <button
          onClick={onReset}
          className="text-sm px-3 py-1 rounded border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          Redefinir Dados
        </button>
      </div>
    </header>
  );
};

export default Header;