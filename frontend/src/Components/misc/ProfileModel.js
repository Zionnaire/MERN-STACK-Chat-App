import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          onClick={onOpen}
          icon={<ViewIcon />}
          d={{ base: "flex" }}
        ></IconButton>
      )}
      <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            display="flex"
            fontSize="40px"
            fontFamily="Work sans"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            alignItems="center"
            flexDir="column"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            ></Image>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
              py="20px"
            >
              email : {user.email}{" "}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModel;
