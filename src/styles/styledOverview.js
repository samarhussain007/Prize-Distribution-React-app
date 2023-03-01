import React from "react";
import { styled } from "@mui/material";

const StyledOverview = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "20px",
  alignItems: "center",
  height: "500px",
  width: "500px",
  gap: "20px",
  backgroundColor: "#222",
  borderRadius: "10px",
  color: "#ff8100",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "50px auto",

  "& Button": {
    backgroundColor: "#ff8100",
    color: "black",
    width: "200px",
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

export default StyledOverview;
