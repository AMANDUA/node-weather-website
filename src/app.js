const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Aman Dua"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: "Aman Dua"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        name: "Aman Dua"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide a address!!"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help Article not found',
        name: 'Aman Dua',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'My 404 page',
        name: 'Aman Dua',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000')
})


