import React from "react";
import {
  Container,
  SimpleGrid,
  extendTheme,
  Link,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Box,
  chakra,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import hi from "../../assets/animations/animation_lnllvk3k.json";
import about from "../../assets/animations/animation_lnlluotr.json";

function AboutUs() {
  return (
    <Container maxW={"full"} bg="primary.100">
      {/* <chakra.h1
      fontSize={{ base: "3xl", sm: "4xl" }}
      fontWeight="extrabold"
      lineHeight="shorter"
      color="primary.500"
      _dark={{ color: "secondary.500" }}
      mb={6} padding={6}>
        Know Us
        </chakra.h1> */}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} padding={6}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"primary.500"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("primary.200", "primary.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Our Story
          </Text>
          <Heading color={"primary.500"}>
            A digital investment tracking agency
          </Heading>
          <Text color={"primary.500"} fontSize={"lg"}>
            Don't look for the needle in the haystack. Just buy the haystack!
          </Text>
          <chakra.h5
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="extrabold"
            lineHeight="shorter"
            color="primary.500"
            _dark={{ color: "secondary.500" }}
            mb={6}
          >
            Who are we?
          </chakra.h5>
        </Stack>
        <Flex>
          <Lottie animationData={about} />
        </Flex>
      </SimpleGrid>

      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={10}>
          <Stack>
            <Box
              w="xs"
              bg="white"
              _dark={{ bg: "gray.800" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
              <Image
                w="full"
                h={72}
                fit="cover"
                src="./src/assets/dhananjay.jpg"
                alt="avatar"
              />

              <Box py={5} textAlign="center">
                <Link
                  display="block"
                  fontSize="2xl"
                  color="primary.800"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                >
                  Dhananjay
                </Link>
                <chakra.span
                  fontSize="sm"
                  color="primary.700"
                  _dark={{ color: "gray.200" }}
                >
                  Software Engineer
                </chakra.span>
              </Box>
            </Box>

            {/* <Flex
        w={}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        <img src ="./src/assets/dhananjay.jpg"/>
      </Flex>
      <Text fontWeight={600}>Dhananjay</Text>
      <Text color={'gray.600'}>Hi!</Text> */}
          </Stack>
          <Stack>
            <Box
              w="xs"
              bg="white"
              _dark={{ bg: "gray.800" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
              <Image
                w="full"
                h={72}
                fit="cover"
                src="./src/assets/Nandini.jpg"
                alt="avatar"
              />

              <Box py={5} textAlign="center">
                <Link
                  display="block"
                  fontSize="2xl"
                  color="primary.800"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                >
                  Nandini
                </Link>
                <chakra.span
                  fontSize="sm"
                  color="primary.700"
                  _dark={{ color: "gray.200" }}
                >
                  Software Engineer
                </chakra.span>
              </Box>
            </Box>
          </Stack>
          <Stack>
            <Box
              w="xs"
              bg="white"
              _dark={{ bg: "primary.800" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
              <Image
                w="full"
                h={72}
                fit="cover"
                src="./src/assets/tej.jpg"
                alt="avatar"
              />

              <Box py={5} textAlign="center">
                <Link
                  display="block"
                  fontSize="2xl"
                  color="primary.800"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                >
                  Tej Sahan
                </Link>
                <chakra.span
                  fontSize="sm"
                  color="primary.700"
                  _dark={{ color: "gray.200" }}
                >
                  Software Engineer
                </chakra.span>
              </Box>
            </Box>
          </Stack>
          <Stack>
            <Box
              w="xs"
              bg="white"
              _dark={{ bg: "primary.800" }}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
              <Image
                w="full"
                h={72}
                fit="cover"
                src="./src/assets/swastika.jpg"
                alt="avatar"
              />

              <Box py={5} textAlign="center">
                <Link
                  display="block"
                  fontSize="2xl"
                  color="primary.800"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                >
                  Swastika
                </Link>
                <chakra.span
                  fontSize="sm"
                  color="primary.700"
                  _dark={{ color: "gray.200" }}
                >
                  Software Engineer
                </chakra.span>
              </Box>
            </Box>
          </Stack>
        </SimpleGrid>
      </Box>
    </Container>
  );
}
export default AboutUs;
