import { useState, useRef, useEffect } from 'react';
import './ChatArea.css';

export default function ChatArea({
  chat,
  selectedEngine,
  onEngineChange,
  onSendMessage,
  onDeleteMessage
}) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEnd = useRef(null);

  // scroll to bottom when new messages come in
  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat?.messages]);

  const handleSend = () => {
    if (input.trim()) {
      setIsLoading(true);
      onSendMessage(input);
      setInput('');
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // send on Enter, new line on Shift+Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const engines = [
    'Neural Nexus',
    'Cerebral Prime',
    'Synapse Ultra',
    'LogicCore'
  ];

  return (
    <div className="chat-area">
      {/* Header with engine selector */}
      <header className="chat-header">
        <h1>{chat?.title || 'Select a chat'}</h1>
        <select value={selectedEngine} onChange={(e) => onEngineChange(e.target.value)}>
          {engines.map(e => <option key={e}>{e}</option>)}
        </select>
      </header>

      {/* Messages */}
      <div className="messages">
        {!chat || chat.messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚡</div>
            <h2>DaivAI</h2>
            <p>Start a conversation with me</p>
          </div>
        ) : (
          <>
            {chat.messages.map(msg => (
              <div key={msg.id} className={`message ${msg.type}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="time">{msg.time}</span>
                </div>
                {msg.type === 'user' && (
                  <button
                    className="delete-msg"
                    onClick={() => onDeleteMessage(msg.id)}
                    title="Delete"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </>
        )}
      </div>

      {/* Input */}
      <footer className="chat-footer">
        <div className="input-box">
          <textarea
            placeholder={`Message ${selectedEngine}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="2"
          />
          <button onClick={handleSend} disabled={!input.trim()}>
            ➤
          </button>
        </div>
        <p className="info">AI can make mistakes.</p>
      </footer>
    </div>
  );
}
