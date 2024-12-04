import React from "react";
import { Box } from "@chakra-ui/layout";

function Progressbar({ completed, step }) {
  const containerStyles = {
    margin: "20px 0",
    height: 10,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    background: "primary.500",
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };
  const labelContainer = {
    display: "flex",
    justifyContent: "flex-end",
    padding: "2px",
  };

  return (
    <div style={containerStyles}>
      <Box
        style={fillerStyles}
        backgroundColor={"primary.500"}
        data-testid="filler"
      />
      <div style={labelContainer}>{step}/3 Completed</div>
    </div>
  );
}

export default Progressbar;
