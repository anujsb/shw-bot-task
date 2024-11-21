import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-full bg- ">
        <Sidebar />

        <Chat />
      </div>
    </div>
  );
}

export default App;
