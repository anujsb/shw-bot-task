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
  return (
    <div className="flex-1 flex flex-col p-4 min-h-screen">
      <div className="flex-1 p-4 bg-white rounded-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.isSent ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isSent ? "bg-[#b0d1ff] " : "bg-[#f4f6f8]"
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
          <button  size="icon">
            <CiFaceSmile className="h-6 w-6" />
          </button>
          <button  size="icon">
            <GoPaperclip className="h-6 w-6" />
          </button>
          <input className="flex-1 bg-white p-2 rounded-md" placeholder="Type a message" />
          <button  size="icon">
            <IoSend className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
};

export default Chat;
