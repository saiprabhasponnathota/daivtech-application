import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './App.css';

export default function App() {
  // storing all chats in state
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState('Neural Nexus');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // load chats from localStorage when app starts
  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) {
        setCurrentChatId(parsed[0].id);
      }
    }
  }, []);

  // save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]);

  // create new chat
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  // send message and get AI response
  const generateAIResponse = (text, engine) => {
    const msg = text.trim();
    const lower = msg.toLowerCase();

    if (!msg) return `[${engine}] Please type a message and I’ll help you.`;

    if (lower.includes('poem')) {
      if (lower.includes('independence')) {
        return `[${engine}] Here's a short poem on Independence Day:\n\nFreedom flies in every sky,\nWith courage that will never die.\nOur tricolor waves proud and high,\nAs dreams and hope go rising by.\n\nWe honor those who gave their all,\nWho stood up strong, who would not fall.\nOn Independence Day we say,\nOur nation shines in every way.`;
      }

      return `[${engine}] Sure — here's a simple poem:\n\nYou asked for words, I bring a line,\nA little thought, a spark, a sign.\nIn quiet dreams and skies above,\nLife grows with hope, with light, with love.\n\nStep by step your story streams,\nBuilt from effort, heart, and dreams.\nHold your voice and let it show,\nYou are stronger than you know.`;
    }

    if (lower.includes('independence day')) {
      return `[${engine}] Independence Day is a celebration of freedom, sacrifice, and national pride. If you want, I can write a short paragraph, speech, essay, or poem on Independence Day.`;
    }

    if (/(^|\s)(hi|hello|hey|hii)(\s|$)/.test(lower)) {
      return `[${engine}] Hi! 👋 Tell me what you need — coding, debugging, or explanation.`;
    }

    if (lower.includes('error') || lower.includes('not working') || lower.includes('issue')) {
      return `[${engine}] Got it. Share: 1) exact error text, 2) file name, 3) what you expected. I’ll give a direct fix.`;
    }

    if (lower.includes('css') || lower.includes('style') || lower.includes('align')) {
      return `[${engine}] For UI alignment issues, I can update CSS selectors and spacing directly. Tell me which side/position you want.`;
    }

    if (lower.includes('?')) {
      return `[${engine}] Good question. Based on your message (“${msg}”), I suggest we solve it step-by-step. Share one screenshot or code snippet for exact guidance.`;
    }

    return `[${engine}] I understood: “${msg}”. Tell me if you want this as a poem, paragraph, essay, speech, or direct answer.`;
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    // add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString()
    };

    // update current chat with new message
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return { ...chat, messages: [...chat.messages, userMsg] };
      }
      return chat;
    });
    setChats(updatedChats);

    // simulate AI response after 1 second
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        text: generateAIResponse(text, selectedEngine),
        time: new Date().toLocaleTimeString()
      };

      const finalChats = updatedChats.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: [...chat.messages, aiMsg] };
        }
        return chat;
      });
      setChats(finalChats);
    }, 1000);
  };

  // delete chat
  const deleteChat = (chatId) => {
    const newChats = chats.filter(c => c.id !== chatId);
    setChats(newChats);
    if (currentChatId === chatId) {
      setCurrentChatId(newChats.length > 0 ? newChats[0].id : null);
    }
  };

  // edit chat title
  const editChatTitle = (chatId, newTitle) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, title: newTitle };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  // delete message from current chat
  const deleteMessage = (msgId) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: chat.messages.filter(m => m.id !== msgId)
        };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  // edit message
  const editMessage = (msgId, newText) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: chat.messages.map(m => 
            m.id === msgId ? { ...m, text: newText } : m
          )
        };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  const currentChat = chats.find(c => c.id === currentChatId);

  return (
    <div className={`app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {isSidebarOpen && (
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={createNewChat}
          onSelectChat={setCurrentChatId}
          onDeleteChat={deleteChat}
          onEditChatTitle={editChatTitle}
        />
      )}
      <ChatArea
        chat={currentChat}
        selectedEngine={selectedEngine}
        onEngineChange={setSelectedEngine}
        onSendMessage={sendMessage}
        onDeleteMessage={deleteMessage}
        onEditMessage={editMessage}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
}
