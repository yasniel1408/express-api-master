const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
 
const UserSchema = new Schema({
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
	},
    name: {
		type: String, 
		required: [true, 'El campo nombre no puede estar vacio'],
	},
    password: {
		type: String, 
		required: [true, 'El campo password no puede estar vacio'],
		validate: {
			validator: function (v) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(v);
			},
			message: `La contraseña debe tener de 8 a 15, debe tener minúsculas y mayúsculas!`
		},
	},
	signupDate: {
		type: Date, 
		default: Date.now()
	},
});

UserSchema.pre('save', function(next){
	let user = this
	if (!user.isModified('password')) return next()
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

module.exports = mongoose.model('User', UserSchema);