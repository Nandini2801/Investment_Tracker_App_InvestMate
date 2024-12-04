import React from "react";
import { Navigate } from "react-router-dom";
import { PageLoader, PortfolioCard } from "../../components";
import useUsers from "../../hooks/useUser";
import Page500 from "../Page500";
import styles from "./PortfolioPage.module.css";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import React from "react";

function PortfolioPage() {
  const { data, isError, isLoading, isSuccess } = useUsers(
    localStorage.getItem("userId")
  );

  const navigate = useNavigate();

  if (isError) {
    return <Page500 />;
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />;
  }

  return (
    <div className={styles.page_container}>
      {data.portfolios.length === 0 ? (
        <Flex direction={"column"} gap={20}>
          <Heading>You do not have any portfolio yet. Create one now!</Heading>
          <Button
            onClick={() => {
              navigate("/portfolios/create");
            }}
          >
            + Add Portfolio
          </Button>
        </Flex>
      ) : (
        data.portfolios.map(
          (portfolio) =>
            portfolio.stocks.length > 0 && (
              <PortfolioCard
                key={portfolio.id}
                id={portfolio.id}
                category={portfolio.category}
                currentPrice={portfolio.currentPrice}
                createdPrice={portfolio.createdPrice}
                numHoldings={portfolio.stocks.length}
                stocks={portfolio.stocks}
              />
            )
        )
      )}
    </div>
  );
}

export default PortfolioPage;
