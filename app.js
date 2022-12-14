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
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Menu = require('./models/menu');
const bcrypt=require('bcrypt');

mongoose.connect('mongodb://127.0.0.1/mess-management');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
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
})

// app.get('/menus/new', (req, res) => {
//     res.render('menus/new');
// })

app.post('/menus', async (req, res) => {
    const menu = new Menu(req.body.menu);
    await menu.save();
    res.redirect(`/menus/${menu._id}`);
    console.log(menu)
})

app.get('/menus/:id', async (req, res,) => {
    const menu = await Menu.findById(req.params.id)
    res.render('menus/show', { menu });
});

app.get('/menus/:id/edit', async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    res.render('menus/edit', { menu });
})

app.put('/menus/:id', async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const menu = await Menu.findByIdAndUpdate(id, { breakfast: { fixed: ['Tea', 'Coffee', 'Milk'], variable_breakfast: req.body.breakfast.variable_breakfast } ,
    
    lunch: { fixed: ['roti', 'rice', 'salad'], variable_sabji: req.body.lunch.variable_sabji } ,

    dinner: { fixed: ['roti', 'rice', 'salad'], variable_sabji: req.body.dinner.variable_sabji , variable_sweets: req.body.dinner.variable_sweets} } );
    
    res.redirect(`/menus/${menu._id}`);                    
    //res.send("editing");
    
});


// const express=require('express');
const pp=express();
// const User=require('./models/user');
// const mongoose=require('mongoose');


// mongoose.connect('mongodb://127.0.0.1/appDemo');

// // const db=mongoose.connection;
// // db.on("error",console.error.bind(console,'connection error'));
// // db.once('open',()=>{
// //     console.log("database connected");
// // })
// pp.set('view engine','ejs');
// pp.set('views','views');

// pp.use(express.urlencoded({extended:true}));

// pp.get('/',(req,res)=>{
//     res.send('THIS IS THE HOME PAGE');
// })

pp.get('/register',(req,res)=>{
    res.render('register')
})

pp.post('/register',async(req,res)=>{
    const {password, username}=req.body;
    const hash = await bcrypt.hash(password,12);
    const user=new User({
        username,
        passsword:hash
    })

    await user.save();
    res.send(req.body);
    res.redirect('/')

})
// pp.get('/secret',(req,res)=>{
//     res.send('THIS IS SECRET! YOU CANNOT SEE ME UNLESS YOU ARE LOGGED IN!!')
// })





app.listen(3000, () => {
    console.log('Serving on port 3000')
})
