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

		if (err.name == 'PAYMENT_NOT_FOUND') {
			reject({ status: err.status, msg: 'Não foi possivel localizar pagamento.' })
			return
		}

		if (err.name == 'UNABLE_TO_UPDATE_PAYMENT') {
			reject({ status: err.status, msg: 'Não foi possivel atualizar pagamento.' })
			return
		}

		reject(err)
	})
}

export default errorHandler