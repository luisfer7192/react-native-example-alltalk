const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const DATABASE = require('./db')

console.log(DATABASE)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, '/assets')))
app.use((req, res, next) => {
  // the request is enabled from any client
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

const port = process.env.PORT || 8080
const router = express.Router()

// Api routes

// Root
router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to my api (test)' })
})

// get hotels
router.get('/hotels', (req, res) => {
  DATABASE('getHotels', (data) => {
    res.json({ data })
  })
})

// Get hotels by id
router.route('/hotel/:id').get(({ params }, res) => {
  DATABASE('getHotelsByID', (data) => {
    res.json({ data })
  }, params.id)
})

// Add a hotel
router.put('/hotels', (req, res) => {
  // Check the parametrs are ok
  // Start a array to save the error fields
  let fieldsError = []
  // Translate the names of the fields
  const fieldsTranslate = {id: 'Identificador', name: 'Nombre', stars: 'Estrellas', price: 'Precio', image: 'Imagen', amenities: 'Comodidades'}
  // validate all the fileds exist or require
  const validate = ['id', 'name', 'stars', 'price', 'image', 'amenities'].map((field) => {
    const check = req.body[field]
    if(check === undefined) {
      fieldsError.push(fieldsTranslate[field])
    }
    return check
  })

  // show a error message if the fields aren't complete
  if (validate.includes(undefined)) {
    res.json({ error: `Los siguientes campos son requeridos: ${fieldsError.join(", ")}`})
    return
  }

  DATABASE('putHotel', (data) => {
    res.json({ data })
  }, req.body)
})

// Update a hotel
router.put('/hotel/:id', (req, res) => {
  DATABASE('updateHotel', (data) => {
    res.json({ data })
  }, { id: req.params.id, body: req.body })
})

// Delete a hotel
router.delete('/hotel/:id', ({ params }, res) => {
  DATABASE('deleteHotel', (data) => {
    res.json({ data })
  }, params.id)
})

// Get hotels by starts
router.route('/starts/:stars').get(({ params }, res) => {
  const stars = params.stars.split(',').map(e => parseInt(e))
  DATABASE('getHotelsByStars', (data) => {
    res.json({ data })
  }, stars)
})

// Get the hotel by name
router.route('/search/:name').get(({ params }, res) => {
  DATABASE('getHotelsByName', (data) => {
    res.json({ data })
  }, params.name)
})

app.use('/', router)
app.listen(port)
console.log(`Server running at the port ${port}`)
