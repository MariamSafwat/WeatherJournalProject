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
		
		console.log("btn clicked successfuly");
		// tarteb nadh el functions
		// TODO data in post data
		//TODO call postData fn with same url of app.post in server side and data: response returned from getData & user input
		getData(zipCode).then((res) => postData('/addData', {res,newDate, feeling})).then(() => updateUI('/data'));
	}
}


const getData = async(zipCode) =>{

	//fetch data from api
	//const request = await fetch(url); // url gwaha zip code w apikey w unit = metric
	// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
	const request = await fetch(apiURL+`zip=${zipCode}&appid=${apikey}&units=metric`);
	try {
  		// Transform into JSON
  		const response = await request.json();
  		console.log(response);
  		return response; //h7tag value el response da fe fn postdata
  	} catch(error){
  			console.log("error",error);
  		}
}

// Async POST
// t2rebn el fn de mfrod tb2a b3d el getdata gwa else
// post the data we got from the server and the user
const postData = async ( url = '', data = {})=>{
	console.log("entered postdata ");
	console.log(data);

    const response = await fetch(url, {
    	method: 'POST', 
    	credentials: 'same-origin', // 3shan bt3aml m3 local server msh ba5od data men server bara
    	headers: {
        	'Content-Type': 'application/json',
    	},

    	body: JSON.stringify(data), // body data type must match "Content-Type" header  yb2a el data ely hab3atha lazm tb2a json 
    });
    console.log("oki");
    console.log(response);
    try {
      	//const newData = await response.json();
      	//return newData
      	console.log("im out");
      	return;
    }catch(error) {
    	console.log("error", error);
    }
}

// update ui
const updateUI = async (url ='') =>{
	// fetch data from server
	console.log("hi");
	const request = await fetch(url);
	console.log("entered updateUI");
	//console.log(request);
	try{
		// convert json data to js 
		const response = await request.json();
		console.log(response);
		// then update ui
		const dateDiv = document.getElementById('date');
		const tempDiv = document.getElementById('temp');
		const contentDiv = document.getElementById('content');
		dateDiv.innerHTML = response.date; // TODO h7ot hna value el date el rg3aly men el response
		tempDiv.innerHTML = response.temp;
		contentDiv.innerHTML = response.feeling;
		//TODO update temp and content too
		


	} catch(error){
		console.log("error", error);
	}
}



