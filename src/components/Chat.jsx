import { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { IoSend } from "react-icons/io5";

const messages = [
  {
    id: 1,
    sender: "Alice",
    content: "Hi there!",
    time: "10:30 AM",
    isSent: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hello! How are you?",
    time: "10:31 AM",
    isSent: true,
  },
  {
    id: 3,
    sender: "Alice",
    content: "I'm good, thanks! How about you?",
    time: "10:32 AM",
    isSent: false,
  },
  {
    id: 4,
    sender: "You",
    content: "I'm doing well too. Any plans for the weekend?",
    time: "10:33 AM",
    isSent: true,
  },
  // Add more messages as needed
];

const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");

  return (
    <div className="flex flex-1 flex-col bg-white rounded-xl p-2">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold">Alice</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.isSent ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isSent && (
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                {message.sender[0]}
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isSent ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              <p>{message.content}</p>
              <p className="mt-1 text-right text-xs text-gray-700">
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <CiFaceSmile className="h-6 w-6" />
          </button>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <GoPaperclip className="h-6 w-6" />
          </button>
          <input
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
            <IoSend className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

