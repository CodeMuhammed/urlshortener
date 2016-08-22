//{}[] here because my keyboard does not work

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
function prompt(question_str , callback) {
  //
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(question_str, function(input) {
    //
    console.log('Your input is:', input);
    callback(input);
    return rl.close();
  });
}

/**
 *Shorten a long url and output the result
 *@param {string} url the long version
 *@param {function} callback to output the result
 *
 *NOTE: This uses a POST method
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

/**
 *Expand a goo.gl url and output the result
 *@param {string} url the short version
 *@param {function} callback to output the result
 *
 *NOTE: This uses a GET method
*/
function expandUrl(url , callback) {
  console.log(url , '--------------here');
  googl.expand(url)
      .then(function (longUrl) {

          callback(null , longUrl);
      })
      .catch(function (err) {
          console.error(err.message);
          callback(err , null);
      });
}

/**
 *This displays menu to user
 *1 means shorten
 *2 means expand
*/
function displayMenu() {

  //Menu
  console.log('\n\nThis app helps you to shortens and lenghten your urls using goo.gl API');
  console.log('Enter <long_url -s> to shorten a long_url');
  console.log('Enter <short_url -e> to lenghten a short_url');

  //Prompts user for option
  prompt('Please enter option >>: ' , function(option) {
    console.log(option);
    var args = option.split(' ');
    console.log(args);

    if(args[1] == '-s' || args[1] == '-e') {
       if(args[1] == '-s') {
         //
        console.log('you want to shorten' , args[0]);
        shortenUrl(args[0], function(err , shortUrl) {
          if(err) {
            console.log('Could not shorten url');
          }
          else {
            console.log('The short version of the url is :', shortUrl);
          }

          //
          displayMenu();
        });
       }
       else {
         //
         console.log('you want to expand' , args[0]);
         expandUrl(args[0], function(err , longUrl) {
           if(err) {
             console.log('Could not expand url');
           }
           else {
             console.log('The long version of the url is :', longUrl);
           }

           //
           displayMenu();
         });
       }
    }
    else {
      console.log('Invalid option selected');
      displayMenu();
    }
  });
}

//This kicks start the commandline process
displayMenu();
