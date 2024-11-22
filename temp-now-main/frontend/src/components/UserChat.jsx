import React, { useEffect, useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { IoSend } from "react-icons/io5";

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [msgId, setMsgId] = useState(null);

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      // Retrieve the userId from localStorage
      const userId = localStorage.getItem("userId");

      // Ensure the userId exists
      if (!userId) {
        console.error("User ID is not found in localStorage.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/messages/messages/user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }), // Use the retrieved userId
        }
      );
      const data = await response.json();

      // Set the msgId dynamically from the first message
      if (data.messages.length > 0) {
        setMsgId(data.messages[0]._id);
      }

      // Transform the API response
      const transformedMessages = data.messages.flatMap((msg) => {
        const parentMessage = {
          id: msg._id,
          sender: "You",
          content: msg.messageBody,
          time: new Date(msg.timestamp).getTime()
            ? new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Invalid Time",
          isSent: true,
        };

        const chatHistoryMessages = msg.chatHistory.map((chat) => ({
          id: chat._id,
          sender: chat.sender === "agent" ? "Alice" : "You",
          content: chat.messageBody,
          time: new Date(chat.timestamp).getTime()
            ? new Date(chat.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Invalid Time",
          isSent: chat.sender !== "agent",
        }));

        return [parentMessage, ...chatHistoryMessages];
      });

      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []); // Re-fetch messages on component mount

  // Handle message input change
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  // Send message function
  const sendMessage = async () => {
    if (!messageInput.trim() || !msgId) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/${msgId}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: "customer",
            messageBody: messageInput,
          }),
        }
      );

      const newMessage = await response.json();

      // Assuming the backend responds with the new message details
      const transformedMessage = {
        id: newMessage._id,
        sender: "You",
        content: newMessage.messageBody,
        time: new Date(newMessage.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSent: true,
      };

      // Add the new message and fetch the updated messages
      setMessages((prevMessages) => [...prevMessages, transformedMessage]);
      setMessageInput("");

      // Re-fetch messages to keep everything synced
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 h-screen">
      <div className="flex-1 p-4 bg-white rounded-lg overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.isSent ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isSent ? "bg-[#b0d1ff]" : "bg-[#f4f6f8]"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs text-gray-500 text-right mt-1">
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 bg-white flex items-center space-x-2 mt-2 rounded-lg">
        <button size="icon">
          <CiFaceSmile className="h-6 w-6" />
        </button>
        <button size="icon">
          <GoPaperclip className="h-6 w-6" />
        </button>
        <input
          value={messageInput}
          onChange={handleInputChange}
          className="flex-1 bg-white p-2 rounded-md"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} size="icon">
          <IoSend className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default UserChat;
