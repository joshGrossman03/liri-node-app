# liri-node-app
This App provides a search function to search for concert dates "concert-this", song information "spotify-this", and movie information "movie-this".

The App is organized such that for each command enetered, "concert-this","spotify-this","movie-this", and "do-what-it-says" the app will call the specified function and send a request either utilizing the axios module or the spotify module. The response is parsed and displayed to the client in the console and the results are appended to the log.txt file.

To run LiriBot type "node liri.js COMMAND SEARCH TERM" in the terminal window. The available COMMANDS are:"concert-this","spotify-this","movie-this", and "do-what-it-says". The dependencies must be installed on the client machine before attempting to run the app. Refer to the package.json for the dependencies required in this app.  


github repository: https://github.com/joshGrossman03/liri-node-app.git

App uses node.js, npm modules: axios, spotify  APIs: OMDB, Spotify, BandsInTown

developed by Josh Grossman