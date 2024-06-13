const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log('Database connected')
})

const sample = arr=> arr[Math.floor(Math.random()*arr.length)]

const seedDB = async ()=>{
    await Campground.deleteMany({})
    for (let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author: '6650534405afd00902acb6ce',
            location: `${cities[random1000].city}, ${cities[random1000].state}` , 
            geometry: {
              type: 'Point',
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati magni modi ipsa corporis unde repudiandae officiis sapiente, neque laboriosam rem debitis recusandae. Non praesentium reprehenderit fuga dolor corrupti possimus magni.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dflxu7cox/image/upload/v1717047240/YelpCamp/uqd9agvuzptje1x0e0o6.jpg',
                  filename: 'YelpCamp/uqd9agvuzptje1x0e0o6'
                },
                {
                  url: 'https://res.cloudinary.com/dflxu7cox/image/upload/v1717047241/YelpCamp/mlfphz5xhjrfjbunnr9s.jpg',
                  filename: 'YelpCamp/mlfphz5xhjrfjbunnr9s'
                }
              ]
        })
        await camp.save()
    }
}
seedDB().then( ()=>{
    db.close()
})