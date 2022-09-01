import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import MyChats from "../Components/MyChats.js";
import ChatBox from "../Components/ChatBox.js";
import SideDrawer from "../Components/misc/SideDrawer";

const ChatsPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatsPage;
