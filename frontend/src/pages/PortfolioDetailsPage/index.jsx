import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PortfolioDetailsPage.module.css";
import { Box, Text } from "@chakra-ui/react";
import { LineChart, PageLoader, PieChart } from "../../components";
import { generateId } from "../../utils/functions";
import { dummy, marketdata } from "../../utils/Data/PottfolioPageData";
import { MiniChart, MarketData } from "react-ts-tradingview-widgets";
import Page500 from "../Page500";
import useUsers from "../../hooks/useUser";

function PortfolioDetailsPage() {
  const { id: portfolioId } = useParams();

  const { data, isError, isLoading, isSuccess } = useUsers(
    localStorage.getItem("userId")
  );

  if (isError) {
    return <Page500 />;
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />;
  }

  console.log(data.portfolios.filter((item) => item.id == portfolioId)[0]);

  const portfolio = data.portfolios.filter((item) => item.id == portfolioId)[0];

  const performance = (
    ((portfolio.currentPrice - portfolio.createdPrice) /
      portfolio.createdPrice) *
    100
  ).toFixed(2);

  const arr = [];
  const fill = [];

  portfolio.stocks.map((obj) => {
    const id = generateId();
    const newObj = {
      ...obj,
      value: obj.quantity,
      id:obj.stockName,
    };

    const fillObj = { match: { id: obj.stockName }, id: id };
    fill.push(fillObj);

    arr.push(newObj);

    return "";
  });

  return (
    <div className={styles.page_container}>
      <div className={styles.left}>
        <div className={styles.details_container}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Overview
          </Text>

          <div className={styles.pie}>
            <Box className={styles.graph_container}>
              <Text>Current value</Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {portfolio.currentPrice}
              </Text>

              <PieChart data={arr} fill={fill} />
            </Box>

            <Box width={"1px"} background={"gray.400"} />

            <Box className={styles.graph_container}>
              <Box>
                <Text
                  float={"right"}
                  color={performance < 0 ? "red.600" : "green.600"}
                  fontSize={{ base: "xl", lg: "2xl" }}
                  fontWeight={{ base: "medium", lg: "bold" }}
                >
                  {performance}%
                </Text>
                <Text>Created Value</Text>
              </Box>

              <Text fontWeight={"bold"} fontSize={"2xl"}>
                {portfolio.createdPrice}
              </Text>

              <PieChart data={arr} fill={fill} />
            </Box>
          </div>
        </div>
        <div className={styles.charts_container}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {portfolio.category} Portfolio
          </Text>

          <Box className={styles.linechart}>
            <LineChart data={dummy} />
          </Box>
        </div>
      </div>
      <div className={styles.left}>
        <MiniChart colorTheme="light" width="100%" symbol="NIFTY50"></MiniChart>
        <MarketData
          colorTheme="light"
          width="100%"
          height={400}
          symbolsGroups={marketdata}
        ></MarketData>
      </div>
    </div>
  );
}

export default PortfolioDetailsPage;
