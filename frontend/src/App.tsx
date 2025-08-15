// frontend/src/App.tsx

import React, { useState, useEffect } from 'react';
import { WordInput } from './components/WordInput';
import { WordDisplay } from './components/WordDisplay';
import { wordTeacherAPI, WordRequest, WordTeacherResponse } from './services/api';
import './App.css';

type AppState = 'input' | 'loading' | 'display' | 'error';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [wordData, setWordData] = useState<WordTeacherResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // 检查服务器状态
  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      await wordTeacherAPI.checkHealth();
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
      console.warn('Server health check failed:', error);
    }
  };

  const handleWordSubmit = async (request: WordRequest) => {
    setState('loading');
    setError('');
    
    try {
      const response = await wordTeacherAPI.teachWord(request);
      setWordData(response);
      setState('display');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setError(errorMessage);
      setState('error');
    }
  };

  const handleNewWord = () => {
    setState('input');
    setWordData(null);
    setError('');
  };

  const handleRetry = () => {
    setState('input');
    setError('');
  };

  const renderContent = () => {
    switch (state) {
      case 'input':
        return (
          <WordInput 
            onSubmit={handleWordSubmit} 
            loading={false}
          />
        );
        
      case 'loading':
        return (
          <div className="loading-container">
            <div className="loading-card">
              <div className="loading-animation">
                <div className="loading-spinner large"></div>
              </div>
              <h2>🤖 AI老师正在准备教学内容</h2>
              <p className="loading-text">
                正在从词典获取数据并用AI润色生成个性化内容...
              </p>
              <div className="loading-steps">
                <div className="step active">📚 查询词典</div>
                <div className="step active">🤖 AI润色</div>
                <div className="step active">✨ 生成内容</div>
              </div>
            </div>
          </div>
        );
        
      case 'display':
        return wordData ? (
          <WordDisplay 
            data={wordData} 
            onNewWord={handleNewWord}
          />
        ) : null;
        
      case 'error':
        return (
          <div className="error-container">
            <div className="error-card">
              <div className="error-icon">😔</div>
              <h2>学习遇到问题</h2>
              <p className="error-message">{error}</p>
              
              <div className="error-suggestions">
                <h3>可能的解决方案：</h3>
                <ul>
                  <li>检查单词拼写是否正确</li>
                  <li>确认网络连接正常</li>
                  <li>尝试使用更常见的英文单词</li>
                  <li>稍后再试，服务器可能正在处理其他请求</li>
                </ul>
              </div>
              
              <div className="error-actions">
                <button 
                  className="retry-button"
                  onClick={handleRetry}
                >
                  重新尝试
                </button>
                <button 
                  className="health-check-button"
                  onClick={checkServerHealth}
                >
                  检查服务器状态
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* 头部状态栏 */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📚 每日单词老师</h1>
          <div className="server-status">
            <span className={`status-indicator ${serverStatus}`}></span>
            <span className="status-text">
              {serverStatus === 'checking' && '检查中...'}
              {serverStatus === 'online' && '服务正常'}
              {serverStatus === 'offline' && '服务离线'}
            </span>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="app-main">
        {renderContent()}
      </main>

      {/* 底部信息 */}
      <footer className="app-footer">
        <p>
          Powered by{' '}
          <a href="https://www.mastra.ai" target="_blank" rel="noopener noreferrer">
            Mastra
          </a>
          {' + '}
          <a href="https://openai.com" target="_blank" rel="noopener noreferrer">
            OpenAI
          </a>
          {' + '}
          <a href="https://dictionaryapi.dev" target="_blank" rel="noopener noreferrer">
            Free Dictionary API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;