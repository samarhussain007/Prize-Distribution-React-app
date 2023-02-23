import React from "react";
import { styled } from "@mui/material";

const StyledButtonDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "20px",
  alignItems: "center",
  height: "500px",
  gap: "20px",
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: "10px",
  color: "#ff8100",

  "& Button": {
    backgroundColor: "#ff8100",
    color: "black",
  },

  "& Button:hover": {
    backgroundColor: "#000",
    color: "white",
  },

  "& .Button-container": {
    display: "flex",
    gap: "20px",
  },
  "& .Button-container > a": {
    textDecoration: "none",
  },
}));

export default StyledButtonDiv;
