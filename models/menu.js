const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    title: String,
    price: String,
    description:String,
    dish:String

    
});

module.exports = mongoose.model('Menu', MenuSchema);

