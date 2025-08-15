// frontend/src/services/api.ts - 纯前端版本

export interface WordRequest {
  word: string;
  style: 'humorous' | 'serious' | 'storytelling' | 'conversational' | 'academic';
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface WordTeacherResponse {
  word: string;
  style: string;
  enhancedContent: {
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
  };
  timestamp: string;
  success: boolean;
  error?: string;
}

class WordTeacherAPI {
  private baseURL: string;

  constructor() {
    // 连接你的本地4111端口Mastra服务
    this.baseURL = 'http://localhost:4111';
  }

  /**
   * 调用你的4111端口Mastra服务学习单词
   */
  async teachWord(request: WordRequest): Promise<WordTeacherResponse> {
    try {
      console.log('🔗 正在调用4111端口服务...', request);
      
      const response = await fetch(`${this.baseURL}/api/word-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`服务器响应错误: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ 4111端口服务响应:', data);
      
      return data;
    } catch (error) {
      console.error('❌ 调用4111端口服务失败:', error);
      
      // 如果4111端口服务不可用，返回模拟数据用于测试界面
      return this.getMockResponse(request);
    }
  }

  /**
   * 模拟数据，用于测试界面（当4111端口服务不可用时）
   */
  private getMockResponse(request: WordRequest): WordTeacherResponse {
    return {
      word: request.word,
      style: request.style,
      enhancedContent: {
        introduction: `这是单词 "${request.word}" 的${request.style}风格教学内容。当前为演示模式，请启动你的4111端口Mastra服务以获得真实的AI生成内容。`,
        pronunciation: {
          guide: `/${request.word}/`,
          tips: '请启动4111端口服务获得真实发音指导'
        },
        meanings: [{
          partOfSpeech: '演示',
          explanation: '这是演示内容，请连接4111端口获得真实内容',
          examples: [`This is a demo for "${request.word}"`],
          memoryTricks: ['启动4111端口服务以获得真实记忆技巧']
        }],
        usage: {
          commonPhrases: ['demo phrase'],
          situations: ['在4111端口服务运行时使用']
        },
        funFacts: ['这是演示模式，启动4111端口服务获得有趣事实'],
        summary: `单词 "${request.word}" 的学习总结 - 当前为演示模式`
      },
      timestamp: new Date().toISOString(),
      success: true
    };
  }

  /**
   * 检查4111端口服务状态
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (response.ok) {
        return { status: 'online', message: '4111端口服务正常运行' };
      } else {
        return { status: 'error', message: '4111端口服务响应异常' };
      }
    } catch (error) {
      return { 
        status: 'offline', 
        message: '无法连接4111端口服务，当前使用演示模式' 
      };
    }
  }
}

// 导出单例实例
export const wordTeacherAPI = new WordTeacherAPI();