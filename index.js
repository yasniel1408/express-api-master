"use strict";
const bodyParser = require("body-parser");
const express  = require('express');
const morgan = require('morgan');
const path = require('path')
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require('cors');
require('./socket/socket')(io);


require("./db/db.js");
const config = require("./util/config");

//Settings
app.set("port", config.port);

//Middelewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(morgan("dev"));
app.use(
  cors({
    origen: "*",
    credentials: true,
    expuestosHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    methods: ["OPTIONS", "GET", "PUT", "POST", "DELETE"],
  })
);

//Routes
app.use("/api/product", require("./routes/apiProducts"));
app.use("/api/user", require("./routes/apiUser"));

//Static files
app.use(express.static(path.join(__dirname, "public")));
//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));
//build mode
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

//Starting the server
http.listen(app.get("port"), function () {
  console.log(`Server running on *:${app.get("port")}`);
});
