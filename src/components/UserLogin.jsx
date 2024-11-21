import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log("Logging in with user ID:", userId);
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
                htmlFor="userId"
                className="block text-sm font-medium text-[#000000] mb-2"
              >
                User ID
              </label>
              <input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#2b82fe] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b82fe] text-[#000000]"
              />
            </div>
            <Link to="/user-chat">
              <button
                type="submit"
                className="w-full bg-[#2b82fe] hover:bg-[#2b82fe]/90 text-[#ffffff] font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Log in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
