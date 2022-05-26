const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true})); 

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')

	// res.send('hello life')
})

app.post('/',function(req,res){

	const query = req.body.countryName;
	const apiKey = '4e6d5ae01a0fef1638fa8463db2b4a1b';
	const unit = 'metric'
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey +'&units='+ unit;

	https.get(url, function(response){
		console.log(response.statusCode);

		response.on('data',function(data){
			const weatherData = JSON.parse(data)
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
			res.write('<p>Your weather is currently ' + weatherDescription + '</p>')
			res.write('<h1>Temperature in ' + query +' is ' + temp + 'degrees Celcius.</h1>')
			res.write('<img src= ' + imageURL +'>')
			res.send();
		});
	});
})

app.listen(2000,'127.0.0.1');