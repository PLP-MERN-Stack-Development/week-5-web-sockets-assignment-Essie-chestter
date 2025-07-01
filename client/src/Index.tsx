
import { useState } from 'react';
import ChatLayout from '@/components/chat/ChatLayout';
import AuthScreen from '@/components/auth/AuthScreen';

const Index = () => {
  const [user, setUser] = useState<{ id: string; username: string; avatar?: string } | null>(null);

  const handleLogin = (userData: { id: string; username: string; avatar?: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <ChatLayout user={user} onLogout={handleLogout} />;
};

export default Index;
