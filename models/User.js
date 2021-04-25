const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
 
//de esta forma creamos nuestro modelo
const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    name: {type: String, required: true},
    // password: {type: String, select: false},
    password: {type: String},
	signupDate: {type: Date, default: Date.now()},
});

UserSchema.pre('save', async(next)=>{
	try{
		let user = this;
		if(!user.isModified('password')) return next()
		const salt = bcrypt.getSalt(10);
		const hash = bcrypt.hash(user.password, salt, null)
		user.password = hash;
		next();
	}catch(err){
		console.log(err)
	}
});

module.exports = mongoose.model('User', UserSchema);