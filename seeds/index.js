const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Exploration = require('../models/exploration');
const { coordinates } = require('@maptiler/client');

mongoose.connect('mongodb://localhost:27017/globetrotter-guide', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Exploration.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const explore = new Exploration({
            author: '66a136a1908b666b881ec032',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude
                 ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbr070puv/image/upload/v1721842326/Trekking_tsrjba.jpg',
                    filename: 'Trekking_tsrjba.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dbr070puv/image/upload/v1721842326/parachute_phjtod.jpg',
                    filename: 'parachute_phjtod.jpg'
                }
            ]
        })
        await explore.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})