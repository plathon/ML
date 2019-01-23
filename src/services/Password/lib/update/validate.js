import Promise from 'bluebird'
import Joi from 'joi'

import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		Joi.validate(user, Schema, (err, res) => {
			if (err) {
				console.log(err)
				const error = { name: 'DATA_VALIDATION_ERROR', status: 400 }
				reject(new errorTypes(error))
			}

			return resolve(user)
		})

	})
}

const Schema = Joi.object().keys({
    email: Joi.string().min(3).max(245).required(),
	password_hash: Joi.string().min(3).max(245).required(),
	new_password: Joi.string().min(3).max(245).required()
})