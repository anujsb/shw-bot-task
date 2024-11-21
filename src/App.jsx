import "./App.css";
import AgentLogin from "./components/AgentLogin";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserChat from "./components/UserChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/agent-chat"
          element={
            <div className="h-screen">
              <Header />
              <div className="flex h-full bg- ">
                <Sidebar />

                <Chat />
              </div>
            </div>
          }
        />
        <Route
          path="/agent-login"
          element={
            <div className="h-screen">
              <AgentLogin />
            </div>
          }
        />
        <Route
          path="/user-login"
          element={
            <div className="h-screen">
              <UserLogin />
            </div>
          }
        />
        <Route
          path="/user-chat"
          element={
            <div className="h-screen">
              <UserChat />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
    // <div className="h-screen">
    //   <Header />
    //   <div className="flex h-full bg- ">
    //     <Sidebar />

    //     <Chat />
    //   </div>
    // </div>
  );
}

export default App;
