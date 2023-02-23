import React, { useState } from "react";
import Graph from "./Graph";
import Graph1 from "./Graph1";

function PrizeDistribution() {
  const [no_of_slots, setNoOfSlots] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [gdCommision, setGdCommision] = useState("");
  const [winnerPercentage, setWinnerPercentage] = useState("");
  const [tier, setTier] = useState("");
  const [initialWinners, setInitialWinners] = useState("");
  const [response, setResponse] = useState("");
  const [initialSlots, setInitialSlots] = useState("");
  const [lp, setLp] = useState("");
  const [error, setError] = useState("");
  const [graphData, setGraphData] = useState();
  var resultArr = [];

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
  const createsets = (param) => {
    let remaining_players = param;

    let prizeBracket = {};

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
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // reset the error message
    setInitialWinners([]);

    const data = {
      no_of_slots,
      entryFee,
      gdCommision,
      winnerPercentage,
      tier,
      initialWinners,
      lp,
    };
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        createsets(data);
        setResponse(data.result);
      })
      .catch((error) => {
        error.json().then((data) => {
          if (error.status === 500) {
            setError(data.error);
          } else {
            setError(data);
          }
        });
      });
    setGraphData(true);
  };

  const createTable = (response1) => {
    // console.log(response.reduce((a, b) => a + b, 0));
    return (
      <table border="1">
        <tr>
          <th colSpan={2}>DISTRIBUTED VALUE</th>
        </tr>
        <tr>
          <th>Total Prize : {response.reduce((a, b) => a + b, 0)}</th>
          <th>
            Excess amount:{" "}
            {Math.abs(
              response.reduce((a, b) => a + b, 0) -
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
      </table>
    );
  };
  console.log(response);
  return (
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
        <label>Initial Winners:</label>
        <input
          type="Number"
          value={initialSlots}
          required
          onChange={(e) => setInitialSlots(e.target.value)}
        />
        {setSlots(Number(initialSlots))}
        <button type="submit">Distribute Prizes</button>
      </form>

      {error && <div className="error">{error}</div>}
      <div className="response">{!response ? "" : createTable(resultArr)}</div>

      {response && (
        <div className="graph-representation">
          {no_of_slots < 500 && graphData ? (
            <Graph1 data={response} />
          ) : (
            <Graph data={response} />
          )}
        </div>
      )}
    </div>
  );
}

export default PrizeDistribution;
