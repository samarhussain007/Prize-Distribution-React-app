import React from "react";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const StyledButtonDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "20px",
  alignItems: "center",
  height: "500px",
  gap: "20px",
  background: "rgba(30, 30, 30, 0.5)",
  backdropFilter: "blur(10px)",
  borderRadius: "10px",
  color: "#ff8100",

  "& .Button-container": {
    display: "flex",
    gap: "20px",
  },

  "& Button": {
    backgroundColor: "#ff8100",
    color: "#000",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  "& .Button-container > a": {
    textDecoration: "none",
  },
}));

function Home() {
  return (
    <div>
      <StyledButtonDiv>
        <h1>Select One Method For Distribution</h1>
        <div className="Button-container">
          <Link to="/prize_distribution">
            <Button variant="contained">Prize Distribution TYPE-1</Button>
          </Link>
          <Link to="/prize_distribution2">
            <Button variant="contained">Prize Distribution TYPE-2</Button>
          </Link>
        </div>
      </StyledButtonDiv>
    </div>
  );
}

export default Home;
