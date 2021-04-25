const controller = {};
("use strict");
const Product = require('../models/Product')

controller.productAll = async (req, res) => {
	const products = await Product.find()
    res.status(200).send({products});
};

controller.productOne = async (req, res) => {
	try{
		const product = await Product.findById(req.params.id);
    	res.status(200).send({product});
	}catch(err){
		res.status(500).send({err})
	}
 	
};

controller.productSave = async (req, res) => {
	try{
		const product = await new Product(req.body).save()
	    res.status(200).send({product})
	}catch(err){
		res.status(500).send({err})
	}
};

controller.productUpdate = async (req, res) => {
    try{
		const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    	res.status(200).send({product});
	}catch(err){
		res.status(500).send({err})
	}
};

controller.productDelete = async (req, res) => {
	try{
		const product = await Product.findByIdAndRemove(req.params.id);
  		res.status(200).send({product});
	}catch(err){
		res.status(500).send({err})
	}
};

module.exports = controller;