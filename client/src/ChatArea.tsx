
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Users, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Volume2,
  VolumeX,
  Hash
} from 'lucide-react';
import { User, ChatRoom, Message } from './ChatLayout';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { toast } from 'sonner';

interface ChatAreaProps {
  user: User;
  currentRoom: ChatRoom;
  onToggleSidebar: () => void;
  onToggleUserList: () => void;
  showUserList: boolean;
}

const ChatArea = ({ user, currentRoom, onToggleSidebar, onToggleUserList, showUserList }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to LivePulseTalk! This is a real-time chat application.',
      senderId: 'system',
      senderName: 'System',
      timestamp: new Date(Date.now() - 3600000),
      roomId: currentRoom.id,
      type: 'text'
    },
    {
      id: '2',
      content: 'Hey everyone! Great to be here 👋',
      senderId: 'alice',
      senderName: 'Alice',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      timestamp: new Date(Date.now() - 1800000),
      roomId: currentRoom.id,
      reactions: [{ emoji: '👋', users: ['bob', 'charlie'] }],
      type: 'text'
    },
    {
      id: '3',
      content: 'This chat app looks amazing! Love the real-time features.',
      senderId: 'bob',
      senderName: 'Bob',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      timestamp: new Date(Date.now() - 900000),
      roomId: currentRoom.id,
      reactions: [{ emoji: '❤️', users: ['alice'] }, { emoji: '🚀', users: ['diana'] }],
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>(['Alice']);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate typing indicator clearing
    const timer = setTimeout(() => {
      setTypingUsers([]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      senderId: user.id,
      senderName: user.username,
      senderAvatar: user.avatar,
      timestamp: new Date(),
      roomId: currentRoom.id,
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    if (soundEnabled) {
      // Play notification sound (simulate)
      toast.success('Message sent!');
    }

    // Simulate receiving responses
    setTimeout(() => {
      const responses = [
        'That\'s interesting!',
        'I agree with that 👍',
        'Great point!',
        'Thanks for sharing!',
        'Nice! 🔥'
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        senderId: 'alice',
        senderName: 'Alice',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        timestamp: new Date(),
        roomId: currentRoom.id,
        type: 'text'
      };
      
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          if (existingReaction.users.includes(user.id)) {
            // Remove reaction
            existingReaction.users = existingReaction.users.filter(id => id !== user.id);
            if (existingReaction.users.length === 0) {
              return { ...msg, reactions: reactions.filter(r => r.emoji !== emoji) };
            }
          } else {
            // Add reaction
            existingReaction.users.push(user.id);
          }
        } else {
          // New reaction
          reactions.push({ emoji, users: [user.id] });
        }
        
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      // Simulate typing indicator
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-gray-500" />
              <h1 className="font-semibold text-lg">{currentRoom.name}</h1>
              <Badge variant="secondary" className="text-xs">
                {currentRoom.memberCount} members
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={soundEnabled ? 'text-green-600' : 'text-gray-400'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggleUserList}
              className={showUserList ? 'bg-blue-50 text-blue-600' : ''}
            >
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {currentRoom.description && (
          <p className="text-sm text-gray-500 mt-1 ml-10">{currentRoom.description}</p>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages
            .filter(msg => msg.roomId === currentRoom.id)
            .map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === user.id}
                onReaction={(emoji) => handleReaction(message.id, emoji)}
              />
            ))}
          
          {typingUsers.length > 0 && (
            <TypingIndicator users={typingUsers} />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              placeholder={`Message #${currentRoom.name.toLowerCase()}`}
              className="border-0 bg-gray-100 focus-visible:ring-1 focus-visible:ring-blue-500"
              maxLength={500}
            />
          </div>
          <Button type="button" variant="ghost" size="sm">
            <Smile className="h-4 w-4" />
          </Button>
          <Button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
