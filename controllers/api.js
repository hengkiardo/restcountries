var _ = require('lodash');
var validator = require('validator');

var countries = require('../resources/countriesV1');

var notFound = function(res) {
  res.json(404, { "status": 404, "message": "Not Found" })
}

exports.index = function(req, res) {
  res.send({message : 'Welcome buddy!'});
};

exports.getAll = function(req, res) {
  res.json(200, countries)
}

exports.callingCode = function(req, res) {

  var calling_code = req.params.callingCode;

  var country = _.find(countries, function(co) {
    return validator.isIn(calling_code, co.callingCode)
  });

  if(!country) {
    notFound(res);
  }

  res.json(200, country)
}

exports.currency = function(req, res) {

  var currency_code = req.params.currency_code;

  var country = _.find(countries, function(co) {
    return validator.isIn(currency_code.toUpperCase(), co.currency)
  });

  if(!country) {
    notFound(res);
  }

  res.json(200, country)
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

  res.json(200, country_region);
}
