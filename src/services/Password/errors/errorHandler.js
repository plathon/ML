import Promise from 'bluebird'

function errorHandler (err) {
	return new Promise( (resolve, reject) => {

		if (err.name == 'DATA_VALIDATION_ERROR') {
			reject({ status: err.status, msg: 'Dados irregulares fornecidos.' })
			return
		}

		if (err.name == 'USER_NOT_FOUND') {
			reject({ status: err.status, msg: 'Usuário não encontrado.' })
			return
		}

		if (err.name == 'USER_OR_PASSWORD_HASH_NOT_FOUND') {
			reject({ status: err.status, msg: 'Usuário ou dados de atualização de senha não encontrados.' })
			return
		}

		reject(err)
	})
}

export default errorHandler