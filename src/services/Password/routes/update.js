import validate 	      from '../lib/update/validate'
import encryptPassword    from '../lib/update/encryptPassword'
import checkHashAndUpdate from '../lib/update/checkHashAndUpdate'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

    const user = req.body

	validate(user)
	.then(encryptPassword)
	.then(checkHashAndUpdate)
	.then(() => {

		const payload = {
			label: 'PASSWORD_SUCCESSFULLY_CHANGED',
		    message: 'your password was successfully changed.'
		}

		res.send(payload)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})
}