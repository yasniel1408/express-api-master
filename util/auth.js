'use strict'
const {verificarToken} = require('./serviceJWT')

const isAuth = async(req, res, next) => {
	if(!req.headers.authorization){
		return res.status(403).send({err: "Usted no tiene permiso para ver este contendido"});
	}
	const token = req.headers.authorization.split(" ")[1];
	try{
		const sub = await verificarToken(token)
		req.user = sub
		next()
	}catch(err){
		res.status(err.status).send({err: err.err});
	}
}

module.exports = isAuth