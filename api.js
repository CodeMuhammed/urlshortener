//{}[]

/**
 *Simple commandline application that shortens and expands urls
 *By authenticating with google url shorter API
*/

//Require dependencies here
var googl = require('goo.gl');
var readline = require('readline');

// Set a developer key (_required by Google_; see http://goo.gl/4DvFk for more info.)
googl.setKey('AIzaSyAsUOFWvfUxUDK3VcqCYnDqZ3nUoZZrBKw');

/**
 *This prompt function takes input from the commandline from the user
*/

function prompt() {
  //
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Please enter a url to shorten: >>', function(long_url) {
    //
    console.log('Your input is:', long_url);

    //
    shortenUrl(long_url , function(err, short_url) {
      if(err) {
        console.log('Cannot shorten the url you provided');
      }
      else {
        console.log('The short version of the url is:', short_url);
        rl.close();

        //
        //@TODO for reapeated prompts
      }
    });
  });
}

/**
 *Shorten a long url and output the result
 *@param {string} url the long version
 *@param {function} callback the long version
*/
function shortenUrl(url , callback) {
  googl.shorten('url')
      .then(function (shortUrl) {
          callback(null , shortUrl);
      })
      .catch(function (err) {
          console.error(err.message);
          callback(err , null);
      });
}

//This kicks start the commandline process
prompt();
