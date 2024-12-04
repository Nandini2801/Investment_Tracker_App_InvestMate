import React from "react";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Text,
  Heading,
} from "@chakra-ui/react";
import useCustomStocks from "../../hooks/useCustomStocks";
import { Page500 } from "../../pages";
import PageLoader from "../PageLoader";

function WatchlistDisplay({ selectedWatchlist }) {
  const { name, watchlistStocks } = selectedWatchlist;
  const header = ["symbol", "name"];
  const { data, isSuccess, isError, isLoading } = useCustomStocks();
  if (isError) {
    return <Page500 />;
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />;
  }

  if (watchlistStocks.length === 0) return <Heading>No stocks in watchlist</Heading>;

  const requiredStocks = data.filter((item) => {
    return watchlistStocks.some((stock) => stock.stockId === item.id);
  });

  console.log(requiredStocks);

  return (
    <div>
      {requiredStocks.length > 0 ? (
        <Flex
          w="full"
          bg="primary.50"
          _dark={{ bg: "secondary.50" }}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Text
            fontSize={{ base: "1xl", sm: "2xl" }}
            fontWeight="extrabold"
            lineHeight="shorter"
            color="primary.600"
            _dark={{ color: "gray.100" }}
            // mb={6}
          >
            {name}
          </Text>

          <TableContainer w="full">
            <Table
              bg="primary.100"
              _dark={{ bg: "gray.800" }}
              display={{
                base: "block",
                md: "table",
              }}
              sx={{
                "@media print": {
                  display: "table",
                },
              }}
            >
              <Thead
                display={{
                  base: "none",
                  md: "table-header-group",
                }}
                sx={{
                  "@media print": {
                    display: "table-header-group",
                  },
                }}
              >
                <Tr>
                  {header.map((x) => (
                    <Th bg="primary.500" color="white" key={x}>
                      {x}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody
                display={{
                  base: "block",
                  lg: "table-row-group",
                }}
                sx={{
                  "@media print": {
                    display: "table-row-group",
                  },
                }}
              >
                {requiredStocks.map((stock, index) => (
                  <Tr
                    key={index}
                    display={{
                      base: "grid",
                      md: "table-row",
                    }}
                    sx={{
                      "@media print": {
                        display: "table-row",
                      },
                      gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                      gridGap: "10px",
                    }}
                  >
                    <Td>{stock.symbol}</Td>
                    <Td>{stock.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      ) : (
        <Text>No stocks in watchlist</Text>
      )}
    </div>
  );
}

export default WatchlistDisplay;
