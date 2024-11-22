// import { useState } from "react";

// const chats = [
//   {
//     id: 1,
//     name: "Alice",
//     lastMessage: "Hey, how are you?",
//     time: "10:30 AM",
//     unread: 2,
//   },
//   {
//     id: 2,
//     name: "Bob",
//     lastMessage: "Can we meet tomorrow?",
//     time: "Yesterday",
//     unread: 0,
//   },
//   {
//     id: 3,
//     name: "Charlie",
//     lastMessage: "Thanks for the help!",
//     time: "Tuesday",
//     unread: 0,
//   },
//   // Add more chat items as needed
// ];

// const ChatList = () => {
//   const [selectedChat, setSelectedChat] = useState(chats[0]);

//   return (
//     <div>
//       <div className="h-[calc(100vh-120px)] w-full bg-white rounded-lg p-2">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             className={`flex items-center p-3 cursor-pointer hover:bg-[#f4f6f8] mb-1 rounded-md ${
//               selectedChat.id === chat.id ? "bg-[#f4f6f8] rounded-md" : ""
//             }`}
//             onClick={() => setSelectedChat(chat)}
//           >
//             {/* <Avatar className="h-12 w-12">
//                 <AvatarImage src={`/placeholder-avatar-${chat.id}.jpg`} alt={chat.name} />
//                 <AvatarFallback>{chat.name[0]}</AvatarFallback>
//               </Avatar> */}
//             <div className="ml-3 flex-1">
//               <div className="flex justify-between items-baseline ">
//                 <span className="font-semibold">{chat.name}</span>
//                 <span className="text-xs text-gray-500">{chat.time}</span>
//               </div>
//               <p className="text-sm text-gray-600 truncate">
//                 {chat.lastMessage}
//               </p>
//             </div>
//             {chat.unread > 0 && (
//               <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                 {chat.unread}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatList;
