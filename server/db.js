const fs = require('fs')
// Import data from json
const dataJson = require('./data.json')

// Create the functions
const queries = {
  getHotels: (_, cb) => {
    cb(dataJson)
  },
  putHotel: (hotel, cb) => {
    dataJson.push(req.body)
    const json = JSON.stringify(dataJson, null, 2)
    fs.writeFile('./data.json', json, 'utf8', (err, _) => {
      cb(dataJson)
    })
  },
  updateHotel: ({ id, body }, cb) => {
    const hotel = dataJson.filter(hotel => hotel.id === id)
    if (!hotel.length) {
      cb(dataJson)
      return
    }
    const newHotel = Object.assign(
      {},
      hotel[0],
      ...Object.keys(hotel[0]).map(key => ({ [key]: body[key] }))
    )
    const newData = dataJson.filter(hotel => hotel.id !== id)
    newData.push(newHotel)
    const json = JSON.stringify(newData, null, 2)
    fs.writeFile('./data.json', json, 'utf8', (err, _) => {
      cb(newData)
    })
  },
  deleteHotel: (id, cb) => {
    const hotels = dataJson.filter(hotel => hotel.id !== id)
    const json = JSON.stringify(hotels, null, 2)
    fs.writeFile('./data.json', json, 'utf8', (err, _) => {
      cb([])
    })
  },
  getHotelsByID: (id, cb) => {
    const hotel = dataJson.filter(hotel => hotel.id === id)
    cb(hotel)
  },
  getHotelsByName: (name, cb) => {
    const reg = new RegExp(name, 'ig')
    const hotels = dataJson.filter(hotel => reg.test(hotel.name))
    cb(hotels)
  },
  getHotelsByStars: (stars, cb) => {
    const hotels = dataJson.filter(hotel => stars.includes(hotel.stars))
    cb(hotels)
  }
}

module.exports = (fn, cb, data) => {
  try {
    queries[fn](data, cb)
  } catch (error) {
    console.log('Error: ', error)
    cb([])
  }
}
