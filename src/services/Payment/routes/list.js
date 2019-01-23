import validate 	  	from '../lib/list/validate'
import listData 	  	from '../lib/list/listData'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const payments = req.user

	validate(payments)
	.then(listData)
	.then(payments => {

		res.send(payments)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})
}