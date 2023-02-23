class PrizeDistributor {
  constructor(
    no_of_slots,
    entryFee,
    gdCommision,
    winnerPercentage,
    tier,
    initialWinners,
    lp
  ) {
    this.no_of_slots = no_of_slots;
    this.entryFee = entryFee;
    this.gdCommision = gdCommision;
    this.winnerPercentage = winnerPercentage;
    this.tier = tier;
    this.initialWinners = initialWinners;
    this.last_prize = lp;
  }

  distribute() {
    if (this.no_of_slots < this.initialWinners.length) {
      throw new Error(
        "Error: Number of slots must be greater than the number of initial winners.🔥"
      );
    }
    if (this.gdCommision < 0 || this.gdCommision > 100) {
      throw new Error(
        "Error: Commission percentage must be between 0 and 100.😒"
      );
    }
    if (this.winnerPercentage < 0 || this.winnerPercentage > 100) {
      throw new Error("Error: Winner percentage must be between 0 and 100.");
    }

    let prizePool = this.no_of_slots * this.entryFee;
    let finalPP = prizePool - prizePool * (this.gdCommision / 100);

    let initialWinnerSum = this.initialWinners.reduce((a, b) => a + b, 0);
    if (initialWinnerSum > finalPP) {
      throw new Error(
        "Error: Initial winners' prizes exceed final prize pool."
      );
    }

    let winners = Math.floor(this.no_of_slots * (this.winnerPercentage / 100));
    let remainingWinners = winners - this.initialWinners.length;

    if (remainingWinners <= 0) {
      throw new Error("Error: Not enough remaining winners.");
    }

    let finalPPafterinitial = finalPP - initialWinnerSum;
    let last_prize = this.last_prize;
    let first_prize = (2 * finalPPafterinitial) / remainingWinners - last_prize;
    let ratio = (first_prize - last_prize) / (remainingWinners - 1);

    if (last_prize >= first_prize) {
      throw new Error(
        `Error: Last prize must be less than first prize. Which is ${Math.floor(
          first_prize
        )}`
      );
    }
    
    let prize = Array.from(
      Array(remainingWinners),
      (_, i) => first_prize - i * ratio
    );

    if (this.tier > remainingWinners) {
      throw new Error(
        "Error: Tier value must be less than or equal to remaining winners."
      );
    }

    let finalArr = [];
    let avgarr = [];
    let tierBranch = Math.floor(remainingWinners / this.tier);

    for (var i = 0; i < remainingWinners; i += tierBranch) {
      var set = prize.slice(i, i + tierBranch);
      finalArr.push(set);
    }
    // console.log(finalArr);

    finalArr.forEach((subArr) => {
      const average = Math.floor(
        subArr.reduce((a, b) => a + b, 0) / subArr.length
      );
      avgarr.push(average);
      subArr.fill(average);
    });

    finalArr = [].concat(...finalArr);
    this.finalWinners = this.initialWinners.concat(finalArr);
    console.log(this.finalWinners);
    return this.finalWinners;
  }

  // exportToExcel() {
  //   if (!this.finalWinners) {
  //     return;
  //   }
  //   let workbook = new Excel.Workbook();
  //   let worksheet = workbook.addWorksheet("Prize Distribution1");

  //   worksheet.columns = [
  //     { header: "Name", key: "name", width: 15 },
  //     { header: "Prize", key: "prize", width: 15 },
  //   ];
  //   let currentRow = 1;
  //   let currentPrize = this.finalWinners[0];
  //   for (let i = 0; i < this.finalWinners.length; i++) {
  //     if (this.finalWinners[i] !== currentPrize) {
  //       currentRow++;
  //       currentPrize = this.finalWinners[i];
  //     }
  //     let row = worksheet.addRow({
  //       name: `Winner ${i + 1}`,
  //       prize: currentPrize,
  //     });
  //     row.outlineLevel = 1; // set the outline level to group the rows
  //   }
  //   worksheet.addRow({
  //     name: "Total",
  //     prize: this.finalWinners.reduce((a, b) => a + b, 0),
  //   });

  //   return workbook.xlsx.writeFile("PrizeDistribution1.xlsx");
  // }
}

module.exports = PrizeDistributor;
