
import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import UserList from './UserList';
import { useIsMobile } from '@/hooks/use-mobile';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  isPrivate?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  roomId: string;
  reactions?: { emoji: string; users: string[] }[];
  type?: 'text' | 'image' | 'file';
}

interface ChatLayoutProps {
  user: User;
  onLogout: () => void;
}

const ChatLayout = ({ user, onLogout }: ChatLayoutProps) => {
  const [currentRoom, setCurrentRoom] = useState<ChatRoom>({
    id: 'general',
    name: 'General',
    description: 'General discussion for everyone',
    memberCount: 12
  });
  const [showUserList, setShowUserList] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();

  const chatRooms: ChatRoom[] = [
    { id: 'general', name: 'General', description: 'General discussion', memberCount: 12 },
    { id: 'tech', name: 'Tech Talk', description: 'Technology discussions', memberCount: 8 },
    { id: 'random', name: 'Random', description: 'Random conversations', memberCount: 15 },
    { id: 'gaming', name: 'Gaming', description: 'Gaming discussions', memberCount: 6 },
  ];

  const onlineUsers: User[] = [
    { id: '1', username: 'Alice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', isOnline: true },
    { id: '2', username: 'Bob', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', isOnline: true },
    { id: '3', username: 'Charlie', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', isOnline: false, lastSeen: new Date(Date.now() - 300000) },
    { id: '4', username: 'Diana', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana', isOnline: true },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${isMobile ? (showSidebar ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} 
        fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 
        transition-transform duration-300 ease-in-out ${!isMobile ? 'relative' : ''}`}>
        <Sidebar
          user={user}
          rooms={chatRooms}
          currentRoom={currentRoom}
          onRoomChange={setCurrentRoom}
          onLogout={onLogout}
          onClose={() => setShowSidebar(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea
          user={user}
          currentRoom={currentRoom}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          onToggleUserList={() => setShowUserList(!showUserList)}
          showUserList={showUserList}
        />
      </div>

      {/* User List */}
      <div className={`${isMobile ? (showUserList ? 'translate-x-0' : 'translate-x-full') : (showUserList ? 'translate-x-0' : 'translate-x-full')} 
        fixed inset-y-0 right-0 z-40 w-64 bg-white/80 backdrop-blur-md border-l border-gray-200 
        transition-transform duration-300 ease-in-out`}>
        <UserList
          users={onlineUsers}
          onClose={() => setShowUserList(false)}
        />
      </div>

      {/* Mobile overlay */}
      {isMobile && (showSidebar || showUserList) && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => {
            setShowSidebar(false);
            setShowUserList(false);
          }}
        />
      )}
    </div>
  );
};

export default ChatLayout;
