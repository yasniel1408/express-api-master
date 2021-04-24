const mongoose = require('mongoose');
const { Schema } = mongoose;
 
//de esta forma creamos nuestro modelo
const Product = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
});
 
module.exports = mongoose.model('Product', Product);
