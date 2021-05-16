'use strict'
const jwt = require("jsonwebtoken");
const config = require("./config")
const randToken = require("rand-token")

const refreshTokens = {}

const createToken = ({user}) => {
  const token = jwt.sign({ user }, config.SECRET_TOKEN, {
    expiresIn: "1m",
  });
  return token;
};

const createRefreshToken = ({email}) => {
	let refreshToken = randToken.uid(256);
	refreshTokens[refreshToken] = email;
	return refreshToken;
}

const verifyRefreshToken = ({email, refreshToken}) => {
  if((refreshToken in refreshTokens)&&(refreshTokens[refreshToken] === email)){
  	 return true;
  }
  return false;
};

const destroyRefreshToken = ({refreshToken}) => {
	if(refreshToken in refreshTokens){
  	 	delete refreshTokens[refreshToken];
  	 	return true;
  	}
	return false;
}

const isAuth = (req, res, next) => {
	if(!req.headers.authorization){
		return res.status(403).send({err: "Usted no tiene permiso para ver este contendido"});
	}
	const token = req.headers.authorization.split(" ")[1];
	jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
	    if (err) {
	      return res.status(403).json({
	        auth: false,
	        err
	      });
	    }
	    req.user = decoded.user;
	    next();
	 });
};

module.exports = {
	isAuth,
	createToken,
	createRefreshToken,
	destroyRefreshToken,
	verifyRefreshToken
}