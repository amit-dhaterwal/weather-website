const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocodUtils')
const forecast = require('./utils/forecastUtils')

const app = express()
const port = process.env.PORT || 3000

// Define path for exprees config
const publicDirectoryPath = path.join(__dirname,'../public')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handelbars engine and view location
const viewsPath = path.join(__dirname,'../templates/views') // views directory contains all the file which will be renderd.
app.set('view engine','hbs')        //setting the 'view engine' value
app.set('views',viewsPath)          // setting the "views" value which is path to the renderd files

//setup static directory for serve
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)

app.get('/',(req,res) => {
    res.render("index",{
        name: 'Amit Dhaterwal',
        title:'See your weather here' 
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name: 'Amit Dhaterwal',
        title: 'intrduction to the website',
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
    name:'Amit Dhaterwal',
    title: 'Help',
    helpText:'use this page for documentation'
    })
})

app.get("/weather",(req,res) => {
        if (!req.query.address) {
            return res.send({
                error:"please provide address"
            })
        }
        geocode(req.query.address,(error,{latitude,longitude,place}={}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    weather: forecastData,
                    place: place,
                    address: req.query.address
                })
            })
        })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Could not connect to product'
        })
    }
    res.send([])
})

app.get('/help',(req,res) => {
    res.render('help',{
    name:'Amit',
    title:'Help'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        name:'Amit Dhaterwal',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        name:'Amit Dhaterwal',
        errorMessage:'Can not found page'
        
    })
})

app.listen(port,() => {
    console.log("server is running on port " + port)
})





