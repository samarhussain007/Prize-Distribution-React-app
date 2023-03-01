import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import PrizeDistribution from "./PrizeDistribution";
import PrizeDistribution2 from "./PrizeDistribution2";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { color } from "@mui/system";
import Home from "./home";

function App() {
  // const [input, setInput] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prize_distribution" element={<PrizeDistribution />} />
        <Route path="/prize_distribution2" element={<PrizeDistribution2 />} />
      </Routes>
    </div>
  );
}

export default App;
