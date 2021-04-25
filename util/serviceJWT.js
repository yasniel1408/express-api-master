'use strict'

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("./config")

const createToken = async user => {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	}

	return jwt.encode(payload, config.SECRET_TOKEN)
}

const verificarToken = async token => {
	return new Promise((resolve, reject)=>{
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN);
			if(payload.exp < moment().unix()){
				reject({
					status: 401,
					err: "El token ha expirado"
				})
			}
			resolve(payload.sub);
		}catch(error){
			reject({
				status: 401,
				err: "El token no es correcto"
			})
		}
	});
}

module.exports = {
	createToken,
	verificarToken
}