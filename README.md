
# LivePulseTalk 💬

A modern, real-time chat application built with React, TypeScript, and Tailwind CSS. LivePulseTalk provides an intuitive and responsive chat experience with multiple rooms, user presence tracking, and message reactions.

![LivePulseTalk Screenshots:
(https://drive.google.com/file/d/1RfGpYhq6sturKvmiUEawdzFFiUx8zC3H/view?usp=drivesdk)
(https://drive.google.com/file/d/1RYzeygJQuwhtSOgzuz_2-QsEHYseSHo7/view?usp=drivesdk)

## ✨ Features

### 🚀 Core Functionality
- **Real-time Messaging** - Instant message delivery and synchronization
- **Multiple Chat Rooms** - Organize conversations by topics
- **User Authentication** - Simple username-based login system
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### 👥 User Experience
- **Online Presence** - See who's currently online and when users were last active
- **Message Reactions** - React to messages with emojis
- **Typing Indicators** - See when other users are typing
- **User Avatars** - Automatically generated unique avatars for each user
- **Message Timestamps** - Track when messages were sent

### 🎨 Modern UI/UX
- **Glass-morphism Design** - Beautiful backdrop blur effects
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Dark/Light Theme Ready** - Built with shadcn/ui components
- **Mobile-First** - Optimized for all screen sizes

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Hooks
- **Responsive Design**: Custom hooks with mobile detection

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd livepulsetalk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to `https://live-pulse-talk.lovable.app/` to see the application.

## 📱 Usage

### Getting Started
1. **Enter Username**: Start by entering your desired username on the welcome screen
2. **Join a Room**: Select from available chat rooms (General, Tech Talk, Random, Gaming)
3. **Start Chatting**: Send messages, react to others' messages, and enjoy real-time communication

### Features Guide
- **Send Messages**: Type in the message input and press Enter or click the send button
- **React to Messages**: Hover over messages to see reaction options
- **Switch Rooms**: Use the sidebar to navigate between different chat rooms
- **View Online Users**: Click the users icon to see who's currently online
- **Toggle Sound**: Use the sound icon to enable/disable notification sounds

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AuthScreen.tsx          # User authentication screen
│   ├── chat/
│   │   ├── ChatArea.tsx            # Main chat interface
│   │   ├── ChatLayout.tsx          # Overall chat layout
│   │   ├── MessageBubble.tsx       # Individual message component
│   │   ├── Sidebar.tsx             # Room navigation sidebar
│   │   ├── TypingIndicator.tsx     # Shows typing status
│   │   └── UserList.tsx            # Online users display
│   └── ui/                         # shadcn/ui components
├── hooks/
│   └── use-mobile.tsx              # Mobile detection hook
├── lib/
│   └── utils.ts                    # Utility functions
└── pages/
    └── Index.tsx                   # Main application entry point
```

## 🔧 Customization

### Adding New Chat Rooms
Edit the `chatRooms` array in `ChatLayout.tsx`:

```typescript
const chatRooms: ChatRoom[] = [
  { id: 'new-room', name: 'New Room', description: 'Description', memberCount: 0 },
  // ... existing rooms
];
```

### Customizing Themes
The application uses Tailwind CSS. Modify colors and styling in:
- `tailwind.config.ts` for global theme configuration
- Individual component files for specific styling

### Adding New Features
- **Message Types**: Extend the `Message` interface in `ChatLayout.tsx`
- **User Roles**: Add role properties to the `User` interface
- **Custom Reactions**: Modify the reactions array in `MessageBubble.tsx`

## 🚀 Deployment


### Manual Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service


## 📄 License

This project is open source and available under the [MIT License](LICENSE).





