import React, { useState, useEffect } from "react";
import { chakra, Box, Stack, Image, Flex, extendTheme, SimpleGrid, Text} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import Analyse from "../../assets/animations/analyse.json";
import Invest from "../../assets/animations/invest.json";
import Learn from "../../assets/animations/animation_ln4x3rto.json";

function HomePage(){
    // Define an array of button texts for the carousel
    const slides = [
        {
          img: "./src/assets/carousel1.jpg",
        },
        {
          img: "./src/assets/carousel2.jpg",
        },
        {
          img: "./src/assets/carousel3.jpg",
        },
              ];
      const [currentSlide, setCurrentSlide] = useState(0);
    
      const slidesCount = slides.length;
    
      const carouselStyle = {
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
      };
    
      const SLIDES_INTERVAL_TIME = 3000;
      const ANIMATION_DIRECTION = "right";
    
      useEffect(() => {
        const prevSlide = () => {
          setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
        };
    
        const nextSlide = () => {
          setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
        };
    
        const automatedSlide = setInterval(() => {
          ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
        }, SLIDES_INTERVAL_TIME);
        return () => clearInterval(automatedSlide);
      }, [slidesCount]);
  const buttonTexts = [
    "Check out Kotak Tax Saver Fund",
    "Check out Reliance",
    "Check out ICICI Pru Bluechip",
    "Check out SBI Small Cap Fund"
    // Add more button texts as needed
  ];

  // Initialize state to keep track of the current text index
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Use useEffect to rotate the button text at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next index, wrapping around to the beginning if needed
      const nextIndex = (currentTextIndex + 1) % buttonTexts.length;
      setCurrentTextIndex(nextIndex);
    }, 3000); // Change text every 3 seconds (adjust as needed)
// Clear the interval when the component unmounts
return () => clearInterval(interval);
}, [currentTextIndex, buttonTexts.length]);

