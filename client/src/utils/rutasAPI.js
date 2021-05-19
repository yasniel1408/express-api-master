let server = '';
if(process.env.NODE_ENV === "production"){
    server = "http://192.168.1.20:4000/api";
    // server = "/api";
}else{
    server = "http://localhost:4000/api";
}

const urlLogin = `${server}/user/login`;
const urlRefreshToken = `${server}/user/refresh-token`;
const urlRegister = `${server}/user/register`;
const urlLogout = `${server}/user/logout`;
const urlGetUserDataTable = `${server}/user/data-table`;
const urlUser = `${server}/user`;


const urlProduct = `${server}/product`;
const urlGetProductsDataTable = `${server}/product/data-table`;

module.exports = {
    urlLogin,
    urlRefreshToken,
    urlRegister,
    urlLogout,
    urlProduct,
    urlUser,
    urlGetProductsDataTable,
    urlGetUserDataTable
}