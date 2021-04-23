const controller = {};
("use strict");

controller.productAll = async (req, res) => {
    res.status(200).send({products: []});
};

controller.productOne = async (req, res) => {
    res.json(req);
};

controller.productSave = async (req, res) => {
    console.log(req.body);
    res.status(200).send({mensaje: "producto resivido"});
};

controller.productUpdate = async (req, res) => {
    res.json(req);
};

controller.productDelete = async (req, res) => {
    res.json(req);
};

module.exports = controller;