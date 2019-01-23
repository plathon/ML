import validate 	from '../lib/reset/validate'
import setHash 	    from '../lib/reset/SetHash'
import generateHash from '../lib/reset/generateHash'
import sendEmail 	from '../lib/reset/sendEmail'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

    const user = req.body

	validate(user)
	.then(generateHash)
	.then(setHash)
	.then(sendEmail)
	.then(payload => res.send(payload))
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})

}