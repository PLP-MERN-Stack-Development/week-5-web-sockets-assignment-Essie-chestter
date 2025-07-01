
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Message } from './ChatLayout';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  onReaction: (emoji: string) => void;
}

const MessageBubble = ({ message, isOwnMessage, onReaction }: MessageBubbleProps) => {
  const [showReactions, setShowReactions] = useState(false);
  
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🚀'];

  return (
    <div className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} group`}>
      {!isOwnMessage && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
          <AvatarFallback className="text-xs">
            {message.senderName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {!isOwnMessage && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-700">{message.senderName}</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
          </div>
        )}
        
        <div
          className={`relative px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-blue-600 text-white rounded-br-md'
              : message.senderId === 'system'
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-white border border-gray-200 rounded-bl-md'
          }`}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {isOwnMessage && (
            <span className="text-xs text-blue-200 mt-1 block">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
          )}

          {/* Quick reaction buttons */}
          {showReactions && message.senderId !== 'system' && (
            <div className={`absolute top-0 ${isOwnMessage ? 'right-0' : 'left-0'} 
              transform -translate-y-full mb-2 bg-white border border-gray-200 rounded-lg p-1 shadow-lg z-10
              flex gap-1`}>
              {reactions.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={() => onReaction(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Message reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1 cursor-pointer hover:bg-gray-200"
                onClick={() => onReaction(reaction.emoji)}
              >
                {reaction.emoji} {reaction.users.length}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
