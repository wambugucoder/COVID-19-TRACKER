const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const request = require('request');

//BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//JSON DATA
app.use(express.json());


//API
app.get("/api/covid19", (req, res) => {
    var CovidData=[];
    request('https://api.covid19api.com/summary', function (error, response, body) {
         // Print the response status code if a response was received
         res.json(JSON.parse(body))
         
      })
     
})
//PRODUCTION
if (process.env.NODE_ENV === 'production') {
 app.use(express.static('client/build'));
}

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));