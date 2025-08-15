// src/agents/wordTeacherAgent.ts

import { Agent, Step } from '@mastra/core';
import { DictionaryService } from '../services/dictionaryService';
import { OpenAIService } from '../services/openaiService';
import { WordRequest, WordTeacherResponse } from '../types/word';

export const wordTeacherAgent = new Agent({
  name: 'WordTeacherAgent',
  instructions: `你是一个专业的英语单词教学助手。你的任务是：
1. 获取单词的权威词典信息
2. 使用AI润色生成生动的教学内容
3. 为学生提供易于理解和记忆的学习材料`,
  
  steps: [
    // Step 1: 验证输入
    new Step({
      name: 'validateInput',
      instructions: '验证用户输入的单词和参数',
      action: async ({ context }) => {
        const request = context.request as WordRequest;
        
        if (!request.word) {
          throw new Error('Word parameter is required');
        }
        
        if (!DictionaryService.validateWord(request.word)) {
          throw new Error(`Invalid word format: "${request.word}"`);
        }
        
        const validStyles = ['humorous', 'serious', 'storytelling', 'conversational', 'academic'];
        if (request.style && !validStyles.includes(request.style)) {
          throw new Error(`Invalid style: "${request.style}". Must be one of: ${validStyles.join(', ')}`);
        }
        
        return {
          ...request,
          word: request.word.trim().toLowerCase(),
          style: request.style || 'conversational',
          level: request.level || 'intermediate'
        };
      }
    }),
    
    // Step 2: 获取词典数据
    new Step({
      name: 'fetchDictionaryData',
      instructions: '从外部词典API获取单词的详细信息',
      action: async ({ context }) => {
        const request = context.validatedRequest as WordRequest;
        
        try {
          const rawData = await DictionaryService.lookupWord(request.word);
          const processedData = DictionaryService.processWordData(rawData);
          
          return {
            rawData: processedData,
            phoneticInfo: DictionaryService.extractBestPhonetic(processedData[0]?.phonetics || [])
          };
        } catch (error) {
          throw new Error(`Failed to fetch dictionary data: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }),
    
    // Step 3: AI 润色增强
    new Step({
      name: 'enhanceContent',
      instructions: '使用OpenAI对词典数据进行润色，生成教学内容',
      action: async ({ context }) => {
        const request = context.validatedRequest as WordRequest;
        const dictionaryData = context.dictionaryData;
        
        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
          throw new Error('OpenAI API key is not configured');
        }
        
        const openaiService = new OpenAIService(openaiApiKey);
        
        try {
          const enhancedContent = await openaiService.enhanceWordContent(
            dictionaryData.rawData,
            request
          );
          
          return enhancedContent;
        } catch (error) {
          throw new Error(`Failed to enhance content: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }),
    
    // Step 4: 格式化最终响应
    new Step({
      name: 'formatResponse',
      instructions: '将所有数据格式化为最终的响应格式',
      action: async ({ context }) => {
        const request = context.validatedRequest as WordRequest;
        const dictionaryData = context.dictionaryData;
        const enhancedContent = context.enhancedContent;
        
        const response: WordTeacherResponse = {
          word: request.word,
          style: request.style,
          originalData: dictionaryData.rawData,
          enhancedContent: enhancedContent,
          timestamp: new Date().toISOString(),
          success: true
        };
        
        return response;
      }
    })
  ]
});

// 导出便捷的调用函数
export async function teachWord(request: WordRequest): Promise<WordTeacherResponse> {
  try {
    const result = await wordTeacherAgent.run({
      request
    });
    
    return result.formatResponse;
  } catch (error) {
    const errorResponse: WordTeacherResponse = {
      word: request.word || 'unknown',
      style: request.style || 'conversational',
      originalData: [],
      enhancedContent: {
        introduction: '',
        pronunciation: { guide: '', tips: '' },
        meanings: [],
        usage: { commonPhrases: [], situations: [] },
        summary: ''
      },
      timestamp: new Date().toISOString(),
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
    
    return errorResponse;
  }
}