const mongoose = require('mongoose');
const dishes = require('./dishes');
const { weekDay } = require('./seedHelpers');
const Menu = require('../models/menu');

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//    // useNewUrlParser: true,
//   //  useCreateIndex: true,
//    // useUnifiedTopology: true
// });

mongoose.connect('mongodb://127.0.0.1/mess-management');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Menu.deleteMany({});
    for (let i = 0; i < 7; i++) {
        const random1000 = Math.floor(Math.random() * 10);
        const camp = new Menu({
            
            dish: `${dishes[random1000].name}`,
            title: `${sample(weekDay)}`,
            description:"i love food",
        })
        await camp.save();
    }
}

seedDB();
