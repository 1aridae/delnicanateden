var startDate = new Date("2024-09-02");
var today = Date.now();

var nlbr = 126.0;

function trenutniTeden() {
  var diff = today - startDate;
  var diffcweeks = Math.ceil(diff / 1000 / 60 / 60 / 24 / 7);
  var sdiffcweeks = diffcweeks + "/" + "52";
  
  $("#portfelj > div > div > div:nth-child(1) > div > div.card-body > h1").text(
    sdiffcweeks
  );
}

function vrednostPortfelja() {
  var vrednost = 9 * nlbr;
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

trenutniTeden();
vrednostPortfelja();
naslednjiNakup();
