

require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var command = process.argv[2].toLowerCase();
var artist = process.argv.slice(3).join(" ").toLowerCase();
var fs = require("fs");

 



//console.log(command);
//console.log(artist);

var bandsInTown = function (artist) {
    
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            //console.log(response);
            if(response.data.length === 0){
                console.log ("Looks like the selected artist: " + artist + ", has no planned tour dates. Choose another artist for your search!");
            }
            
            else {
                console.log(
            "============================================================================"
                );
                console.log("Tour Date(s) search results for: " + artist);
            for (var i = 0; i < response.data.length; i++) {
                var venue = response.data[i].venue.name;
                var city = response.data[i].venue.city;
                var country = response.data[i].venue.country;
                console.log("Venue: "+ venue);
                console.log("Location: " + city +", "+ country);
                var eventTime = response.data[i].datetime;
            
                console.log("Time: "+ eventTime);
                console.log(  "---------------------");
                
                        fs.appendFile("log.txt", "\n"+"_________________________________________________________________________________________________________"
                        + "\n"+"Concert-This Search Results for: " +artist 
                        +"\n" + "Venue: "+ venue 
                        +"\n" + "Location: " + city + ", " + country
                        +"\n"  + " Date: " + eventTime,
                        
                        
                        function (err) {
                               if (err) {
                                   console.log(err);
                               }
                               else {
                                   //console.log("content added!")
                               }
                       });
            }
        }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("--------------DATA----------------");
                console.log(error.response.data);
            }
        })
};

var spotifyer = function (artist) {

    if (!artist) {
        artist = 'The Sign by Ace of Base'
    }

    spotify.search({ type: 'track', query: artist, limit: 20 })
        .then(function (response) {

            if (response) {

                for (var j = 0; j < response.tracks.items.length; j++) {

                    var albumName = response.tracks.items[j].album.name;
                    var artistName = response.tracks.items[j].artists[0].name;
                    var songName = response.tracks.items[j].name;
                    var previewUrl = response.tracks.items[j].preview_url;

                    console.log("-----------Song---------------");
                    console.log("Album: "+ albumName);
                    console.log("Artist: "+ artistName);
                    console.log("Song Title: "+ songName);
                    console.log("Preview the song here: "+ previewUrl);
                   

                    fs.appendFile("log.txt", "\n"+"_________________________________________________________________________________________________________"
                     + "\n"+"Spotify Search Results for: " +artist 
                     +"\n" + "Album: "+ albumName 
                     +"\n" + "SONG TITLE: " + songName 
                     +"\n"  + " ARTIST: " + artistName 
                     +"\n" + " PREVIEW URL: " + previewUrl, 
                     
                     function (err) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                //console.log("content added!")
                            }
                    });
                }

            }
        })
        .catch(function (err) {
            console.log(err);
        });
};


var getMovie = function (artist) {
    if (!artist) {
        artist = 'Mr. Nobody.'
    };
    axios.get("https://www.omdbapi.com/?apikey=trilogy&t=" + artist).then(
        function (response) {
            //console.log(response);
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
            var mTitle = response.data.Title;
            var mYear = response.data.Year;
            var mImdbRating = response.data.imdbRating;
            var mRottenToms= response.data.Ratings[1].Value;
            var mProdCountry = response.data.Country;
            var mLanguage = response.data.Language;
            var mPlot = response.data.Plot;
            var mActors = response.data.Actors;

            fs.appendFile("log.txt", "\n"+"_________________________________________________________________________________________________________" 
            + "\n"+"OMDB Search Results for: " +artist 
            +"\n" + "Movie Title: " + mTitle 
            +"\n"+ "Year Released: " + mYear
            +"\n"+"IMDB Rating: "+ mImdbRating
            +"\n"+"Rotten Tomatoes Score: "+ mRottenToms 
            +"\n" +"Production Location: " + mProdCountry 
            +"\n"+ "Language(s): " + mLanguage 
            + "\n" + "Plot: " + mPlot 
            + "\n" + "Cast: " + mActors, 
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("content added!")
                    }
                });
        }).catch(function (error) {
            if (error.response) {
                console.log("--------------DATA----------------");
                console.log(error.response.data);
            }
        })
};




var doThis = function () {

    var doThisCommand = "";
    var doThisVariable = "";

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {

            return console.log(error);

        }
        //console.log(data);
        var dataArr = data.split(",");
        doThisCommand = dataArr[0];
        doThisVariable = dataArr[1];

        switch (doThisCommand) {
            case "concert-this":
                bandsInTown(doThisVariable);
                break;

            case "spotify-this":
                spotifyer(doThisVariable);
                break;

            case "movie-this":
                getMovie(doThisVariable);
                break;

        };
    });
};



switch (command) {
    case "concert-this":
        bandsInTown(artist);
        break;

    case "spotify-this":
        spotifyer(artist);
        break;

    case "movie-this":
        getMovie(artist);
        break;

    case "do-what-it-says":
        doThis();
        break;
};

//constructor function





/*
concert-this

spotify-this-song

movie-this

do-what-it-says

What Each Command Should Do
node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

-Name of the venue

-Venue location

-Date of the Event (use moment to format this as "MM/DD/YYYY")

node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

-Artist(s)

-The song's name

-A preview link of the song from Spotify

-The album that the song is from

-If no song is provided then your program will default to "The Sign" by Ace of Base.

You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

Step One: Visit https://developer.spotify.com/my-applications/#!/

Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.

node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

It's on Netflix!

You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Edit the text in random.txt to test out the feature for movie-this and concert-this.

BONUS
In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

Make sure you append each command you run to the log.txt file.

Do not overwrite your file each time you run a command.

Reminder: Submission on BCS
Please submit the link to the Github Repository!

*/