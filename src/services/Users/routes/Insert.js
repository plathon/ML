import validate 	  	from '../lib/insert/validate'
import generateUniqSlug from '../lib/insert/generateUniqSlug'
import encryptPassword  from '../lib/insert/encryptPassword'
import insertData 		from 	'../lib/insert/insertData'
import generateJWT    	from '../lib/insert/generateJWT'

import errorHandler from '../errors/errorHandler'

export default (req, res, next) => {

	const userData = req.body

	validate(userData)
	.then(generateUniqSlug)
	.then(encryptPassword)
	.then(insertData)
	.then(generateJWT)
	.then(data => {

		const payload = {
			message: 'User successfully created',
			label: 'USER_SUCCESSFULLY_CREATED',
			token: data.token
		}

		res.send(payload)

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})
}