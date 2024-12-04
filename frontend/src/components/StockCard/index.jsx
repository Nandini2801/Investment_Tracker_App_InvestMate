import React from "react";
import { Box } from "@chakra-ui/react";
import { SingleTicker } from "react-ts-tradingview-widgets";

function StockCard({ symbol }) {
  return (
    <Box borderWidth="4px" borderRadius="lg" p="4" borderColor="purple.200">
      <SingleTicker colorTheme="light" autosize="false" symbol={symbol} />
    </Box>
  );
}

export default StockCard;
