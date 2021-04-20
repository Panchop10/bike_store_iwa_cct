var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({ 
    id: { type: String, unique: true},
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String,
});

module.exports = mongoose.model('products', productSchema);