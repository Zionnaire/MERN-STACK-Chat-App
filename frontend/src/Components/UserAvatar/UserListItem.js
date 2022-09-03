import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  const { user } = ChatState();
  return <Box onClick={handleFunction} cursor="pointer"></Box>;
};

export default UserListItem;
