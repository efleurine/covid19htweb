import React from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  CloseButton,
  Heading,
  IconButton,
} from "@chakra-ui/core";

import { AiOutlineMenu } from "react-icons/ai";

import { maxWidth } from "./common";
import { TopMenu } from "./top-menu";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        flexDirection="row"
        marginX="auto"
        maxWidth={maxWidth}
        justifyContent="space-between"
        width="100%"
        padding="16px"
        // fontFamily="mono"
      >
        <Button variantColor="teal" size="lg" variant="link" onClick={onOpen}>
          Meni
        </Button>
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex direction="row">
              <Box marginRight="auto">Meni Prensipal</Box>
              <CloseButton onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <TopMenu close={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
