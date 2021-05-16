const mongoose = require('mongoose');
const config = require("../util/config")

//No preocuparse si no has credo la base de datos 
//Sera creada en caso de que no automáticamente
mongoose.connect(config.db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log("DB is connected"))//cuando se conecte
    .catch(err => console.error(err));
mongoose.set("useCreateIndex", true);


module.exports = mongoose;