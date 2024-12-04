import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import IndexCard from "../../components/IndexCard";
import InvestmentCard from "../../components/InvestmentCard";
import DashboardWatchlistCard from "../../components/DashboardWatchlistCard";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

function DashboardPage() {
  return (
    <Flex direction={"column"} gap={5}>
      <Flex direction={"column"}>
        <Heading fontSize={"2xl"} mb={2}>
          Indexes
        </Heading>
        <Flex
          flexWrap={"wrap"}
          gap={3}
          justifyContent={{ base: "start", sm: "center" }}
        >
          <IndexCard index={"Nifty"} currentPrice={20000} change={-32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
        </Flex>
      </Flex>

      <AdvancedRealTimeChart
        symbol="SENSEX"
        height={"500vh"}
        width={"full"}
      ></AdvancedRealTimeChart>
      {/* <Flex gap={3} justifyContent={"center"} height={"50vh"}> */}
      {/* <InvestmentCard /> */}
      {/* <DashboardWatchlistCard /> */}

      {/* <Flex>Watchlist</Flex> */}
      {/* </Flex> */}

      <Flex direction={"column"}>
        <Heading fontSize={"2xl"} mb={2}>
          Top Stocks
        </Heading>
        <Flex flexWrap={"wrap"} gap={3} justifyContent={"center"}>
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DashboardPage;
