var _ = require('lodash');
var validator = require('validator');

var countries = require('../resources/countriesV1');

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

  if(country_region == undefined) {
    res.json(204, { 'msg' : 'No country found'});
  } else {
    res.json(200, country_region);
  }
}
