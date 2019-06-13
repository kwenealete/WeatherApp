const path = require ('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('', {
        title: 'Weather Forecast',
        name: 'KWENE ALETE'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'KWENE ALETE',
        message: 'This is a weather application free to use from any location of your choice. Get weather forecast for any location you want and take precautions depending on the weather forecast. '
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        title: 'Help',
        name: 'KWENE ALETE',
        message: 'Kindly click on the weather link and enter your desired location in the text box to get your weather forecast.'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to provide an address, Kindly do so'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }    
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address})
        })
    })
    
})



    app.get('/help/*', (req,res) => {
        res.render('404', {
            title: '404',
            name: 'kwene alete',
            errorMesage: 'Help article not found'
        })
    })

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'kwene alete',
        errorMesage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})