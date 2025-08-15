// frontend/src/components/WordDisplay.tsx

import React, { useState } from 'react';
import { WordTeacherResponse } from '../services/api';

interface WordDisplayProps {
  data: WordTeacherResponse;
  onNewWord: () => void;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ data, onNewWord }) => {
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [playingAudio, setPlayingAudio] = useState(false);

  const playPronunciation = () => {
    if (playingAudio) return;
    
    // 使用 Web Speech API 播放发音
    if ('speechSynthesis' in window) {
      setPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(data.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      
      utterance.onend = () => setPlayingAudio(false);
      utterance.onerror = () => setPlayingAudio(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const sections = [
    { id: 'introduction', title: '简介', icon: '👋' },
    { id: 'pronunciation', title: '发音', icon: '🔊' },
    { id: 'meanings', title: '含义', icon: '📚' },
    { id: 'usage', title: '用法', icon: '💬' },
    { id: 'funFacts', title: '趣味知识', icon: '🎉' },
    { id: 'summary', title: '总结', icon: '✨' },
  ];

  const renderSection = () => {
    const { enhancedContent } = data;
    
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="section-content">
            <h3>单词简介</h3>
            <p className="introduction-text">{enhancedContent.introduction}</p>
          </div>
        );
        
      case 'pronunciation':
        return (
          <div className="section-content">
            <h3>发音指导</h3>
            <div className="pronunciation-container">
              <div className="pronunciation-guide">
                <span className="phonetic">{enhancedContent.pronunciation.guide}</span>
                <button 
                  className={`play-button ${playingAudio ? 'playing' : ''}`}
                  onClick={playPronunciation}
                  disabled={playingAudio}
                >
                  {playingAudio ? '🔊' : '▶️'}
                </button>
              </div>
              <p className="pronunciation-tips">{enhancedContent.pronunciation.tips}</p>
            </div>
          </div>
        );
        
      case 'meanings':
        return (
          <div className="section-content">
            <h3>词义解析</h3>
            {enhancedContent.meanings.map((meaning, index) => (
              <div key={index} className="meaning-item">
                <h4 className="part-of-speech">{meaning.partOfSpeech}</h4>
                <p className="explanation">{meaning.explanation}</p>
                
                {meaning.examples.length > 0 && (
                  <div className="examples">
                    <h5>例句：</h5>
                    <ul>
                      {meaning.examples.map((example, i) => (
                        <li key={i} className="example">{example}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {meaning.memoryTricks.length > 0 && (
                  <div className="memory-tricks">
                    <h5>记忆技巧：</h5>
                    <ul>
                      {meaning.memoryTricks.map((trick, i) => (
                        <li key={i} className="memory-trick">{trick}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
        
      case 'usage':
        return (
          <div className="section-content">
            <h3>实际用法</h3>
            
            {enhancedContent.usage.commonPhrases.length > 0 && (
              <div className="usage-section">
                <h4>常用短语</h4>
                <div className="phrases-grid">
                  {enhancedContent.usage.commonPhrases.map((phrase, index) => (
                    <span key={index} className="phrase-tag">{phrase}</span>
                  ))}
                </div>
              </div>
            )}
            
            {enhancedContent.usage.situations.length > 0 && (
              <div className="usage-section">
                <h4>使用场景</h4>
                <ul className="situations-list">
                  {enhancedContent.usage.situations.map((situation, index) => (
                    <li key={index} className="situation">{situation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
        
      case 'funFacts':
        return (
          <div className="section-content">
            <h3>趣味知识</h3>
            {enhancedContent.funFacts && enhancedContent.funFacts.length > 0 ? (
              <div className="fun-facts">
                {enhancedContent.funFacts.map((fact, index) => (
                  <div key={index} className="fun-fact">
                    <span className="fun-fact-icon">💡</span>
                    <p>{fact}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-content">暂无趣味知识</p>
            )}
          </div>
        );
        
      case 'summary':
        return (
          <div className="section-content">
            <h3>学习总结</h3>
            <div className="summary-content">
              <p className="summary-text">{enhancedContent.summary}</p>
              <div className="word-card">
                <span className="word-display">{data.word}</span>
                <span className="style-badge">{data.style} 风格</span>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="word-display-container">
      <div className="word-display-header">
        <h1 className="word-title">{data.word}</h1>
        <button className="new-word-button" onClick={onNewWord}>
          学习新单词
        </button>
      </div>
      
      <div className="word-display-content">
        {/* 导航栏 */}
        <nav className="section-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-title">{section.title}</span>
            </button>
          ))}
        </nav>
        
        {/* 内容区域 */}
        <div className="content-area">
          {renderSection()}
        </div>
      </div>
      
      <div className="word-display-footer">
        <p className="timestamp">
          学习时间: {new Date(data.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>
    </div>
  );
};