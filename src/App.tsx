import { useState } from 'react';
import { UserData } from './types';
import Header from './components/Header';
import FormProgress from './components/FormProgress';
import BasicInfoForm from './components/forms/BasicInfoForm';
import InterestsForm from './components/forms/InterestsForm';
import DocumentsForm from './components/forms/DocumentsForm';
import SocialMediaForm from './components/forms/SocialMediaForm';
import EsportsProfilesForm from './components/forms/EsportsProfilesForm';
import Dashboard from './components/Dashboard';

const initialUserData: UserData = {
  basicInfo: {
    name: '',
    email: '',
    cpf: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  },
  interests: {
    favoriteGames: [],
    favoriteTeams: [],
    attendedEvents: [],
    purchasedMerchandise: false
  },
  documents: {
    idDocument: null,
    selfie: null,
    validationStatus: 'pending'
  },
  socialMedia: [],
  esportsProfiles: []
};

function App() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm 
          userData={userData} 
          setUserData={setUserData} 
          nextStep={nextStep} 
        />;
      case 2:
        return <InterestsForm 
          userData={userData} 
          setUserData={setUserData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 3:
        return <DocumentsForm 
          userData={userData} 
          setUserData={setUserData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 4:
        return <SocialMediaForm 
          userData={userData} 
          setUserData={setUserData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 5:
        return <EsportsProfilesForm 
          userData={userData} 
          setUserData={setUserData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 6:
        return <Dashboard userData={userData}/>;
      default:
        return <BasicInfoForm 
          userData={userData} 
          setUserData={setUserData} 
          nextStep={nextStep} 
        />;
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja redefinir todos os dados?')) {
      setUserData(initialUserData);
      setCurrentStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <Header onReset={handleReset} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentStep < totalSteps && (
          <FormProgress currentStep={currentStep} totalSteps={totalSteps-1} />
        )}
        <div className="mt-8 bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl backdrop-blur-sm p-6 max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}

export default App;