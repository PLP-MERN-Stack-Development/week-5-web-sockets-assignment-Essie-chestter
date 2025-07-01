
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface AuthScreenProps {
  onLogin: (user: { id: string; username: string; avatar?: string }) => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        username: username.trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      };
      
      onLogin(userData);
      toast.success(`Welcome to LivePulseTalk, ${username}!`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LivePulseTalk
          </h1>
          <p className="text-gray-600 mt-2">Real-time communication at its finest</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join the Conversation</CardTitle>
            <CardDescription>
              Enter your username to start chatting with others in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 text-lg"
                  maxLength={20}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </div>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start Chatting
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <MessageCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Real-time Messaging</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Multiple Rooms</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <Zap className="h-6 w-6 text-pink-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Instant Sync</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
