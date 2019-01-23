import validate 	  	from '../lib/insert/validate'
import insertData 	  	from '../lib/insert/insertData'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const payment = { 
		...req.body,
		...req.user
	}

	validate(payment)
	.then(insertData)
	.then(() => {

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