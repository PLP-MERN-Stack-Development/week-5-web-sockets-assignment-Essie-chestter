
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, MessageCircle, Crown } from 'lucide-react';
import { User } from './ChatLayout';
import { formatDistanceToNow } from 'date-fns';

interface UserListProps {
  users: User[];
  onClose: () => void;
}

const UserList = ({ users, onClose }: UserListProps) => {
  const onlineUsers = users.filter(user => user.isOnline);
  const offlineUsers = users.filter(user => !user.isOnline);

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Members</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {onlineUsers.length} online • {users.length} members
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Online Users */}
          {onlineUsers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online — {onlineUsers.length}
              </h4>
              <div className="space-y-2">
                {onlineUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback className="text-xs">
                          {user.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{user.username}</p>
                        {index === 0 && <Crown className="h-3 w-3 text-yellow-500" />}
                      </div>
                      <p className="text-xs text-green-600">Online</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offline Users */}
          {offlineUsers.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                Offline — {offlineUsers.length}
              </h4>
              <div className="space-y-2">
                {offlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 group">
                    <div className="relative">
                      <Avatar className="h-8 w-8 opacity-60">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback className="text-xs">
                          {user.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate opacity-60">{user.username}</p>
                      <p className="text-xs text-gray-500">
                        {user.lastSeen 
                          ? `Last seen ${formatDistanceToNow(user.lastSeen, { addSuffix: true })}`
                          : 'Offline'
                        }
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Real-time presence tracking
        </div>
      </div>
    </div>
  );
};

export default UserList;
