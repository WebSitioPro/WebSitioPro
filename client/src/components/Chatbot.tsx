import { useState, useRef, useEffect } from 'react';
import { WebsiteConfig } from '@/lib/types';

interface ChatbotProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
  getLocalizedValue: <T extends { en: string; es: string }>(obj: T) => string;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export default function Chatbot({ config, language, t, getLocalizedValue }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: t('chatbotWelcome'), isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };
  
  const handleSendMessage = () => {
    if (inputText.trim()) {
      addMessage(inputText, true);
      setInputText('');
      
      // Simple bot response after a short delay
      setTimeout(() => {
        // Check if any of the predefined questions match
        const questionMatch = config.chatbotQuestions.find(q => 
          inputText.toLowerCase().includes(getLocalizedValue(q.question).toLowerCase())
        );
        
        if (questionMatch) {
          addMessage(getLocalizedValue(questionMatch.answer), false);
        } else {
          // Default response
          addMessage(
            language === 'en' 
              ? "Thank you for your message. One of our staff members will respond shortly."
              : "Gracias por su mensaje. Uno de nuestros miembros del personal responderá en breve.",
            false
          );
        }
      }, 1000);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleQuestionClick = (question: { key: string, question: { en: string, es: string }, answer: { en: string, es: string } }) => {
    addMessage(getLocalizedValue(question.question), true);
    
    // Respond after a short delay
    setTimeout(() => {
      addMessage(getLocalizedValue(question.answer), false);
    }, 500);
  };
  
  return (
    <>
      {/* Chatbot Toggle Button */}
      <div id="chatbotToggle" className="chatbot-toggle" onClick={toggleChatbot}>
        <i className="fas fa-comments fa-lg"></i>
      </div>
      
      {/* Chatbot Panel */}
      <div id="chatbotPanel" className="chatbot-panel" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="d-flex flex-column h-100">
          <div className="p-3 bg-primary-custom text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{t('chatbotTitle')}</h5>
              <button id="chatbotClose" className="btn btn-sm text-white" onClick={toggleChatbot}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div className="p-3 flex-grow-1 overflow-auto" id="chatbotMessages">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 text-${msg.isUser ? 'end' : 'start'}`}>
                <div className={`${msg.isUser ? 'bg-primary-custom text-white' : 'bg-light'} p-3 rounded-3 d-inline-block`}>
                  <p className="mb-0">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Show question buttons after the welcome message */}
            {messages.length === 1 && (
              <div className="mb-3">
                <div className="d-flex flex-column gap-2">
                  {config.chatbotQuestions.map((q, index) => (
                    <button 
                      key={index}
                      className="btn btn-outline-primary text-start"
                      onClick={() => handleQuestionClick(q)}
                    >
                      {getLocalizedValue(q.question)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef}></div>
          </div>
          
          <div className="p-3 border-top">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                id="chatbotInput" 
                placeholder={t('chatbotInputPlaceholder')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="btn btn-primary-custom" 
                id="chatbotSend" 
                onClick={handleSendMessage}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
