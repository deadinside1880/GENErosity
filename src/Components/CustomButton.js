import { Button } from "@mui/material";
import React from "react";

function CustomButton({ setPage, color = "#FFFFFF", text = "" }) {
  var textColor = "white";
  if (color === "white" || color === "#FFFFFF") {
    textColor = "black";
  }
  return (
    <Button
      onClick={() => setPage(1)}
      variant="contained"
      style={{
        backgroundColor: color,
        borderRadius: 1000,
        color: textColor,
      }}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
