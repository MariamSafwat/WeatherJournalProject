// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
	console.log(`running on localhost: ${port}`);
});

// ana b-post data men el app f lazm ast2blha men el server
// POST route
app.post('/addData', (req,res)=>{
	// post temp, date, user feeling
	projectData.temp = req.body.temp;
	//TODO nfs el klam lel date wel user feeling
});

// GET route
// el goz2 ely byb3at el data
// el url hna nfs ely fe fetch fe updateUI
app.get('/data', (req,res)=>{
	//send res data of endpoint object
	res.send(projectData);
});

