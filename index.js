var startDate = new Date("2024-09-02");
var today = Date.now();

var nlbr = 137.0;
var krka = 168.0;
var tlsg = 88.5;

function trenutniTeden() {
  var diff = today - startDate;
  var diffcweeks = Math.ceil(diff / 1000 / 60 / 60 / 24 / 7);
  var sdiffcweeks = diffcweeks + "/" + "52";

  $("#portfelj > div > div > div:nth-child(1) > div > div.card-body > h1").text(
    sdiffcweeks
  );
}

function vrednostPortfelja() {
  var vrednost = 10 * nlbr + 12 * krka + 5 * tlsg;
  var vrednostText = vrednost.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  $("#portfelj > div > div > div:nth-child(2) > div > div.card-body > h1").text(
    vrednostText + " €"
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

const stocks = [
  {
    name: "NLB",
    startingPrice: 123.05,
    endingPrice: nlbr,
    shares: 10,
    costs: 12.3,
    dividends: 0,
  },
  {
    name: "KRKA",
    startingPrice: 141.08,
    endingPrice: krka,
    shares: 12,
    costs: 17.10,
    dividends: 0,
  },
  {
    name: "TLSG",
    startingPrice: 89.9,
    endingPrice: tlsg,
    shares: 5,
    costs: 5,
    dividends: 0,
  },
];

trenutniTeden();
naslednjiNakup();
vrednostPortfelja();
calculatePortfolio(stocks);


$("#rast-portfelja")
  .text(calculatePortfolio(stocks).toString().replace(".", ",") + " %")
  .css("color", parseFloat(calculatePortfolio(stocks)) > 0 ? "green" : "red");
