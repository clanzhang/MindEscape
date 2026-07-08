export interface Location {
  id: string;
  name: string;
  image: string;
  distance: string;
  travelTime: string;
  price: number;
  weather: Weather;
  emotionTags: string[];
  emotionScore: EmotionScore;
  description: string;
  category: 'mountain' | 'water' | 'town' | 'healing' | 'camp' | 'cafe';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Weather {
  temp: number;
  condition: string;
  icon: string;
}

export interface EmotionScore {
  privacy: number;
  soloFriendly: number;
  natureIndex: number;
  whiteNoise: number;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  description?: string;
}

export interface Plan {
  id: string;
  emotionKeyword: string;
  matchPercentage: number;
  prescription: string;
  locations: Location[];
  itinerary: ItineraryItem[];
  createdAt: string;
}

export interface HistoryRecord {
  id: string;
  plan: Plan;
  date: string;
  status: 'completed' | 'cancelled' | 'pending';
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
  escapeCount: number;
}

export interface ExploreCard {
  id: string;
  location: Location;
  emotionDescription: string;
}

export interface QuickParam {
  time: 'half-day' | 'day' | 'weekend';
  people: 'alone' | 'couple' | 'family';
  budget: number;
  distance: 'near' | 'medium' | 'far';
}

export type EmotionTag = '疲惫' | '焦虑' | '无聊' | '想独处' | '想亲近自然' | '想发泄';

export type Category = '全部' | '山林' | '水岸' | '小镇' | '疗愈空间' | '营地' | '咖啡馆';

export const CATEGORY_MAP: Record<Category, string> = {
  '全部': 'all',
  '山林': 'mountain',
  '水岸': 'water',
  '小镇': 'town',
  '疗愈空间': 'healing',
  '营地': 'camp',
  '咖啡馆': 'cafe',
};
