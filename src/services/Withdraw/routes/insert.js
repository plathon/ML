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
	.then((payment) => {

		const payload = {
			message: 'Withdraw successfully created',
            label: 'WITHDRAW_SUCCESSFULLY_CREATED',
            //payment_id: payment.payment_id
		}

		res.send(payment)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})
}