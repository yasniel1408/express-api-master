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
const uploadAvatar = require("../util/uploadAvatar");
const multer = require("multer");

controller.changeAvatar = async (req, res) => {
  try {
    await uploadAvatar(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ err });
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).send({ err });
      }

      // Everything went fine.
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { avatar: req.avatar ? "users/" + req.avatar : "" },
        { new: true }
      );
      res.status(200).send({ file: req.file, user });
    });
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
