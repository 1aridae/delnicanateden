
var startDate = new Date('2024-09-02');
var today = Date.now();
var diff = today - startDate;
var diffcweeks = Math.ceil(diff / 1000 / 60 / 60 / 24 / 7);
var sdiffcweeks = (diffcweeks + "/" + "52");

var nlbr = 121.50*3;
var nlbrL = nlbr.toLocaleString("de-DE");

$("#portfelj > div > div > div:nth-child(1) > div > div.card-body > h1").text(sdiffcweeks);

$("#portfelj > div > div > div:nth-child(2) > div > div.card-body > h1").text(nlbrL + " €");

