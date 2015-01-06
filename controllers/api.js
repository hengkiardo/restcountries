var _ = require('lodash');
var validator = require('validator');

var countries = require('../resources/countriesV1');

var notFound = function(res) {
  res.json(404, {
    message: "Sorry, that page does not exist",
    code: 34
  })
}

exports.index = function(req, res) {
  res.send({message : 'Welcome buddy!'});
};

exports.getAll = function(req, res) {
  res.status(200).json(countries)
}

exports.callingCode = function(req, res) {

  var calling_code = req.params.callingCode;

  var country = _.find(countries, function(co) {
    return validator.isIn(calling_code, co.callingCode)
  });

  if(!country) {
    notFound(res);
  }

  res.status(200).json(country)
}

exports.currency = function(req, res) {

  var currency_code = req.params.currency_code;

  var country = _.find(countries, function(co) {
    return validator.isIn(currency_code.toUpperCase(), co.currency)
  });

  if(!country) {
    notFound(res);
  }

  res.status(200).json(country)
}

exports.region = function (req, res, next) {

  var result = [];
  var region_name = req.params.regionName;

  var country_region = _.reduce(countries, function(result, country, key) {

    if(country.region.toLowerCase() == region_name.toLowerCase()) {
      result.push(country);
    }
    return result;
  }, []);

  if(country_region.length < 1) {
    notFound(res);
  }

  res.status(200).json(country_region);
}

exports.subregion = function (req, res, next) {

  var result = [];
  var subregion_name = req.params.subregionName;

  var country = _.reduce(countries, function(result, country, key) {

    if(country.subregion.toLowerCase() == subregion_name.toLowerCase()) {
      result.push(country);
    }
    return result;
  }, []);

  if(country.length < 1) {
    notFound(res);
  }

  res.status(200).json(country);
}
