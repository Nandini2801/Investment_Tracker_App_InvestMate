import React from "react";
import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Heading,
  TableContainer,
} from "@chakra-ui/react";
import useStocks from "../../hooks/useStocks";
import Page500 from "../Page500";
import { PageLoader } from "../../components";

export default function LiveStockData() {
  // const [index, setIndex] = useState();
  const { data, isError, isLoading, isSuccess } = useStocks();
  const [sortParam, setSortParam] = useState();
  const [sortedDataByParams, setSortedDataByParams] = useState();

  if (isError) {
    return <Page500 />;
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />;
  }

  const handleSortChange = (event) => {
    setSortParam(event.target.value);
    sortStockData(event.target.value);
  };

  const sortStockData = (param) => {
    const sortedData = [...data];
    if (param === "ascending") {
      sortedData.sort((a, b) => a.open - b.open);
    } else if (param === "descending") {
      sortedData.sort((a, b) => b.open - a.open);
    } else if (param === "ascending-volume") {
      sortedData.sort((a, b) => a.totalTradedVolume - b.totalTradedVolume);
    } else if (param === "descending-volume") {
      sortedData.sort((a, b) => b.totalTradedVolume - a.totalTradedVolume);
    }
    setSortedDataByParams(sortedData);
  };

  const dataToDisplay = sortedDataByParams ? sortedDataByParams : data;

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={8}
        alignItems="center"
        pb={4}
      >
        <Heading>
          Live Stock Data
          {/* ({stockData.find((stock) => stock.symbol === "NIFTY 50")?.open}) */}
          {/* <Select onChange={handleIndexChange} variant={"outline"}>
            {isSuccess &&
              symbolsData
                .filter((item) => item.symbol.includes("NIFTY"))
                .map((item) => (
                  <option value={item.symbol} key={item.symbol}>
                    {item.symbol}
                  </option>
                ))}
          </Select> */}
        </Heading>
        <Select
          value={sortParam}
          onChange={handleSortChange}
          variant={"outline"}
          borderColor="primary.500"
        >
          <option>Select</option>
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
          <option value="ascending-volume">Ascending - Volume</option>
          <option value="descending-volume">Descending - Volume</option>
        </Select>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead bg="primary.500">
            <Tr>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                Symbol
              </Th>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                Open
              </Th>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                High
              </Th>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                Low
              </Th>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                Last Price
              </Th>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                Volume
              </Th>
              <Th color="white" border="1px solid #ccc" p={4} textAlign="left">
                Last Update Time
              </Th>
            </Tr>
          </Thead>
          <Tbody bg="primary.50">
            {isSuccess &&
              dataToDisplay
                .filter((stock) => !stock.symbol.includes("NIFTY"))
                .map((stock, index) => (
                  <Tr border="1px solid #ccc" key={index}>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.symbol}
                    </Td>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.open}
                    </Td>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.dayHigh}
                    </Td>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.dayLow}
                    </Td>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.lastPrice}
                    </Td>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.totalTradedVolume}
                    </Td>
                    <Td border="1px solid #ccc" p={4}>
                      {stock.lastUpdateTime}
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
