import { CiSearch } from "react-icons/ci";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
// import Chat from "./Chat";
import ChatList from "./ChatList";

const SidebarPannel = () => {
  return (
    <div>
      <div className=" bg- flex justify-between items-center">
        <div className="w-full">
          <div className="flex items-center p-2 bg-white rounded-lg w-full border">
            <CiSearch />
            <input
              className="bg-white w-full border-none active:border-none"
              placeholder="Search or start new chat"
            />
          </div>
          <div className="flex gap-2 mt-2 w-full">
            <Tabs defaultValue="All" className="w-full ">
              <TabsList className=" p-1 w-full flex gap-2 bg-white rounded-lg">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Assigend to me">
                  Assigend to me{" "}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="All">
                {/* <Chat /> */}
                <ChatList />
              </TabsContent>
              <TabsContent value="Assigend to me">
                active tabs wali chats
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPannel;
