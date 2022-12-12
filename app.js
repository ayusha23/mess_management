// const express=require('express');
// const mongoose=require('mongoose');
// const ejsMate=require('ejs-mate');
// const path=require('path');

// mongoose.connect('mongodb://127.0.0.1/mess-management' );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const app = express();

// // app.engine('ejs', ejsMate)
// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'))

// app.get('/', (req, res) => {
//     res.render('home');
//     console.log("hi");
// });

// app.listen(3000, () => {
//     console.log('Serving on port 3000')
// })

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Menu = require('./models/menu');

mongoose.connect('mongodb://127.0.0.1/mess-management' );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});
app.get('/menus', async (req, res) => {
    const menus = await Menu.find({});
    res.render('menus/index', { menus })
    console.log(menus);
    
// const camp=new Menu(
// {
// title:'Sunday',
// description:'breakfast lunch dinner'
// });

// await camp.save();
// res.send(camp)

})

app.get('/menus/new', (req, res) => {
    res.render('menus/new');
})

app.post('/menus', async (req, res) => {
    const menu = new Menu(req.body.menu);
    await menu.save();
    res.redirect(`/menus/${menu._id}`);
})

app.get('/menus/:id', async (req, res,) => {
    const menu = await Menu.findById(req.params.id)
    res.render('menus/show', { menu });
});

app.get('/menus/:id/edit', async (req, res) => {
    const menu = await Menu.findById(req.params.id)
    res.render('menus/edit', { menu });
})

app.put('/menus/:id', async (req, res) => {
    const { id } = req.params;
    const menu = await Menu.findByIdAndUpdate(id, { ...req.body.menu });
    res.redirect(`/menus/${menu._id}`)
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
