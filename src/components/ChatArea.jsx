import { useState, useRef, useEffect } from 'react';
import './ChatArea.css';

export default function ChatArea({
  chat,
  selectedEngine,
  onEngineChange,
  onSendMessage,
  onDeleteMessage,
  onEditMessage,
  onToggleSidebar
}) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEnd = useRef(null);

  const enginesData = [
    { name: 'Neural Nexus', subtext: 'Quantum Core v3.8', icon: '⚡' },
    { name: 'Cerebral Prime', subtext: 'Advanced Reasoning v2.1', icon: '🧠' },
    { name: 'Synapse Ultra', subtext: 'Creative Engine v4.0', icon: '✨' },
    { name: 'Logic Core', subtext: 'Fast Response v1.5', icon: '🖩' }
  ];

  const currentEngineData = enginesData.find(e => e.name === selectedEngine) || enginesData[0];

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

  return (
    <div className="chat-area">
      {/* Header with custom engine dropdown */}
      <header className="chat-header">
        <div className="header-left">
          <button className="menu-btn" title="Toggle Sidebar" onClick={onToggleSidebar}>☰</button>
          
          <div className="custom-dropdown-container">
            <button 
              className="dropdown-trigger" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="dropdown-icon-wrapper">
                {currentEngineData.icon}
              </span>
              <span className="dropdown-trigger-text">{currentEngineData.name}</span>
              <span className="dropdown-arrow">^</span>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Select AI Engine</div>
                {enginesData.map((engine) => (
                  <div 
                    key={engine.name}
                    className={`dropdown-item ${selectedEngine === engine.name ? 'selected' : ''}`}
                    onClick={() => {
                      onEngineChange(engine.name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="dropdown-item-icon">{engine.icon}</div>
                    <div className="dropdown-item-text">
                      <strong>{engine.name}</strong>
                      <span>{engine.subtext}</span>
                    </div>
                    {selectedEngine === engine.name && <div className="dropdown-dot"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="messages">
        {!chat || chat.messages.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-logo">
              <div className="logo-box">⚡</div>
              <h2><span className="daiv">Daiv</span>AI</h2>
              <p>Ask me anything. I'm here to help.</p>
            </div>
            
            <div className="suggestion-grid">
              <button className="suggestion-card" onClick={() => setInput('Debug and write better code')}>
                <strong>Code Help</strong>
                <span>Debug and write better code</span>
              </button>
              <button className="suggestion-card" onClick={() => setInput('Understand complex topics')}>
                <strong>Explanations</strong>
                <span>Understand complex topics</span>
              </button>
              <button className="suggestion-card" onClick={() => setInput('Generate content and ideas')}>
                <strong>Creative Writing</strong>
                <span>Generate content and ideas</span>
              </button>
              <button className="suggestion-card" onClick={() => setInput('Find solutions to challenges')}>
                <strong>Problem Solving</strong>
                <span>Find solutions to challenges</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {chat.messages.map(msg => (
              <div key={msg.id} className={`message-row ${msg.type}`}>
                <div className={`avatar ${msg.type === 'user' ? 'user-avatar' : 'bot-avatar'}`}>
                  {msg.type === 'user' ? 'U' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-author">{msg.type === 'user' ? 'You' : selectedEngine}</span>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  <div className="message-text">
                    <p>{msg.text}</p>
                  </div>
                </div>
                {msg.type === 'user' && (
                  <div className="msg-actions">
                    <button
                      className="edit-msg"
                      onClick={() => {
                        setEditingMessage(msg);
                        setEditInput(msg.text);
                      }}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-msg"
                      onClick={() => setMessageToDelete(msg.id)}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message-row ai">
                <div className="avatar bot-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-author">{selectedEngine}</span>
                  </div>
                  <div className="message-text">
                    <div className="typing">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </>
        )}
      </div>

      {/* Input */}
      <footer className="chat-footer">
        <div className="input-container">
          <div className="input-box">
            <button className="icon-btn paperclip" title="Attach file">📎</button>
            <textarea
              placeholder={`Message ${selectedEngine}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            <button className="icon-btn mic" title="Voice input">🎤</button>
            <button className="send-btn" onClick={handleSend} disabled={!input.trim()}>
              ➤
            </button>
          </div>
          <div className="input-subtext">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{input.length} / 4000</span>
          </div>
        </div>
        <p className="info">AI can make mistakes. Consider checking important information.</p>
      </footer>

      {/* Delete Confirmation Modal */}
      {messageToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete Message</h3>
              <button className="close-modal" onClick={() => setMessageToDelete(null)}>✕</button>
            </div>
            <p style={{ marginBottom: '24px', fontSize: '15px', color: '#555' }}>
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setMessageToDelete(null)}>Cancel</button>
              <button 
                className="save-btn" 
                style={{ background: '#ff4444' }}
                onClick={() => {
                  onDeleteMessage(messageToDelete);
                  setMessageToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Message</h3>
              <button className="close-modal" onClick={() => setEditingMessage(null)}>✕</button>
            </div>
            <textarea
              className="modal-textarea"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              placeholder="Enter your message..."
              rows="4"
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditingMessage(null)}>Cancel</button>
              <button 
                className="save-btn" 
                onClick={() => {
                  if(editInput.trim()) {
                    onEditMessage(editingMessage.id, editInput);
                    setEditingMessage(null);
                  }
                }}
              >
                ✓ Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
