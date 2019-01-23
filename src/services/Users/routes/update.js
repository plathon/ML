import validate   from '../lib/update/validate'
import updateData from '../lib/update/updateData'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const userData = {
		...req.body,
		...req.user
	}

	validate(userData)
	.then(updateData)
	.then(() => {

		const data = {
			label: 'USER_DATA_SUCCESSFULLY_CHANGED',
		    message: 'your data was successfully changed.'
		}

		res.send(data)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})

}