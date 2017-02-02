import { wordAssocAPIk } from './api_config.js';
var path = require('path');
var unirest = require('unirest');
var db = require('/../../db');


//termSearch function that utilizes a word-association API to get
//list of word associated with user search word(s)
exports.termSearch = function(req, res) {
  //searchTerm format: "entry=term"
  var searchTerm = 'entry=';

  //req.body.term comes in as an array of search terms input form user
  //convert search term array to string
  var searchTerms = req.body['term'].slice();
  searchTerms.toString();
  searchTerm.concat(searchTerms);

  //sends post request to Twinword API with user entered search term
  unirest.post("https://twinword-word-associations-v1.p.mashape.com/associations/")
    .header("X-Mashape-Key", wordAssocAPIk['key'])
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .send(searchTerm)
    .end(function (result) {
      //sends word association back to client as an array of words
      res.writeHead(200).send(result.body['associations_array']);
  });
}