import Promise from 'bluebird'
import bcryptjs from 'bcryptjs'

import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		bcryptjs.compare(user.password, user.password_hash, (err, res) => {

			if (err) {
				const error = { name: 'USER_AND_PASSWORD_NOT_MATCH', status: 400 }
				reject(new errorTypes(error))
				return
			}

			if (!res) {
				const error = { name: 'USER_AND_PASSWORD_NOT_MATCH', status: 400 }
				reject(new errorTypes(error))
				return
			}

			resolve(user)
		})

	})
}