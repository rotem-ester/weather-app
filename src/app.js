const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
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
    res.render('index', {
        title: 'Best Weather Site Ever',
        name: 'Rotem'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rotem'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'I realy can\'t help you, sorry',
        name: 'Mizton'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address query'
        })
    }

    geocode(req.query.address,  (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        } 
        forecast(longitude, latitude, (error, {description, temperature, feelslike} = {}) => {
            if (error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                description,
                temperature,
                feelslike
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error-page', {
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error-page', {
        errorMessage: 'Nothing here :('
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})