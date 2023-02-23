const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const PrizeDistributor = require("./prizedistributor");

app.use(bodyParser.json());
app.use(cors());

app.post("/", (req, res, next) => {
  try {
    const prizeDistributor = new PrizeDistributor(
      req.body.no_of_slots,
      req.body.entryFee,
      req.body.gdCommision,
      req.body.winnerPercentage,
      req.body.tier,
      req.body.initialWinners,
      req.body.lp
    );

    // Call distribute method and send result as response
    res.json({
      result: prizeDistributor.distribute(),
    });
  } catch (err) {
    // console.log(err.json());
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening,${port}`);
});

// const Excel = require("exceljs");

// let distributor = new PrizeDistributor(100, 10, 15, 50, 5, [75, 45, 30]);
// distributor.distribute();
// distributor.exportToExcel();
