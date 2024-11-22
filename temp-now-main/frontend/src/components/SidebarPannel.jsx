import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import PropTypes from 'prop-types';
import { FaEllipsisV } from "react-icons/fa";  // Importing 3-dot icon for menu

const SidebarPannel = ({ onUserSelect }) => {
  const [allChats, setAllChats] = useState([]); // For "All" tab
  const [assignedChats, setAssignedChats] = useState([]); // For "Assigned to me" tab
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch all chats for 'All' tab
  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/messages/messages/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        console.log("API Response (All Chats):", data); // Debugging line

        if (data.length > 0) {
          const formattedAllChats = data.map((msg) => {
            const lastChat =
              msg.chatHistory.length > 0
                ? msg.chatHistory[msg.chatHistory.length - 1]
                : null;
            return {
              id: msg._id,
              userId: msg.userId,
              lastMessage: lastChat ? lastChat.messageBody : msg.messageBody,
              time: new Date(lastChat ? lastChat.timestamp : msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: msg.status === "unread" ? 1 : 0,
              priority: msg.priority || "normal", // Added priority
            };
          });

          setAllChats(formattedAllChats);
        } else {
          console.log("No chats found for All tab");
          setAllChats([]);
        }
      } catch (error) {
        console.error("Error fetching all chats:", error);
      }
    };

    fetchAllChats();
  }, []);

  // Fetch chats assigned to the logged-in agent
  useEffect(() => {
    const fetchAssignedChats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/messages/messages/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.length > 0) {
          const agentName = localStorage.getItem("agentName");
          const filteredChats = data.filter((msg) => msg.agentName === agentName);

          const formattedAssignedChats = filteredChats.map((msg) => {
            const lastChat =
              msg.chatHistory.length > 0
                ? msg.chatHistory[msg.chatHistory.length - 1]
                : null;
            return {
              id: msg._id,
              userId: msg.userId,
              lastMessage: lastChat ? lastChat.messageBody : msg.messageBody,
              time: new Date(lastChat ? lastChat.timestamp : msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: msg.status === "unread" ? 1 : 0,
              priority: msg.priority || "normal", // Added priority
            };
          });

          setAssignedChats(formattedAssignedChats);
        } else {
          setAssignedChats([]);
        }
      } catch (error) {
        console.error("Error fetching assigned chats:", error);
      }
    };

    fetchAssignedChats();
  }, []);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    onUserSelect(chat.userId);
  };

  const handleAssignChat = async (chatId) => {
    const agentName = localStorage.getItem("agentName");
    const response = await fetch(`http://localhost:3000/api/messages/${chatId}/assign-agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentName }),
    });

    if (response.ok) {
      alert(`Chat assigned to ${agentName}`);
      fetchAssignedChats(); // Refetch the assigned chats after assigning
    } else {
      alert("Failed to assign the chat");
    }
  };

  if (allChats.length === 0 && assignedChats.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <div className="w-full">
          <div className="flex items-center p-2 bg-white rounded-lg w-full border">
            <CiSearch />
            <input className="bg-white w-full border-none active:border-none" placeholder="Search or start new chat" />
          </div>
          <div className="flex gap-2 mt-2 w-full">
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="p-1 w-full flex gap-2 bg-white rounded-lg">
                <TabsTrigger value="All">All Chats</TabsTrigger>
                <TabsTrigger value="Assigned to me">Assigned to me</TabsTrigger>
              </TabsList>
              <TabsContent value="All">
                <div className="h-[calc(100vh-120px)] w-full bg-white rounded-lg p-2 border">
                  {allChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center p-3 cursor-pointer hover:bg-[#f4f6f8] mb-1 rounded-md ${
                        selectedChat && selectedChat.id === chat.id ? "bg-[#f4f6f8] rounded-md" : ""
                      }`}
                      onClick={() => handleChatClick(chat)}
                    >
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-semibold">{chat.userId}</span>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 text-ellipsis w-full overflow-hidden ">
                            {chat.lastMessage}
                          </p>
                          <div className="ml-2">
                            <button
                            className="cursor-pointer text-xs border border-green-300 bg-green-100 rounded-md px-1"
                            onClick={() => handleAssignChat(chat.id)}>
                              Assign to me
                            </button>
                            {/* <FaEllipsisV
                              
                            /> */}
                          </div>
                        </div>
                        <div className={`text-xs mt-1 text-${chat.priority === "urgent" ? "red" : chat.priority === "high" ? "orange" : "green"}-500 bg-${chat.priority === "urgent" ? "red" : chat.priority === "high" ? "orange" : "green"}-100 w-min px-1 rounded-md font-bold` }>
                          {chat.priority}
                        </div>
                      </div>
                      {/* {chat.unread > 0 && (
                        <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {chat.unread}
                        </div>
                      )} */}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Assigned to me">
                <div className="h-[calc(100vh-120px)] w-full bg-white rounded-lg p-2 border">
                  {assignedChats.map((chat) => (
                    <button
                      key={chat.id}
                      className={`flex items-center p-3 cursor-pointer hover:bg-[#f4f6f8] mb-1 rounded-md w-full text-left ${
                        selectedChat && selectedChat.id === chat.id ? "bg-[#f4f6f8] rounded-md" : ""
                      }`}
                      onClick={() => handleChatClick(chat)}
                    >
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-semibold">{chat.userId}</span>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 text-ellipsis w-full overflow-hidden ">{chat.lastMessage}</p>
                          {/* <div className="ml-2">
                            <FaEllipsisV
                              className="cursor-pointer"
                              onClick={() => handleAssignChat(chat.id)}
                            />
                          </div> */}
                        </div>
                        <div className={`text-xs mt-1 text-${chat.priority === "urgent" ? "red" : chat.priority === "high" ? "orange" : "green"}-500 bg-${chat.priority === "urgent" ? "red" : chat.priority === "high" ? "orange" : "green"}-100 w-min px-1 rounded-md font-bold`}>
                          {chat.priority}
                        </div>
                      </div>
                      {/* {chat.unread > 0 && (
                        <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {chat.unread}
                        </div>
                      )} */}
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarPannel.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
};

export default SidebarPannel;
