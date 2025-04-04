var startDate = new Date("2024-09-02");
var today = Date.now();

function trenutniTeden() {
  var diff = today - startDate;
  var diffcweeks = Math.ceil(diff / 1000 / 60 / 60 / 24 / 7);
  var sdiffcweeks = diffcweeks + "/" + "52";

  $("#portfelj > div > div > div:nth-child(1) > div > div.card-body > h1").text(
    sdiffcweeks
  );
}

function naslednjiNakup() {
  var naslnakup = new Date();
  naslnakup.setDate(naslnakup.getDate() + ((1 + 7 - naslnakup.getDay()) % 7));
  var naslnakupText = naslnakup.toLocaleDateString("de-DE");

  $("#portfelj > div > div > div:nth-child(4) > div > div.card-body > h1").text(
    naslnakupText
  );
}

function vrednostPortfelja() {
  var vrednost = stocks.reduce(
    (total, stock) => total + stock.endingPrice * stock.shares,
    0
  );

  var vrednostText = vrednost.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  $("#portfelj > div > div > div:nth-child(2) > div > div.card-body > h1").text(
    vrednostText + " €"
  );
}

function calculatePortfolio(stocks) {
  let totalStartingValue = 0;
  let totalWeightedContribution = 0;

  stocks.forEach((stock) => {
    const startingValue = stock.startingPrice * stock.shares;
    const endingValue = stock.endingPrice * stock.shares;
    const endingValueMinusCosts = endingValue - stock.costs;

    const individualReturn = (
      endingValueMinusCosts / startingValue -
      1
    ).toFixed(4);

    totalStartingValue += startingValue;
    stock.startingValue = startingValue;
    stock.endingValue = endingValue;
    stock.endingValueMinusCosts = endingValueMinusCosts;
    stock.individualReturn = parseFloat(individualReturn);
  });

  stocks.forEach((stock) => {
    stock.weight = (stock.startingValue / totalStartingValue).toFixed(4);
    stock.weightedContribution = (
      stock.weight * stock.individualReturn
    ).toFixed(4);

    totalWeightedContribution += parseFloat(stock.weightedContribution);
  });

  const totalReturn = (totalWeightedContribution * 100).toFixed(2);
  return totalReturn;
}

function calculateTotalDividends(stocks) {
  var totalDividends = 0;

  stocks.forEach((stock) => {
    totalDividends += stock.dividends;
  });

  var dividende = totalDividends.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  $("#portfelj > div > div > div:nth-child(6) > div > div.card-body > h1").text(
    dividende + " €"
  );
}

function totalYield(stocks) {
  const portfolioValue = stocks.reduce(
    (total, stock) => total + stock.endingPrice * stock.shares,
    0
  );

  const totalDividends = stocks.reduce(
    (totalDividends, stock) => totalDividends + stock.dividends,
    0
  );

  let totalStartingValue = 0;
  let totalWeightedContribution = 0;

  stocks.forEach((stock) => {
    const startingValue = stock.startingPrice * stock.shares;
    const endingValue = stock.endingPrice * stock.shares;
    const endingValueMinusCosts = endingValue - stock.costs;

    const individualReturn = (
      endingValueMinusCosts / startingValue -
      1
    ).toFixed(4);

    totalStartingValue += startingValue;
    stock.startingValue = startingValue;
    stock.endingValue = endingValue;
    stock.endingValueMinusCosts = endingValueMinusCosts;
    stock.individualReturn = parseFloat(individualReturn);
  });

  stocks.forEach((stock) => {
    stock.weight = (stock.startingValue / totalStartingValue).toFixed(4);
    stock.weightedContribution = (
      stock.weight * stock.individualReturn
    ).toFixed(4);
    totalWeightedContribution += parseFloat(stock.weightedContribution);
  });

  const totalYield = (
    ((portfolioValue + totalDividends) / totalStartingValue - 1) *
    100
  ).toFixed(2);

  return totalYield;
}

const stocks = [
  {
    name: "NLB",
    startingPrice: 123.05,
    endingPrice: 129.5,
    shares: 10,
    costs: 12.3,
    dividends: 41.25,
  },
  {
    name: "KRKA",
    startingPrice: 141.08,
    endingPrice: 166.00,
    shares: 12,
    costs: 17.1,
    dividends: 0,
  },
  {
    name: "TLSG",
    startingPrice: 89.88,
    endingPrice: 89.50,
    shares: 8,
    costs: 8,
    dividends: 0,
  },
  {
    name: "PETG",
    startingPrice: 43.00,
    endingPrice: 41.0,
    shares: 1,
    costs: 0.5,
    dividends: 0,
  },
];

trenutniTeden();
naslednjiNakup();
vrednostPortfelja();
calculateTotalDividends(stocks);
calculatePortfolio(stocks);
totalYield(stocks);

$("#rast-portfelja")
  .text(calculatePortfolio(stocks).toString().replace(".", ",") + " %")
  .css("color", parseFloat(calculatePortfolio(stocks)) > 0 ? "green" : "red");

$("#totalYield")
  .text(totalYield(stocks).toString().replace(".", ",") + " %")
  .css("color", parseFloat(totalYield(stocks)) > 0 ? "green" : "red");
