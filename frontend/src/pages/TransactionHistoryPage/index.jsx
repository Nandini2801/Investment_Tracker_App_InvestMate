import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  TableContainer,
  Button,
  Text,
} from "@chakra-ui/react";
import Page500 from "../Page500";
import { PageLoader } from "../../components";
import useUsers from "../../hooks/useUser";
import usePrices from "../../hooks/usePrices";

export default function TransactionHistory() {
  const { data, isError, isLoading, isSuccess } = useUsers(
    localStorage.getItem("userId")
  );
  const { data: priceData } = usePrices();

  if (isError) {
    return <Page500 />;
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />;
  }

  console.log(data);
  console.log(data.portfolios);
  console.log(priceData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {data.portfolios.length === 0 ? (
        <Heading>No Transactions to Show</Heading>
      ) : (
        <>
          <Heading mb={"2rem"}>Transaction History</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    ID
                  </Th>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    Name
                  </Th>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    Type
                  </Th>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    Price
                  </Th>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    Quantity
                  </Th>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    Amount
                  </Th>
                  <Th
                    bg="primary.500"
                    color="white"
                    border="1px solid #ccc"
                    p={4}
                    textAlign="left"
                  >
                    Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.portfolios.map((portfolio) =>
                  portfolio.transactions.length > 0 ? (
                    portfolio.transactions.map((transaction, index) =>
                      priceData.filter(
                        (price) => price.stockId === transaction.stockId
                      ).length === 0 ? (
                        <Heading key={transaction.id}>
                          No Transactions to Show
                        </Heading>
                      ) : (
                        <Tr key={transaction.id}>
                          <Td>{index + 1}</Td>
                          <Td>{transaction.stockName}</Td>
                          <Td>{transaction.action === "S" ? "SELL" : "BUY"}</Td>
                          <Td>
                            {priceData
                              .filter(
                                (price) => price.stockId === transaction.stockId
                              )[0]
                              .closePrice.toFixed(2)}
                          </Td>
                          <Td>{transaction.quantity}</Td>
                          <Td>
                            {priceData
                              .filter(
                                (price) => price.stockId === transaction.stockId
                              )[0]
                              .closePrice.toFixed(2) * transaction.quantity}
                          </Td>
                          <Td>{transaction.date}</Td>
                        </Tr>
                      )
                    )
                  ) : (
                    <Text key={portfolio.id}>
                      No Transactions to Show for portfolio {portfolio.category}
                    </Text>
                  )
                )}
              </Tbody>
              ̦
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
            }}
          >
            <Button
              mt="2rem"
              color="white"
              backgroundColor="primary.500"
              size="md"
              onClick={handlePrint}
            >
              Print Page
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
