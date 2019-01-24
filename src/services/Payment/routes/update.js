import validate 	  	from '../lib/update/validate'
import getdata 	  	    from '../lib/update/getdata'
import checkdate 	  	from '../lib/update/checkdate'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const payment = { 
		...req.body,
		...req.user
	}

    validate(payment)
    .then(getdata)
	.then(checkdate)
	.then((payment) => {

		const payload = {
			message: 'Payment successfully updated',
            label: 'PAYMENT_SUCCESSFULLY_updated',
            //payment_id: payment.payment_id
		}

		res.send(payment)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})
}