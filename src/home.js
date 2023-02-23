import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import StyledButtonDiv from "./styles/styledOverview";

function Home() {
  return (
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
  );
}

export default Home;
