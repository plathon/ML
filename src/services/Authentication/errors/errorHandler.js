import Promise from 'bluebird'

function errorHandler (err) {
	return new Promise( (resolve, reject) => {

		if (err.name == 'DATA_VALIDATION_ERROR') {
			reject({ status: err.status || 500, msg: 'Dados irregulares fornecidos.' })
			return
		}

		if (err.name == 'USER_AND_PASSWORD_NOT_MATCH') {
			reject({ status: err.status || 500, msg: 'Usuário e senha não conferem.' })
		}

		if (err.name == 'USER_NOT_FOUND') {
			reject({ status: err.status || 500, msg: 'Usuário não encontrado.' })
			return
		}

		reject(err)
	})
}

export default errorHandler