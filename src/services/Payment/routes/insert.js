import validate 	  	from '../lib/insert/validate'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const data = req.body

	validate(data)
	.then(data => {

		const payload = {
			message: 'Payment successfully created',
			label: 'PAYMENT_SUCCESSFULLY_CREATED',
		}

		res.send(payload)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})
}