import React from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box bg="white" _dark={{ bg: "gray.600" }}>
      <Stack direction={{ base: "column", lg: "row" }} w="full" p={5}>
        <Flex justify="center">
          <Link to={"/home"}>
            <Image
              src="/Color-logo-with-background.svg"
              alt="Company Logo"
              rounded="lg"
              fit="contain"
              width={"300px"}
              height={"100px"}
              my={{ base: 2, lg: 0 }}
            />
          </Link>
        </Flex>
        <HStack
          alignItems="center"
          flex={1}
          justify="space-around"
          fontSize={{ base: "12px", md: "16px" }}
          color="gray.800"
          _dark={{ color: "white" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Link to={"/about"}>About Us</Link>
          <Link to={"/contact"}>Contact Us</Link>
          <Link to={"/contact"}>Support</Link>
        </HStack>
      </Stack>
      <Divider
        w="95%"
        mx="auto"
        color="primary.600"
        _dark={{ color: "primary.600" }}
        h="3.5px"
      />
      <VStack py={3}>
        <HStack justify="center">
          <Link>
            <FontAwesomeIcon
              color="gray.800"
              _dark={{ color: "white" }}
              h="20px"
              w="20px"
              icon={faFacebookF}
              data-testid="facebook-icon"
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              color="gray.800"
              _dark={{ color: "white" }}
              h="20px"
              w="20px"
              icon={faXTwitter}
              data-testid="twitter-icon"
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              _dark={{ color: "white" }}
              h="20px"
              w="20px"
              icon={faInstagram}
              data-testid="instagram-icon"
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              _dark={{ color: "white" }}
              h="20px"
              w="20px"
              icon={faLinkedin}
              data-testid="linkedin-icon"
            />
          </Link>
        </HStack>

        <Text textAlign="center" fontSize="smaller" _dark={{ color: "white" }}>
          &copy;Copyright. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
}
