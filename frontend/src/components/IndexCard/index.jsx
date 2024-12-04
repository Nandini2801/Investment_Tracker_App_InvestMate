import React from "react";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  StatDownArrow,
  StatUpArrow,
  Text,
} from "@chakra-ui/react";

function IndexCard({ index, currentPrice, change }) {
  const color = change > 0 ? "green.500" : "red.500";
  return (
    <Card width={{ base: "22%", xl: "24%" }} variant={"outline"}>
      <CardBody p={2}>
        <Flex flexDirection={"column"}>
          <Heading fontSize={"lg"} mb={2}>
            {index}
          </Heading>
          <Text>{currentPrice}</Text>
          <Text color={color}>
            {change > 0 ? <StatUpArrow /> : <StatDownArrow />}
            {change}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default IndexCard;
