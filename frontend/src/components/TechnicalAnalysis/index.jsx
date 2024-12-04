import React from "react";
import { useState } from "react";
import { Box, Input, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { TechnicalAnalysis as TradingViewTechnicalAnalysis } from "react-ts-tradingview-widgets";

function TechnicalAnalysis() {
  const [symbol, setSymbol] = useState("");
  const [displayedSymbol, setDisplayedSymbol] = useState("HDFC");

  const handleInputChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleShowAnalysis = () => {
    setDisplayedSymbol(symbol);
  };

  const buttonSize = useBreakpointValue({
    base: "sm",
    sm: "md",
    md: "lg",
    lg: "lg",
  });
  const inputPadding = useBreakpointValue({
    base: "2",
    sm: "2",
    md: "2",
    lg: "4",
  });

  // Use useBreakpointValue to set responsive width for TradingViewTechnicalAnalysis
  const analysisWidth = useBreakpointValue({
    base: "100%",
    sm: "80%",
    md: "60%",
    lg: "40%",
  });

  return (
    <Box
      p="4"
      bg="white"
      sx={{
        border: "1px solid purple.200",
        borderRadius: "lg",
        boxShadow: "md",
        mb: "4",
      }}
    >
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        align="center"
        justify="space-between"
      >
        <Input
          size="sm"
          type="text"
          placeholder="Give The name of stock"
          value={symbol}
          onChange={handleInputChange}
          mb={{ base: "2", sm: "0" }}
          width="100%"
          p={inputPadding}
          mr="2"
          focusBorderColor="purple.500"
        />
        <Button mb="2" size={buttonSize} onClick={handleShowAnalysis}>
          Show Analysis
        </Button>
      </Flex>
      <Box
        width={analysisWidth}
        mx="auto"
        borderWidth="3px"
        borderColor="purple.200"
      >
        <TradingViewTechnicalAnalysis
          colorTheme="light"
          autosize={false}
          symbol={displayedSymbol}
          width="100%"
          height="375"
        />
      </Box>
    </Box>
  );
}

export default TechnicalAnalysis;
