const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
const User = require('./User');

const LoginSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El campo email no puede estar vacio'],
        unique: [true, 'Ya existe un usuario con este email'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: props => `${props.value} no es un email valido!`
        },
        validate: {
            validator: async function (v) {
                let user = await User.findOne({ email: this.email });
                if (!user)
                    return false;
            },
            message: `No existe un usuario con ese email!`
        },
    },
    password: {
        type: String,
        required: [true, 'El campo password no puede estar vacio'],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,20}$/.test(v);
            },
            message: `La contraseña debe tener de 8 a 15, debe tener minúsculas y mayúsculas!`
        },
        validate: {
            validator: async function (v) {
                let user = await User.findOne({ email: this.email });
                if (!bcrypt.compareSync(this.password, user.password)) {
                    return false;
                }
                return true;
            },
            message: `Usuario o contraseña incorrecta!`
        },
    },
});

module.exports = mongoose.model('Login', LoginSchema);