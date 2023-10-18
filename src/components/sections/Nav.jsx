import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {useCookies} from 'react-cookie';

export default function Nav({ user }) {

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  

  const NAV_ITEMS = [
    {
      label: "Main",
      to: "/",
    },
  ];

  if (user) {
    NAV_ITEMS.push({
      label: "Add Note",
      to: "/add",
    });
  }

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav removeCookie={removeCookie} NAV_ITEMS={NAV_ITEMS}/>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user ? (
            <Button
              onClick={()=>{
                removeCookie("token");
                window.location.reload();
              }}
              as={RouterLink}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              _hover={{
                bg: "blue.200",
              }}
            >
              יציאה
            </Button>
          ) : (
            <Button
              as={RouterLink}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.900"}
              to={"/login"}
              _hover={{
                bg: "blue.300",
              }}
            >
              Log In
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          flex={{ base: 0, md: 0 }}
          alignItems="center"
          direction={{ base: "column", md: "row" }}
          spacing={6}
          display={{ base: "flex", md: "none" }}
        >
          {user ? (
            <Button
              onClick={()=>{
                removeCookie("token");
                window.location.reload();
              }}
              mx="10px"
              p="10px"
              as={RouterLink}
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              _hover={{
                bg: "blue.300",
              }}
            >
              יציאה
            </Button>
          ) : (
            <Button
              mt="5px"
              mx="10px"
              p="10px"
              as={RouterLink}
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              to={"/login"}
              _hover={{
                bg: "blue.300",
              }}
            >
              כניסה
            </Button>
          )}
        </Stack>

        <MobileNav NAV_ITEMS={NAV_ITEMS}/>
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({NAV_ITEMS}) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraLink
                p={2}
                as={RouterLink}
                to={navItem.to}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({NAV_ITEMS}) => {
  return (
    <Flex justify="center">
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    </Flex>
  );
};

const MobileNavItem = ({ label, children, to }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={to}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          fontSize={"lg"}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} as={RouterLink} to={child.to}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
