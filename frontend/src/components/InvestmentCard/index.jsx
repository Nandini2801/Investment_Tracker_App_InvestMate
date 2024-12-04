import React from "react";
import { Card, CardBody, Flex } from "@chakra-ui/react";
import IndexCard from "../IndexCard";

function InvestmentCard() {
  return (
    <Card width={"74%"}>
      <CardBody>
        <Flex>
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
          <IndexCard index={"Nifty"} currentPrice={20000} change={32} />
        </Flex>
      </CardBody>
    </Card>
  );
}

export default InvestmentCard;
