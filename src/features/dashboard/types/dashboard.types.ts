export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  imageUrl: string;
  matchPercentage: number;
  isPremium: boolean;
  isVerified: boolean;
  religion: string;
  education: string;
  height?: string;
  bio?: string;
}
