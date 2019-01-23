import Promise from 'bluebird'

function errorHandler (err) {
	return new Promise( (resolve, reject) => {

		if (err.name == 'DATA_VALIDATION_ERROR') {
			reject({ status: err.status, msg: 'Dados irregulares fornecidos.' })
			return
		}

		if (err.name == 'PAYMENT_ERROR') {
			reject({ status: err.status, msg: 'Não foi possivel concluir pagamento.' })
			return
		}

		reject(err)
	})
}

export default errorHandler