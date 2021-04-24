const controller = {};
("use strict");
const Product = require('../models/Product')

controller.productAll = async (req, res) => {
	const p = await Product.find()
    res.status(200).send({products: p});
};

controller.productOne = async (req, res) => {
 	const p = await Product.findById(req.params.id);
    res.status(200).send({product: p});
};

controller.productSave = async (req, res) => {
    const p = new Product(req.body).save().catch(err=>console.log(err.errors.description.properties));
    res.status(200).send({mensaje: "producto resivido"});
};

controller.productUpdate = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({mensaje: "producto editado"});
};

controller.productDelete = async (req, res) => {
 	await Product.findByIdAndRemove(req.params.id);
    res.status(200).send({mensaje: "producto eliminado"});
};

module.exports = controller;