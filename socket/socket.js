const Product = require("../models/Product");

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected on Socket");

    adicionarProduct(socket);

    eliminarProduct(socket);

    socket.on("disconnect", () => {
      console.log("Disconnected on Socket");
    });
  });

  const adicionarProduct = (socket) => {
    socket.on("new_product_data", async (data) => {
      const product = await new Product(data).save();
      io.sockets.emit("new_product_created", { newProduct: product });
    });
  };

  const eliminarProduct = (socket) => {
    socket.on("delete_product_id", async (data) => {
      const product = await Product.findByIdAndRemove(data);
      io.sockets.emit("product_deleted", { oldProduct: product });
    });
  };
};

module.exports = socket;
