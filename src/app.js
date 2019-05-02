const path = require('path')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()

//define path and express config
const publicDirPath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location 
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to use
app.use(express.static(publicDirPath))

//routing 
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Page',
        Latitude: 123,
        Longitude : 342
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        message : 'This is help message'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address.'
        })
    }

    else{
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
        if(error)
        {
            return res.send({error})
        }
        
        console.log(req.query.address)
        res.send({
            forecast : forecastData,
            location ,
            address : req.query.address
        })
    })
    })
}

    // console.log(req.query.address)
    // res.send({
    //     forecast : 'It is raining',
    //     location : 'Jakarta',
    //     address : req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404_help',{
        message:'Help Article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        message:'Error 404 Page not Found'
    })
})

//server up
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})