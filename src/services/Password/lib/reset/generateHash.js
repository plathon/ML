import Promise from 'bluebird'
import uuid    from 'node-uuid'
import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		user.password_hash = uuid.v1()
		resolve(user)

	})
}