// Setup empty JS object to act as endpoint for all routes
projectData = {
	temp : '',
	date : '',
	feeling :''
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//configuring express to use body-parser as middle-ware.
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


// recieve the data posted on client side
// POST route
app.post('/addData', (req,res)=>{
	// add temp, date, user feeling to endpoint
	projectData.temp = req.body.res.main.temp;
	projectData.date = req.body.newDate;
	projectData.feeling = req.body.feeling;
	res.send('post received');
});
// send data to client side to update ui
// GET route
// same url as in updateUI fetch 
app.get('/data', (req,res)=>{
	//send res data of endpoint object
	res.send(projectData);
});

