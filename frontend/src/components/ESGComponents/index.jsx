import React from "react";
import { useState } from "react";
import { Box, Text, Center, useMediaQuery, Tooltip } from "@chakra-ui/react";

function ESGCard({ term, content }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSmallScreen, isMediumScreen] = useMediaQuery([
    "(max-width: 640px)", // Small screen (mobile)
    "(max-width: 768px)", // Medium screen (tablet)
  ]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Tooltip label="Tap Me" hasArrow>
      <Box
        w="100%"
        p={4}
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={handleCardClick}
      >
        <Center
          // bgGradient="linear(to-t, #6B46C1, #805AD5)"
          bgColor={"primary.500"}
          w="100%"
          h="220px"
          boxShadow="lg"
          p={isMediumScreen ? 2 : 4} // Adjust padding for medium screens
          borderRadius="md"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
          color="white"
        >
          {isFlipped ? (
            <Text
              fontSize={isSmallScreen ? "sm" : isMediumScreen ? "xs" : "sm"}
            >
              {content}
            </Text>
          ) : (
            <Text
              fontWeight="bold"
              fontSize={isSmallScreen ? "lg" : isMediumScreen ? "lg" : "xl"}
            >
              {term}
            </Text>
          )}
        </Center>
      </Box>
    </Tooltip>
  );
}

export default ESGCard;
