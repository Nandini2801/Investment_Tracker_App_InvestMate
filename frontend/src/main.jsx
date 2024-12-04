import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Box, CSSReset, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import customTheme from "./themes/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { InvestingTrackerChatbot } from "./pages";
import { Footer } from "./components";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider theme={customTheme}>
    <CSSReset />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <InvestingTrackerChatbot />
        <Box zIndex={1101} position={"sticky"}>
          <Footer />
        </Box>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
