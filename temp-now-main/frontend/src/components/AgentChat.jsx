// AgentChat.jsx
import { useState } from 'react';
import SidebarPannel from './SidebarPannel';
import Chat from './Chat';

const AgentChat = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className="flex w-full m-4 ">
      <div className="w-1/4 min-w-[300px]">
        <SidebarPannel onUserSelect={setSelectedUserId} />
      </div>
      <div className="flex-1">
        {selectedUserId ? (
          <Chat userId={selectedUserId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentChat;