import getData 		   from '../lib/local/getData'
import comparePassword from '../lib/local/comparePassword'
import generateJWT	   from '../lib/local/generateJWT'

import errorHandler 	   from '../errors/errorHandler'

export default (req, res, next) => {

	const user = req.user

	getData(user)
	.then(comparePassword)
	.then(generateJWT)
	.then((user) => {

		res.send({
			message: 'user successfully authenticated',
			label: 'USER_SUCCESSFULLY_AUTHENTICATED',
			token: user.token,
			profile: {
				name     : user.name,
				email    : user.email,
				avatar   : user.avatar,
				language : user.language,
				slug     : user.slug
			}
		})

	})
	.catch(errorHandler)
	.catch( err => {
		console.log(err)
		next(err)
	})

}