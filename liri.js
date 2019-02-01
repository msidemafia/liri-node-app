require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var op = process.argv[2];
var search = process.argv.slice(3).join(" ");

var divider = "\n-------------------------------\n"

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
  });
};

function spotifySearch() {
  spotify.search({ type: 'track', query: search}, function(err, data) {
    var result = data.tracks.items[0];
    var songDisplay = "Artist: " + result.artists[0].name +
    "\nSong Name: " +  result.name + 
    "\nPreview Link: " + result.preview_url + 
    "\nAlbum: " + result.album.name;
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log(songDisplay); 
  fs.appendFile("log.txt", songDisplay + divider, function(err) {
    if (err) throw err;
  });
  });
};

function movieSearch() {
  if(!search) {
    movieQuery = defaultQuery;
  }
    axios
    .get(movieQuery)
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
    });
};
function whatItSays() {
fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");
  search = dataArr[1];
  spotifySearch();
})
};