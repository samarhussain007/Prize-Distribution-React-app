import React, { useState } from "react";
import seedrandom from "seedrandom";
import Graph from "./Graph";
import "./App.css";
import StyledForm from "./styles/styledForm";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTable = styled("table")(({ theme }) => ({
  border: "1px solid black",
  borderCollapse: "collapse",
  borderRadius: "50%",
  "& th": {
    border: "1px solid black",
    padding: "10px",
    backgroundColor: "#ff8100",
    color: "#000",
  },
  "& td": {
    border: "1px solid black",
    padding: "10px",
  },
}));

function PrizeDistribution2() {
  const [no_of_slots, setNoOfSlots] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [gdCommision, setGdCommision] = useState("");
  const [winnerPercentage, setWinnerPercentage] = useState("");
  const [tier, setTier] = useState("");
  const [initialWinners, setInitialWinners] = useState("");
  const [response, setResponse] = useState("");
  const [initialSlots, setInitialSlots] = useState("");
  const [lp, setLp] = useState("");
  const [alpha, setAlpha] = useState("");
  const [error, setError] = useState("");
  const [graphData, setGraphData] = useState();
  const resultArr = [];
  const dummyArr = [
    ["1", "70"],
    ["2", "30"],
    ["3", "20"],
    ["4-10", "15"],
    ["11-20", "10"],
    ["21-30", "5"],
  ];

  const dummyResponse = [75, 30, 20, 15, 15, 15, 15, 10, 10, 10, 10, 10, 5];

  const setSlots = function (ns) {
    if (!ns || ns < 0) return;

    const arr = Array(ns).fill(0);
    const mapedarray = arr.map((_, i) => {
      return (
        <div>
          <label>Slots no {i + 1} :</label>
          <input
            type="number"
            required
            value={initialWinners[i] || ""}
            onChange={(e) =>
              setInitialWinners((prevWinners) => {
                const newWinners = [...prevWinners];
                newWinners[i] = parseInt(e.target.value);
                return newWinners;
              })
            }
          />
        </div>
      );
    });

    return mapedarray;
  };
  const createTable = (response1) => {
    let arrNum;
    if (response === "") {
      arrNum = dummyResponse;
      console.log(arrNum);
    } else {
      arrNum = response;
    }

    // console.log(arrNum);
    return (
      <StyledTable border="1">
        <thead>
          <tr>
            <th colSpan={2}>DISTRIBUTED VALUE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Total Prize : {arrNum.reduce((a, b) => a + b, 0)}</th>
            <th>
              Excess amount:{" "}
              {Math.abs(
                arrNum.reduce((a, b) => a + b, 0) -
                  (no_of_slots * entryFee -
                    no_of_slots * entryFee * (gdCommision / 100))
              )}
            </th>
          </tr>
          <tr>
            <th>Player</th>
            <th>Prize</th>
          </tr>
          {response1.map((val, key) => {
            return (
              <tr>
                <td>{val[0]}</td>
                <td>{val[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    );
  };
  const createsets = (param) => {
    let remaining_players = param;

    let prizeBracket = {};
    let j = 0;

    for (let i = 0; i < remaining_players.length; i++) {
      let score = remaining_players[i];

      if (!prizeBracket[score]) {
        prizeBracket[score] = [];
      }
      prizeBracket[score].push(`Player ${i + 1}`);
    }
    for (let [score, players] of Object.entries(prizeBracket).reverse()) {
      let player_range =
        players[0].split(" ")[1] === players[players.length - 1].split(" ")[1]
          ? players[0].split(" ")[1]
          : `${players[0].split(" ")[1]}-${
              players[players.length - 1].split(" ")[1]
            }`;
      resultArr.push([player_range, score]);
    }

    return resultArr;

    // for(let j = prizeBracket[score].length)
  };
  createsets(response);

  function distributePrizePareto(prizepool, numPlayers, alpha, x_m, seed) {
    if (prizepool <= 0) {
      throw new Error("Prize pool must be greater than 0");
    }
    if (numPlayers <= 0) {
      throw new Error("Number of players must be greater than 0");
    }
    if (alpha <= 0) {
      throw new Error("Alpha must be greater than 0");
    }
    if (x_m <= 0) {
      throw new Error("x_m must be greater than 0");
    }

    let prizes = [];
    const rng = new seedrandom(seed);
    for (let i = 0; i < numPlayers; i++) {
      const prize = x_m * (1 - rng()) ** (-1 / alpha);
      prizes.push(prize);
    }

    // Normalize the prizes so that their total matches the prize pool
    const sum = prizes.reduce((acc, cur) => acc + cur, 0);
    prizes = prizes.map((prize) => prize * (prizepool / sum));

    // Sort the prizes in decreasing order
    // prizes.sort((a, b) => b - a);

    // Bucket the prizes to nice numbers

    // Ensure that the sum of the prizes equals the prize pool
    let difference = prizepool - prizes.reduce((acc, cur) => acc + cur, 0);
    while (difference !== 0) {
      for (let i = 0; i < numPlayers; i++) {
        prizes[i] += difference / numPlayers;
        difference = prizepool - prizes.reduce((acc, cur) => acc + cur, 0);
        if (difference === 0) break;
      }
    }

    const bucketSize = tier;
    prizes = prizes.map((prize) => Math.round(prize / bucketSize) * bucketSize);
    // Sort the prizes in decreasing order
    let excess = prizes.reduce((acc, cur) => acc + cur, 0) - prizepool;
    while (excess !== 0) {
      if (excess > 0) {
        for (let i = 0; i < numPlayers; i++) {
          if (prizes[i] > 0) {
            prizes[i] -= 1;
            excess -= 1;
            if (excess === 0) break;
          }
        }
      } else {
        for (let i = 0; i < numPlayers; i++) {
          prizes[i] += 1;
          excess += 1;
          if (excess === 0) break;
        }
      }
    }
    prizes.sort((a, b) => b - a);
    return initialWinners.concat(prizes);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const prizePool = no_of_slots * entryFee;
    const FinalPP = prizePool - prizePool * (gdCommision / 100);
    const finalPPafterinitial =
      FinalPP - initialWinners.reduce((a, b) => a + b, 0);

    let winners =
      Math.floor(no_of_slots * (winnerPercentage / 100)) -
      initialWinners.length;

    const result = distributePrizePareto(
      finalPPafterinitial,
      winners,
      alpha,
      lp,
      12345
    );
    setResponse(result);
    setGraphData(true);
  };
  return (
    <StyledForm>
      <header className="navbar">
        <h1>Prize Distribution TYPE-2 (Pareto Distribution)</h1>
      </header>
      <div className="main-wrapper">
        <div className="cta-section">
          <div className="PrizeDistribution-form">
            <form onSubmit={handleSubmit} className="form">
              <label>Number of slots:</label>
              <input
                type="number"
                value={no_of_slots}
                required
                onChange={(e) => setNoOfSlots(e.target.value)}
              />

              <label>Entry fee:</label>
              <input
                type="number"
                value={entryFee}
                required
                onChange={(e) => setEntryFee(e.target.value)}
              />
              <label>GD Commission:</label>
              <input
                type="number"
                value={gdCommision}
                required
                onChange={(e) => setGdCommision(e.target.value)}
              />
              <label>Winner percentage:</label>
              <input
                type="number"
                value={winnerPercentage}
                required
                onChange={(e) => setWinnerPercentage(e.target.value)}
              />

              <label>Tier:</label>
              <input
                type="number"
                value={tier}
                required
                onChange={(e) => setTier(e.target.value)}
              />

              <label>last Prize</label>
              <input
                type="number"
                value={lp}
                required
                onChange={(e) => setLp(Number(e.target.value))}
              />
              <label>alpha</label>
              <input
                type="number"
                value={alpha}
                required
                onChange={(e) => setAlpha(Number(e.target.value))}
              />
              <label>Initial Winners:</label>
              <input
                type="Number"
                value={initialSlots}
                required
                onChange={(e) => setInitialSlots(e.target.value)}
              />

              {setSlots(Number(initialSlots))}
              <Button variant="contained" color="primary" type="submit">
                Distribute Prize
              </Button>
            </form>
          </div>
        </div>
        <div className="response-container">
          <div className="response">
            {!response ? createTable(dummyArr) : createTable(resultArr)}
          </div>
          <div className="graph-representation">
            {!response ? (
              <Graph data={dummyResponse} />
            ) : (
              <Graph data={response} />
            )}
          </div>
        </div>
      </div>
    </StyledForm>
  );
}

export default PrizeDistribution2;
