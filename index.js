var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');


// parse application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",function(req,res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function (req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        "FNAME": firstname,
        "LNAME": lastname }
  }]};

  var jsonData =  JSON.stringify(data);

  console.log(firstname + lastname + email);

  var options =  {
    url: "https://us20.api.mailchimp.com/3.0/lists/c7e0b4fde4",
    method: "POST",
    headers: {
    "Authorization": "rafaelr6 df408c831227af1eeaede09a19ca3439-us20"
  },
    body: jsonData
  };


  request(options, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  
  res.sendFile(__dirname + "/success.html");

});

});

// Mailchimp API Key df408c831227af1eeaede09a19ca3439-us20
// Mailchip listid = c7e0b4fde4

app.listen(3000);
console.log ("server 3000");
