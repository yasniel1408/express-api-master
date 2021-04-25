const controller = {};
("use strict");
const User = require('../models/User')
const {createToken} = require('../util/serviceJWT')

controller.signUp = async (req, res) => {
	try{
		const user = new User(req.body)
		await user.save()
		res.status(200).send({token: createToken(user)});
	}catch(err){
		res.status(500).send({err})
	}
};

controller.signIn = async (req, res) => {
	try{
		const user = User.find(req.body.email)
		if(!user) res.status(404).send({err: "No existe un usuario con ese email"})
		req.user = user
		res.status(200).send({token: createToken(user)});
	}catch(err){
		res.status(500).send({err})
	}
};

controller.userAll = async (req, res) => {
	const users = await User.find()
    res.status(200).send({users});
};

controller.userOne = async (req, res) => {
    try{
		const user = await User.findById(req.params.id);
    	res.status(200).send({user});
	}catch(err){
		res.status(500).send({err})
	}
};

controller.userUpdate = async (req, res) => {
 	try{
		const user = await User.findByIdAndUpdate(req.params.id, req.body);
    	res.status(200).send({user});
	}catch(err){
		res.status(500).send({err})
	}
};

controller.userDelete = async (req, res) => {
    try{
		const user = await User.findByIdAndRemove(req.params.id);
  		res.status(200).send({user});
	}catch(err){
		res.status(500).send({err})
	}
};

module.exports = controller;