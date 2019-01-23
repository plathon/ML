import validate   from '../lib/read/validate'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const userData = req.params
    console.log(userData)
	validate(userData)
	.then(() => {

		const payload = {
			profile: {}
		}

		res.send(payload)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})

}