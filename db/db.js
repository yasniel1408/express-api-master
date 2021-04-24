const mongoose = require('mongoose');

//No preocuparse si no has credo la base de datos 
//Sera creada en caso de que no automáticamente
const URI = 'mongodb://localhost/products';

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log("DB is connected"))//cuando se conecte
    .catch(err => console.error(err));

module.exports = mongoose;