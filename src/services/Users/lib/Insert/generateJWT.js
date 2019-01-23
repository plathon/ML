import Promise from 'bluebird'
import jwt from 'jsonwebtoken'

export default (user) => {
	return new Promise((resolve, reject) => {

		jwt.sign({ id: user._id }, process.env.APP_SECRET, { expiresIn: 172800000 }, (err, token) => {

			if (err) {
				reject(err)
				return
			}

			user.token = token
			resolve(user)

		})

	})
}