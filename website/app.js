/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiURL = 'http://api.openweather';

const apikey = '0d20bfc8117f67a42092414bb5b6c7d7'

// listen for button click
const btn = document.getElementById('generate');
btn.addEventListener('click', performAction);

function performAction(){
	//get the user input zip code and alert them if it's empty
	const zipCode = document.getElementById('zip');
	if(zipCode.value === ''){
		alert('please enter zip code');
	}
	else{
		const getData = async() =>{
			//fetch data from api
			//const request = await fetch(url); // url gwaha zip code w apikey w unit = metric
			// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
			const request = await fetch(apiURL+`zip=${zipCode.value}&appid=${apikey}&units=metric`);
			try {
  				// Transform into JSON
  				const response = await request.json();
  				return response; //h7tag value el response da fe fn postdata
  			}
  			catch(error){
  				console.log("error",error);
  			}
		}
		// Async POST
		// t2rebn el fn de mfrod tb2a b3d el getdata gwa else
		// post the data we got from the server and the user
		const postData = async ( url = '', data = {})=>{

		    const response = await fetch(url, {
		    method: 'POST', 
		    credentials: 'same-origin', // 3shan bt3aml m3 local server msh ba5od data men server bara
		    headers: {
		        'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(data), // body data type must match "Content-Type" header  yb2a el data ely hab3atha lazm tb2a json      
		  });

		    try {
		      //const newData = await response.json();
		      //return newData
		    }catch(error) {
		    console.log("error", error);
		    }
		}

	}
}


