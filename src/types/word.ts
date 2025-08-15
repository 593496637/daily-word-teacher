// src/types/word.ts

export interface WordRequest {
  word: string;
  style: 'humorous' | 'serious' | 'storytelling' | 'conversational' | 'academic';
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface PhoneticInfo {
  text: string;
  audio?: string;
}

export interface WordMeaning {
  partOfSpeech: string;
  definitions: Array<{
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
  }>;
}

export interface WordOrigin {
  etymology?: string;
  dateFirstUse?: string;
}

// 来自 Free Dictionary API 的原始数据
export interface DictionaryAPIResponse {
  word: string;
  phonetic?: string;
  phonetics: PhoneticInfo[];
  meanings: WordMeaning[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}

// OpenAI 润色后的教学内容
export interface EnhancedWordContent {
  introduction: string;
  pronunciation: {
    guide: string;
    tips: string;
  };
  meanings: Array<{
    partOfSpeech: string;
    explanation: string;
    examples: string[];
    memoryTricks: string[];
  }>;
  usage: {
    commonPhrases: string[];
    situations: string[];
  };
  funFacts?: string[];
  summary: string;
}

// 最终返回给前端的数据
export interface WordTeacherResponse {
  word: string;
  style: string;
  originalData: DictionaryAPIResponse[];
  enhancedContent: EnhancedWordContent;
  timestamp: string;
  success: boolean;
  error?: string;
}