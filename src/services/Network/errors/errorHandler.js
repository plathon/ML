import Promise from 'bluebird'

function errorHandler (err) {
	return new Promise( (resolve, reject) => {

		if (err.name == 'DATA_VALIDATION_ERROR') {
			reject({ status: err.status, msg: 'Dados irregulares fornecidos.' })
			return
		}

		reject(err)
	})
}

export default errorHandler