// Use the currentTextIndex to display the current button text
const currentButtonText = buttonTexts[currentTextIndex];
  return (
    <Flex direction="column">
    <Flex
      direction={{ base: "column", md: "row" }}
      _light={{ bg: "primary.500" }}
      px={8}
      py={24}
      mx="auto"
      
    >
      <Box
        w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        pr={{ md: 20 }}
        rounded="lg"
        borderRadius="50px"
        
      >
        <chakra.h1
          fontSize={{ base: "3xl", sm: "4xl" }}
          fontWeight="extrabold"
          lineHeight="shorter"
          color="white"
          _dark={{ color: "gray.100" }}
          mb={6}
        >
          <chakra.span display="block">Financial freedom begins here</chakra.span>
          <chakra.span
            display="block"
            color="white"
            _dark={{ color: "gray.500" }}
          >
            Start your free trial today.
          </chakra.span>
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.100"
          _dark={{ color: "gray.300" }}
        >
          All the tools you need to make wise & effective investment decisions
        </chakra.p>
        <Stack
          direction={{ base: "column", sm: "row" }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
        >
          <Box display="inline-flex" rounded="md" shadow="md">
          <Link to="/login">
            <chakra.a
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="solid transparent"
              fontWeight="bold"
              w="full"
              rounded="md"
              _light={{ color: "white" }}
              bg="primary.600"
              _dark={{ bg: "primary.500" }}
              _hover={{
                bg: "primary.700",
                _dark: { bg: "primary.600" },
              }}
            >
              Login
            </chakra.a>
            </Link>
          </Box>
        </Stack>
      </Box>
      <Box w={{ base: "full", md: 10 / 12 }} mx="auto" textAlign="center">
        <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          src="https://kutty.netlify.app/hero.jpg"
          alt="Hellonext feedback boards software screenshot"
        />
      </Box>
      </Flex>
      
      <Box
        px={8}
        py={20}
        mx="auto"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="xl"
        w="full"
      >
        <Box textAlign={{ lg: "center" }}>
        <chakra.p
            mt={2}
            maxW="2xl"
            fontSize="xl"
            mx={{ lg: "auto" }}
            color="primary.400"
            _dark={{ color: "gray.400" }}
          >
            What is InvestMate?
          </chakra.p>
          <chakra.p
            mt={6}
            fontSize={{ base: "3xl", sm: "4xl" }}
            lineHeight="8"
            fontWeight="extrabold"
            letterSpacing="tight"
            _light={{ color: "gray.900" }}
          >
            Start your investing journey
          </chakra.p>
          
        </Box>
        <Flex
      bg="primary.50"
      _dark={{ bg: "secondary.50" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
      direction="row"
      rounded="lg"
      borderRadius= "100px"
      mt={10}
    >
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
          spacingX={{ base: 5, lg: 15 }}
          spacingY={20}
          mt={6}
          ml={10}
          mr={10}
          
        >
          
      <Box
        w="full"
        maxW="sm"
        mx="auto"
        px={4}
        py={3}
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="md"
        rounded="md"
      >
        
        <Box>
          <Box width="200px" // Set the width you want
      height="200px">
        <Lottie animationData={Analyse} />
        </Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color="gray.800"
            _dark={{ color: "white" }}
          >
            Analyse
          </chakra.h1>
          <chakra.p
            fontSize="sm"
            mt={2}
            color="gray.600"
            _dark={{ color: "gray.300" }}
          >
            Screen, Compare & evaluate your investments
          </chakra.p>
        </Box>

        
      </Box>
      <Box
        w="full"
        maxW="sm"
        mx="auto"
        px={4}
        py={3}
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="md"
        rounded="md"
      >
        
        <Box>
        <Box width="200px" // Set the width you want
      height="200px">
        <Lottie animationData={Invest} />
        </Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color="gray.800"
            _dark={{ color: "white" }}
          >
           Invest
          </chakra.h1>
          <chakra.p
            fontSize="sm"
            mt={2}
            color="gray.600"
            _dark={{ color: "gray.300" }}
          >
            Invest & track your portfolios with crisp insights
          </chakra.p>
        </Box>

        
      </Box>
      <Box
        w="full"
        maxW="sm"
        mx="auto"
        px={4}
        py={3}
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="md"
        rounded="md"
      >
        

        <Box>
        <Box width="200px" // Set the width you want
      height="200px">
        <Lottie  animationData={Learn} />
        </Box>
          <chakra.h1
            fontSize="lg"
            fontWeight="bold"
            mt={2}
            color="gray.800"
            _dark={{ color: "white" }}
          >
            Learn
          </chakra.h1>
          <chakra.p
            fontSize="sm"
            mt={2}
            color="gray.600"
            _dark={{ color: "gray.300" }}
          >
            Grow & learn with a supportive community
          </chakra.p>
        </Box>

        
      </Box>
    
        </SimpleGrid>
        </Flex>
      </Box>
      <Flex borderRadius={50}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
        <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, md: 8, lg: 20 }}
        py={24}
        zIndex={3}
      >
        <chakra.span
          color="primary.600"
          _dark={{ color: "gray.300" }}
          fontSize="lg"
          textTransform="uppercase"

        >
          A BETTER WAY TO ANALYSE
        </chakra.span>
        <chakra.h1
          mb={4}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color="primary.600"
          _dark={{ color: "gray.300" }}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Focus on what matters
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color="primary.600"
          _dark={{ color: "gray.400" }}
          letterSpacing="wider"
        >
          Discover top stocks & mutual funds with forecast, analyst ratings, scorecard & more
        </chakra.p>
        <Box display="inline-flex" rounded="md" shadow="md">
          <chakra.a
            mt={2}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={5}
            py={3}
            w="350px" 
            h="50px"
            border="solid transparent"
            fontWeight="bold"
            
            rounded="md"
            _light={{ color: "white" }}
            bg="primary.600"
            _dark={{ bg: "brand.500" }}
            _hover={{
              bg: "primary.700",
              _dark: { bg: "primary.600" },
            
            }}
          >
            <span>{currentButtonText}</span>
    <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} />
            
          </chakra.a>
        </Box>
      </Flex>
      <Flex
      bg="primary.400"
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="600px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              
              <Image
                src={slide.img}
                alt="carousel image"
                fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          bg="gray.100"
          loading="lazy"
          opacity={0.4}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
    </SimpleGrid>
    </Flex>
    </Flex>
    
  );
}
export default HomePage;
