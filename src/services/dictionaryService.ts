// src/services/dictionaryService.ts

import { DictionaryAPIResponse } from '../types/word';

export class DictionaryService {
  private static readonly FREE_DICTIONARY_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
  
  /**
   * 从 Free Dictionary API 获取单词信息
   * @param word 要查询的单词
   * @returns 单词的详细信息
   */
  static async lookupWord(word: string): Promise<DictionaryAPIResponse[]> {
    try {
      const response = await fetch(`${this.FREE_DICTIONARY_BASE_URL}/${encodeURIComponent(word)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Word "${word}" not found in dictionary`);
        }
        throw new Error(`Dictionary API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // 验证返回的数据结构
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(`Invalid response format for word "${word}"`);
      }
      
      return data as DictionaryAPIResponse[];
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to lookup word "${word}": ${String(error)}`);
    }
  }
  
  /**
   * 验证单词是否为有效的英文单词格式
   * @param word 要验证的单词
   * @returns 是否为有效格式
   */
  static validateWord(word: string): boolean {
    if (!word || typeof word !== 'string') {
      return false;
    }
    
    const trimmedWord = word.trim();
    
    // 基本验证：只包含字母、连字符和撇号
    const wordPattern = /^[a-zA-Z'-]+$/;
    
    return wordPattern.test(trimmedWord) && 
           trimmedWord.length >= 1 && 
           trimmedWord.length <= 50;
  }
  
  /**
   * 提取音标信息
   * @param phonetics 音标数组
   * @returns 最佳音标信息
   */
  static extractBestPhonetic(phonetics: any[]): { text?: string; audio?: string } {
    if (!phonetics || phonetics.length === 0) {
      return {};
    }
    
    // 优先选择有音频的音标
    const phoneticWithAudio = phonetics.find(p => p.audio && p.text);
    if (phoneticWithAudio) {
      return {
        text: phoneticWithAudio.text,
        audio: phoneticWithAudio.audio
      };
    }
    
    // 其次选择有文本的音标
    const phoneticWithText = phonetics.find(p => p.text);
    if (phoneticWithText) {
      return {
        text: phoneticWithText.text
      };
    }
    
    return {};
  }
  
  /**
   * 处理和清理词典数据
   * @param rawData 原始API数据
   * @returns 清理后的数据
   */
  static processWordData(rawData: DictionaryAPIResponse[]): DictionaryAPIResponse[] {
    return rawData.map(entry => ({
      ...entry,
      meanings: entry.meanings.map(meaning => ({
        ...meaning,
        definitions: meaning.definitions.slice(0, 3) // 限制定义数量
      }))
    }));
  }
}