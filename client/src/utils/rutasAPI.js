let server = '';
if(process.env.NODE_ENV === "production"){
    server = "http://192.168.1.20:3000/api";
}else{
    // server = "http://localhost:3000/api";
    server = "http://192.168.1.20:3000/api";
}

const urlLogin = `${server}/user/login`;
const urlVerifiedToken = `${server}/user/verifie-token`;
const urlRegister = `${server}/user/register`;
const urlLogout = `${server}/user/logout`;

module.exports = {
    urlLogin,
    urlVerifiedToken,
    urlRegister,
    urlLogout,
}