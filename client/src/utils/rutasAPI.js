let HTTP_SERVER_DIR = "/";

const urlLogin = `${HTTP_SERVER_DIR}api/user/login`;
const urlAvatar = `${HTTP_SERVER_DIR}api/user/avatar`;
const urlRefreshToken = `${HTTP_SERVER_DIR}api/user/refresh-token`;
const urlRegister = `${HTTP_SERVER_DIR}api/user/register`;
const urlLogout = `${HTTP_SERVER_DIR}api/user/logout`;
const urlGetUserDataTable = `${HTTP_SERVER_DIR}api/user/data-table`;
const urlUser = `${HTTP_SERVER_DIR}api/user`;

const urlProduct = `${HTTP_SERVER_DIR}api/product`;
const urlGetProductsDataTable = `${HTTP_SERVER_DIR}api/product/data-table`;

module.exports = {
  HTTP_SERVER_DIR,
  urlLogin,
  urlRefreshToken,
  urlRegister,
  urlLogout,
  urlProduct,
  urlUser,
  urlAvatar,
  urlGetProductsDataTable,
  urlGetUserDataTable,
};
