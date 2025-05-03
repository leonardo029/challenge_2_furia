export interface UserData {
  basicInfo: BasicInfo;
  interests: Interests;
  documents: Documents;
  socialMedia: SocialMedia[];
  esportsProfiles: EsportsProfile[];
}

export interface BasicInfo {
  name: string;
  email: string;
  cpf: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Interests {
  favoriteGames: string[];
  favoriteTeams: string[];
  attendedEvents: string[];
  purchasedMerchandise: boolean;
  purchaseDetails?: string;
}

export interface Documents {
  idDocument: File | null;
  selfie: File | null;
  validationStatus: 'pending' | 'processing' | 'approved' | 'rejected';
  validationMessage?: string;
}

export interface SocialMedia {
  platform: string;
  username: string;
  connected: boolean;
  relevanceScore?: number;
  interactionCount?: number;
}

export interface EsportsProfile {
  platform: string;
  profileUrl: string;
  validated: boolean;
  relevanceScore?: number;
}

export interface FormStepProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  nextStep: () => void;
  prevStep?: () => void;
}