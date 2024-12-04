// src/components/Watchlist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Button, Container, Input, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, List, ListItem } from '@chakra-ui/react';

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const apiKey = 'CEMVEIWOWOADHC8F';

  useEffect(() => {
    if (searchSymbol === '') {
      // If the search symbol is empty, clear the stocks list
      setStocks([]);
      return;
    }

    // Make the API request when a symbol is entered
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${searchSymbol}&apikey=${apiKey}`)
      .then((response) => {
        const timeSeries = response.data['Time Series (Daily)'];
        // Extract the latest stock information
        const latestData = timeSeries[Object.keys(timeSeries)[0]];
        const stockInfo = {
          symbol: searchSymbol,
          price: parseFloat(latestData['4. close']),
        };
        setStocks([stockInfo]);
        openSearchDrawer();
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  }, [searchSymbol, apiKey]);

  const addToWatchlist = (stock) => {
    setWatchlist([...watchlist, stock]);
  };

  const openSearchDrawer = () => {
    setIsSearchDrawerOpen(true);
  };

  const closeSearchDrawer = () => {
    setIsSearchDrawerOpen(false);
  };

  return (
    <Container maxW="xl" centerContent>
      <Box mt={10}>
        <Heading size="lg" mb={4}>
          Stocks Watchlist
        </Heading>
        <Input
          type="text"
          placeholder="Enter stock symbol"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
          mb={4}
        />
        {stocks.map((stock) => (
          <Box
            key={stock.symbol}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            my={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Text fontWeight="bold">{stock.symbol}</Text>
              <Text>{stock.name}</Text>
            </Box>
            <Box>
              <Text>${stock.price.toFixed(2)}</Text>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => addToWatchlist(stock)}
              >
                Add to Watchlist
              </Button>
            </Box>
          </Box>
        ))}
        <Heading size="md" mt={4}>
          Watchlist
        </Heading>
        {watchlist.map((watchlistItem) => (
          <Box
            key={watchlistItem.symbol}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            my={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Text fontWeight="bold">{watchlistItem.symbol}</Text>
              <Text>{watchlistItem.name}</Text>
            </Box>
            <Box>
              <Text>${watchlistItem.price.toFixed(2)}</Text>
            </Box>
          </Box>
        ))}
      </Box>
      <Drawer placement="right" onClose={closeSearchDrawer} isOpen={isSearchDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Results</DrawerHeader>
          <DrawerBody>
            <List>
              {stocks.map((stock) => (
                <ListItem key={stock.symbol}>
                  {stock.symbol}: ${stock.price.toFixed(2)}
                </ListItem>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default Watchlist;
