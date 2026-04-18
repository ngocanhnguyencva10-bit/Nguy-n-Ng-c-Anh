
export type StageType = 'HA_LONG' | 'PHU_QUOC' | 'HOI_AN' | 'MINI_GAME';

export interface Question {
  id: string;
  type?: 'MCQ' | 'MATCHING' | 'SHORT_ANSWER' | 'REORDER' | 'CORRECTION' | 'TRACE';
  game_type?: 'multiple_choice' | 'error_detection' | 'fill_tone' | 'correction' | 'listening' | 'fill_blank' | 'classification' | 'tone_recognition';
  instruction?: string;
  content?: string;
  question: string;
  prompt?: string;
  options?: string[];
  correct_answer?: any;
  answer?: any;
  explanation?: string;
  note?: string;
  category: string;
  location?: string;
  error_word?: string;
}

export interface AvatarConfig {
  skinColor: string;
  hairStyle: 'bob' | 'long' | 'ponytail' | 'braid' | 'curls' | 'undercut';
  hairColor: string;
  outfit: 'aodai_red' | 'aodai_white' | 'tshirt_jeans' | 'tshirt_shorts' | 'school' | 'flag_tshirt' | 'baba';
  hat: 'none' | 'nonla' | 'cap' | 'bucket';
  handHeld: 'none' | 'backpack' | 'lollipop' | 'phone';
}

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  avatar: string; // URL of uploaded image or fallback
  score: number;
  completedStages: StageType[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  check: (user: UserState) => boolean;
}

export interface MatchingPair {
  left: string;
  right: string;
}
