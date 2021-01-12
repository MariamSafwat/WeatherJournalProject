/* Global Variables */
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?';

const apikey = '0d20bfc8117f67a42092414bb5b6c7d7';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// listen for button click
const btn = document.getElementById('generate');
btn.addEventListener('click', performAction);

function performAction(){
	//get the user input zip code and alert them if it's empty
	const zipCode = document.getElementById('zip').value;
	const feeling = document.getElementById('feelings').value;
	if(zipCode === ''){
		alert('please enter zip code');
	}
	else{
		// call functions order
		getData(zipCode).then((res) => postData('/addData', {res,newDate, feeling})).then(() => updateUI('/data'));
	}
}


const getData = async(zipCode) =>{
	//fetch data from api
	const request = await fetch(apiURL+`zip=${zipCode}&appid=${apikey}&units=metric`);
	try {
  		// Transform into JSON
  		const response = await request.json();
  		return response; //return to postdata
  	} catch(error){
  			console.log("error",error);
  		}
}

// post the data we got from the server and the user
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    	method: 'POST', 
    	credentials: 'same-origin', // same origin as we use a local server
    	headers: {
        	'Content-Type': 'application/json',
    	},

    	body: JSON.stringify(data),
    });
    try {
      	return;
    }catch(error) {
    	console.log("error", error);
    }
}

// update ui
const updateUI = async (url ='') =>{
	// fetch data from server
	const request = await fetch(url);
	try{
		const response = await request.json();
		// update html elements with the recieved data
		const dateDiv = document.getElementById('date');
		const tempDiv = document.getElementById('temp');
		const contentDiv = document.getElementById('content');

		dateDiv.innerHTML = response.date; 
		tempDiv.innerHTML = response.temp;
		contentDiv.innerHTML = response.feeling;
	} catch(error){
		console.log("error", error);
	}
}



