import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ chats, currentChatId, onNewChat, onSelectChat, onDeleteChat, onEditChatTitle }) {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [chatToDelete, setChatToDelete] = useState(null);

  const handleEditClick = (e, chat) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitleInput(chat.title);
  };

  const handleSaveTitle = (chatId) => {
    if (editTitleInput.trim()) {
      onEditChatTitle(chatId, editTitleInput);
    }
    setEditingChatId(null);
  };

  const handleKeyDown = (e, chatId) => {
    if (e.key === 'Enter') {
      handleSaveTitle(chatId);
    } else if (e.key === 'Escape') {
      setEditingChatId(null);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2><span style={{color: '#ff8c00'}}>⚡</span> <span style={{color: '#10a37f'}}>DaivAI</span></h2>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        + New Chat
      </button>

      <div className="chat-list">
        {chats.length === 0 ? (
          <p className="empty">No chats yet</p>
        ) : (
          chats.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="chat-item-content">
                <span className="chat-icon" style={{color: '#a855f7'}}>💬</span>
                <div className="chat-text">
                  {editingChatId === chat.id ? (
                    <input 
                      type="text" 
                      className="edit-title-input"
                      value={editTitleInput}
                      onChange={(e) => setEditTitleInput(e.target.value)}
                      onBlur={() => handleSaveTitle(chat.id)}
                      onKeyDown={(e) => handleKeyDown(e, chat.id)}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="chat-title">{chat.title}</span>
                  )}
                  <span className="chat-date">Today</span>
                </div>
              </div>
              <div className="chat-actions">
                <button
                  className="edit-btn"
                  onClick={(e) => handleEditClick(e, chat)}
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this chat?')) {
                      onDeleteChat(chat.id);
                    }
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar-small">U</div>
          <div className="user-info">
            <strong>User</strong>
            <span>user@daivai.com</span>
          </div>
          <button className="settings-btn">⋯</button>
        </div>
      </div>
      {/* Delete Chat Confirmation Modal */}
      {chatToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete Chat</h3>
              <button className="close-modal" onClick={() => setChatToDelete(null)}>✕</button>
            </div>
            <p style={{ marginBottom: '24px', fontSize: '15px', color: '#555' }}>
              Are you sure you want to delete this chat? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setChatToDelete(null)}>Cancel</button>
              <button 
                className="save-btn" 
                style={{ background: '#ff4444' }}
                onClick={() => {
                  onDeleteChat(chatToDelete);
                  setChatToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
