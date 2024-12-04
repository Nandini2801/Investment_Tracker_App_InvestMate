import React from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faArrowRightArrowLeft,
  faBars,
  faDashboard,
  // faGear,
  faHouse,
  faNoteSticky,
  faRss,
  faSearch,
  faSwatchbook,
  // faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderLayout(props) {
  const sidebar = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  const NavItem = (props) => {
    const { icon, children, to, ...rest } = props;
    return (
      <Link to={to}>
        <Flex
          align="center"
          gap={"1rem"}
          px="4"
          mx="2"
          rounded="md"
          py="3"
          cursor="pointer"
          color="white"
          _hover={{
            bg: "blackAlpha.300",
            color: "whiteAlpha.900",
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          {...rest}
        >
          {icon && <FontAwesomeIcon icon={icon} style={{ color: "white" }} />}
          {children}
        </Flex>
      </Link>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="primary.500"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text
          fontSize="2xl"
          ml="2"
          color="white"
          margin={"auto"}
          fontWeight="semibold"
        >
          Investofolio
        </Text>

        <Button
          display={{ base: "flex", lg: "none" }}
          onClick={sidebar.onClose}
        >
          X
        </Button>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem to={"/dashboard"} icon={faHouse}>
          Dashboard
        </NavItem>
        <NavItem to={"/esg"} icon={faRss}>
          ESG Articles
        </NavItem>
        <NavItem to={"/portfolios"} icon={faDashboard}>
          Portfolios
        </NavItem>
        <NavItem to={"/watchlists"} icon={faNoteSticky}>
          Watchlists
        </NavItem>
        <NavItem to={"/transactions"} icon={faArrowRightArrowLeft}>
          Past Transactions
        </NavItem>
        <NavItem to={"/stocks"} icon={faSwatchbook}>
          Stocks
        </NavItem>
        {/* <NavItem to={"/wallet"} icon={faWallet}>
          Wallet
        </NavItem>
        <NavItem to={"/profile"} icon={faGear}>
          Settings
        </NavItem> */}
      </Flex>
    </Box>
  );

  return (
    <>
      <Box as="section" display={"flex"} gap={"10px"} minH="100vh">
        <SidebarContent display={{ base: "none", lg: "unset" }} w="20%" />

        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
          // size={{ base: "80%" ,xs:"xs"}}
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>

        <Box
          ml={{ base: 0, md: "auto" }}
          width={{ base: "100%", lg: "80%" }}
          transition=".3s ease"
        >
          <Flex
            as="header"
            align="center"
            justify={{ base: "space-between", lg: "flex-end" }}
            w="full"
            px="4"
            bg="white"
            borderBottomWidth="1px"
            borderColor="blackAlpha.300"
            h="16"
            position={"sticky"}
            top={0}
            zIndex={1}
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", lg: "none" }}
              onClick={sidebar.onOpen}
              icon={
                <FontAwesomeIcon icon={faBars} style={{ color: "#050505" }} />
              }
              size="sm"
              variant={"outline"}
            />

            <Button float={"right"} onClick={handleLogout}>
              Logout
            </Button>
          </Flex>

          <Box as="main" p="4">
            {/* Add content here, remove div below  */}
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
