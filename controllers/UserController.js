const controller = {};
("use strict");
const User = require("../models/User");
const Login = require("../models/Login");
const {
  createToken,
  createRefreshToken,
  verifyRefreshToken,
  destroyRefreshToken,
} = require("../util/auth");
const datatablesQuery = require("datatables-query");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: './public/users',
  filename: function (req, file, cb) {
      switch (file.mimetype) {
          case 'image/jpeg':
              ext = '.jpeg';
              break;
          case 'image/png':
              ext = '.png';
              break;
      }
      cb(null, file.originalname + ext);
  }
});

var upload = multer({storage: storage});

controller.changeAvatar = async (req, res) => {
  const params = req.query;
  const query = await datatablesQuery(User);

  try {
    const result = await query.run(params);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ err });
  }
};


controller.getDataTable = async (req, res) => {
  const params = req.query;
  const query = await datatablesQuery(User);

  try {
    const result = await query.run(params);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ err });
  }
};

controller.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (err) {
    res.status(500).send({ err });
  }
};

controller.login = async function (req, res) {
  try {
    let login = new Login(req.body);
    await login.validate();
    let user = await User.findOne({ email: login.email });
    res.status(200).send({
      token: createToken({ user }),
      refreshToken: createRefreshToken({ email: login.email }),
    });
  } catch (err) {
    res.status(500).send({ err });
  }
};

controller.refreshToken = async (req, res) => {
  const { email, refreshToken } = req.body;
  if (verifyRefreshToken({ email, refreshToken })) {
    let user = await User.findOne({ email });
    res.status(200).send({
      token: createToken({ user }),
    });
  } else {
    res.status(200).send({
      auth: false,
      token: "",
    });
  }
};

controller.logout = async (req, res) => {
  destroyRefreshToken({ refreshToken: req.body.refreshToken });
  await res.json({
    auth: false,
    token: "",
  });
};

controller.userAll = async (req, res) => {
  const users = await User.find();
  res.status(200).send({ users });
};

controller.userOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ err });
  }
};

controller.userUpdate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ err });
  }
};

controller.userDelete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ err });
  }
};

module.exports = controller;
