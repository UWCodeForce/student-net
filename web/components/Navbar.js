import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import HamburgerIcon from "@chakra-ui/icon";
import CloseIcon from "@chakra-ui/icon";

const Links = [
  "Home",
  "Forum",
  "Courses",
  "Jobs",
  "Housing",
  "RateMyProfessor",
];

const NavLink = ({ children }, { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

function NavBar() {
  const Router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false); //fetch this state from the state storage

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
            bgColor={"gray.100"}
          >
            {Links.map((link) => (
              <Button key={link}>{link}</Button>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {" "}
          {/* If the user is logged in display the avatar menu else display the signin & signout button*/}
          {isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>My Profile</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => setIsLoggedIn(false)}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Stack direction="row" spacing={4} align="center">
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  Router.push("/signin");
                }}
              >
                Sign In
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => Router.push("/signup")}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;
