const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express();

const publicStaticPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const weatherData = require('../utils/weatherData')

var port = process.env.PORT || 4000


app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicStaticPath))

app.get('/',(req,res)=>{
	res.render('index',{
		title:'Weather App'
	})
})

//localhost:4000/weather?address=cityName
app.get('/weather',(req,res)=>{
	
	const address = req.query.address
	if(!address){
		return res.send({
			error:"You must enter the address"
		})
	}


	weatherData(address,(error,{temperature,description,cityName}={})=>{
	if(error){
		return res.send({error})
	}
	res.send({
		temperature,
		description,
		cityName
	})
	})
})


app.get('*',(req,res)=>{
	res.render('404',{
		title:'page not found'
	})
})





app.listen(port, ()=>{
	console.log(`server running on port ${port}`)
})