import React from "react";
import { Box, Heading, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { SideChart, StockCard, TechAnalysis } from "../../components";
import { StockMarket } from "react-ts-tradingview-widgets";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";

function StockInfoPage() {
  const symbols = [
    "NASDAQ:AAPL",
    "NASDAQ:GOOGL",
    "FX:EURUSD",
    "NASDAQ:META",
    "NASDAQ:AMZN",
    "NYSE:BABA",
  ];

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  // Set the height for the SideChart based on screen size
  const sideChartHeight = useBreakpointValue({
    base: "300px",
    sm: "450px",
    md: "610px",
  });

  const boxStyle = {
    backgroundColor: "white",
    padding: "4",
    borderRadius: "lg",
    boxShadow: "md",
    mb: "4",
    borderColor: "purple.200",
    borderWidth: "5px",
  };

  return (
    <div>
      <Box bg="white" p="4">
        <Heading as="h1" size="xl" mb="4" textAlign="center">
          Stock Info Page
        </Heading>
        <Box sx={{ ...boxStyle, h: sideChartHeight }}>
          <SideChart />
        </Box>

        <Heading as="h2" size="lg" mb="4">
          Global Stocks
        </Heading>

        <SimpleGrid columns={columns} spacing={4}>
          {symbols.map((symbol, index) => (
            <StockCard key={index} symbol={symbol} />
          ))}
        </SimpleGrid>
        <Heading as="h2" size="lg" mb="4" mt="4">
          Indian Stocks
        </Heading>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Stock Technical Analysis</Tab>
            <Tab>Daily Market Movers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TechAnalysis></TechAnalysis>
            </TabPanel>
            <TabPanel>
              <StockMarket
                colorTheme="light"
                height={500}
                width="100%"
                exchange="BSE"
              ></StockMarket>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default StockInfoPage;
