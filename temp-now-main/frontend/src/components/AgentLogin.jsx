// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AgentLogin = () => {
//   const [agentName, setagentName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Save the agentName in localStorage
//     localStorage.setItem("agentName", agentName);

//     // Navigate to the /agent-chat route
//     navigate("/agent-chat");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#efefef]">
//       <div className="w-full max-w-md bg-[#ffffff] shadow-lg rounded-lg">
//         <div className="px-8 py-6">
//           <h2 className="text-2xl font-bold text-center text-[#000000] mb-6">
//             Login
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="agentName"
//                 className="block text-sm font-medium text-[#000000] mb-2"
//               >
//                 User ID
//               </label>
//               <input
//                 id="agentName"
//                 type="text"
//                 placeholder="Enter your user ID"
//                 value={agentName}
//                 onChange={(e) => setagentName(e.target.value)}
//                 className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#2b82fe] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b82fe] text-[#000000]"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-[#2b82fe] hover:bg-[#2b82fe]/90 text-[#ffffff] font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
//             >
//               Log in
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentLogin;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgentLogin = () => {
  const [agentName, setAgentName] = useState(""); // Changed to 'agentName'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the agentName in localStorage
    localStorage.setItem("agentName", agentName); // Store as 'agentName'

    // Navigate to the /agent-chat route
    navigate("/agent-chat");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#efefef]">
      <div className="w-full max-w-md bg-[#ffffff] shadow-lg rounded-lg">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-center text-[#000000] mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="agentName"
                className="block text-sm font-medium text-[#000000] mb-2"
              >
                Agent Name
              </label>
              <input
                id="agentName"
                type="text"
                placeholder="Enter your agent name"
                value={agentName} // Update binding
                onChange={(e) => setAgentName(e.target.value)} // Update value setter
                className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#2b82fe] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b82fe] text-[#000000]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2b82fe] hover:bg-[#2b82fe]/90 text-[#ffffff] font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
