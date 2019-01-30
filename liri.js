require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var fs = require("fs");

var op = process.argv[2];
var search = process.argv.slice(3).join(" ");

var bandQuery = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
var movieQuery = "http://www.omdbapi.com/?i=tt3896198&apikey=88337377&t=" + search;
var defaultQuery = "http://www.omdbapi.com/?i=tt3896198&apikey=88337377&t=mr+nobody";

switch(op) {
  case "concert-this":
    bandSearch();
    break;
  case "spotify-this-song":
  spotifySearch();
    break;
  case "movie-this":
  movieSearch();
    break;
  case "do-what-it-says":
  whatItSays();
}


  var divider = "\n-------------------------------\n"


function bandSearch() {
  axios
  .get(bandQuery)
  .then(function(response) {
    var bandLog = "Artist: " + search + 
    "\nName of Venue: " + response.data[0].venue.name + 
    "\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.region + 
    "\nDate: " + moment(response.data[1].datetime.split('T')[0]).format('YYYY MM DD')
    
    fs.appendFile("log.txt", bandLog + divider, function(err) {
      if (err) throw err;
    });
    console.log(bandLog);
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};

function spotifySearch() {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
   
  spotify.search({ type: 'track', query: search}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log(data); 
  });
};

function movieSearch() {
  if(!search) {
    axios
    .get(defaultQuery)
    .then(function(response) {
      var result = response.data;
      var movieLog = "Title: " + result.Title +
      "\nYear: " + result.Year + 
      "\nIMDB Rating: " + result.Ratings[0].Value + 
      "\nRotten Tomatoes Rating: " + result.Ratings[1].Value + 
      "\nCountry of Production: " + result.Country + 
      "\nLanguage: " + result.Language +
      "\nActors: " + result.Actors + 
      "\nPlot: " + result.Plot

        fs.appendFile("log.txt", movieLog + divider, function(err) {
          if (err) throw err;
        });
        console.log(movieLog);
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }
  else {
    axios
    .get(movieQuery)
    .then(function(response) {
      var result = response.data
      var movieLog = "Title: " + result.Title +
      "\nYear: " + result.Year + 
      "\nIMDB Rating: " + result.Ratings[0].Value + 
      "\nRotten Tomatoes Rating: " + result.Ratings[1].Value + 
      "\nCountry of Production: " + result.Country + 
      "\nLanguage: " + result.Language +
      "\nActors: " + result.Actors + 
      "\nPlot: " + result.Plot

        fs.appendFile("log.txt", movieLog + divider, function(err) {
          if (err) throw err;
        });
        console.log(movieLog);
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }
};

function whatItSays() {

};