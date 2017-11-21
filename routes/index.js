var express = require('express');
var router = express.Router();
var exchangeRates = require("../model/currencyDB");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET convert page */
router.get("/convert", function(req, res, next){

  var amount = req.query.amount; // What amount of fromCurrency to toCurrency
  var fromCurrency = req.query.from_currency; // From what currency?
  var toCurrency = req.query.to_currency; // To what currency?

  // Math for Conversion - Uses euros for base conversion
  // convert fromCurrency to euros by dividing amount by exchangeRates[fromCurrency]
  // multiply the product by exchangeRates[toCurrency]
  var x = amount / exchangeRates[fromCurrency];
  var converted = exchangeRates[toCurrency] * x;

  // Rounds conversion up to 2 decimal places
  converted = Math.ceil(converted*100)/100;

  // Response page with the conversion data
  res.render("results", {
    amount: amount,
    toCurrency: toCurrency,
    fromCurrency: fromCurrency,
    converted: converted}
  );

});

/* GET about page */
router.get("/about", function(req, res, next){
  res.render("about", { name: "Justin Johnson", description: "A simple currency converter site built using node.js, and express"});

});

module.exports = router;
