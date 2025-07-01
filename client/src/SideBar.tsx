
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Hash, Lock, LogOut, Settings, X } from 'lucide-react';
import { User, ChatRoom } from './ChatLayout';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  user: User;
  rooms: ChatRoom[];
  currentRoom: ChatRoom;
  onRoomChange: (room: ChatRoom) => void;
  onLogout: () => void;
  onClose: () => void;
}

const Sidebar = ({ user, rooms, currentRoom, onRoomChange, onLogout, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LivePulseTalk
              </h2>
            </div>
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user.username}</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Rooms */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Chat Rooms
          </h3>
          <div className="space-y-1">
            {rooms.map((room) => (
              <Button
                key={room.id}
                variant={currentRoom.id === room.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  currentRoom.id === room.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onRoomChange(room)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0">
                    {room.isPrivate ? (
                      <Lock className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Hash className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium text-sm truncate">{room.name}</p>
                    <p className="text-xs text-gray-500 truncate">{room.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {room.memberCount}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
