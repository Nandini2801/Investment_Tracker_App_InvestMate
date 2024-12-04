import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Badge,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatDownArrow,
  StatUpArrow,
} from "@chakra-ui/react";

import styles from "./PortfolioCard.module.css";
import { Link } from "react-router-dom";
import PieChart from "../PieChart";
import { generateId } from "../../utils/functions";

const PortfolioCard = ({
  id,
  category,
  currentPrice,
  createdPrice,
  numHoldings,
  stocks,
  // topHoldings,
}) => {
  const arr = [];
  const fill = [];

  stocks.map((obj) => {
    const id = generateId();
    const newObj = {
      ...obj,
      value: obj.quantity,
      id: obj.stockName,
    };

    const fillObj = { match: { id: obj.stockName }, id: id };
    fill.push(fillObj);

    arr.push(newObj);

    return "";
  });

  const performance = (
    ((currentPrice - createdPrice) / createdPrice) *
    100
  ).toFixed(2);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="md"
      // maxW={{ base: "md", sm: "calc(50% - 16px)", md: "calc(33.33% - 16px)" }}
      width={"lg"}
      bg="white"
      mb="4"
    >
      <Heading
        as="h1"
        fontSize={"3xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        size="md"
        mb="2"
      >
        {category}
      </Heading>
      <Box bg={"gray.100"}>
        <Text textAlign={"center"}>Portfolio Value</Text>
        <Text fontSize={"2xl"} textAlign={"center"}>
          ${currentPrice}
        </Text>
      </Box>
      <StatGroup
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        gap={"10px"}
      >
        <Stat display={"flex"} flexWrap={"wrap"}>
          <StatLabel fontSize={"larger"}>Performance</StatLabel>
          <StatNumber>
            {performance > 0 ? <StatUpArrow /> : <StatDownArrow />}
            {performance}%
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel fontSize={"larger"}>Holdings</StatLabel>
          <StatNumber>{numHoldings}</StatNumber>
        </Stat>
      </StatGroup>

      <Box className={styles.graph_container}>
        <PieChart data={arr} fill={fill} />
      </Box>
      <Flex mt="2" justify="space-between" flexWrap={"wrap"} gap={"10px"}>
        <Badge colorScheme={performance > 0 ? "green" : "red"}>
          {performance > 0 ? "Low Risk" : "High Risk"}
        </Badge>
        {/* <Text>
          Last Updated:
          {lastUpdated}
        </Text> */}
      </Flex>
      <Flex mt="4" justify="center" flexWrap={"wrap"} gap={"1rem"}>
        <Link
          to={`/portfolios/${category
            .toLowerCase()
            .split(" ")
            .join("-")}/${id}`}
        >
          <Button size="sm">View Analytics</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default PortfolioCard;
