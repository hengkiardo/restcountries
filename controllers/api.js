var _ = require('lodash');
var countries = require('../resources/countriesV1');

exports.index = function(req, res) {
  res.send({message : 'Welcome buddy!'});
};

exports.getAll = function(req, res) {
  res.json(200, countries)
}
