var startDate = new Date("2024-09-02");

function trenutniTeden() {
  var today = Date.now();
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

function calculateSimplePortfolioReturn(stocks) {
  const totalStarting = stocks.reduce(
    (sum, stock) => sum + stock.startingPrice * stock.shares,
    0
  );
  const totalEnding = stocks.reduce(
    (sum, stock) => sum + stock.endingPrice * stock.shares - stock.costs,
    0
  );

  return ((totalEnding / totalStarting) - 1) * 100;
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

  stocks.forEach((stock) => {
    const startingValue = stock.startingPrice * stock.shares;
    totalStartingValue += startingValue;
  });

  const totalYield = ((portfolioValue + totalDividends) / totalStartingValue - 1) * 100;
  return totalYield;
}

const stocks = [
  {
    name: "NLB",
    startingPrice: 123.05,
    endingPrice: 157.5,
    shares: 10,
    costs: 12.3,
    dividends: 41.3 + 48.2, //neto dividende
  },
  {
    name: "KRKA",
    startingPrice: 141.08,
    endingPrice: 199.0,
    shares: 12,
    costs: 17.1,
    dividends: 0,
  },
  {
    name: "TLSG",
    startingPrice: 89.88,
    endingPrice: 93.0,
    shares: 8,
    costs: 8,
    dividends: 0,
  },
  {
    name: "PETG",
    startingPrice: 44.42,
    endingPrice: 50.4,
    shares: 12,
    costs: 5.4,
    dividends: 0,
  },
  {
    name: "CICG",
    startingPrice: 34.54,
    endingPrice: 32.0,
    shares: 5,
    costs: 1.8,
    dividends: 1.4,
  }
];

trenutniTeden();
naslednjiNakup();
vrednostPortfelja();
calculateTotalDividends(stocks);

const simpleReturn = calculateSimplePortfolioReturn(stocks);
const yieldWithDividends = totalYield(stocks);

$("#rast-portfelja")
  .text(simpleReturn.toFixed(2).toString().replace(".", ",") + " %")
  .css("color", simpleReturn > 0 ? "green" : "red");

$("#totalYield")
  .text(yieldWithDividends.toFixed(2).toString().replace(".", ",") + " %")
  .css("color", yieldWithDividends > 0 ? "green" : "red");
