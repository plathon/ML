import Promise from 'bluebird'
import Joi from 'joi'

import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		Joi.validate(user, Schema, (err, res) => {
            console.log(err)
			if (err) {
				const error = { name: 'DATA_VALIDATION_ERROR', status: 400 }
				reject(new errorTypes(error))
			}

			return resolve(user)
		})

	})
}

const Schema = Joi.object().keys({
	slug: Joi.string().min(3).max(245).required()
})