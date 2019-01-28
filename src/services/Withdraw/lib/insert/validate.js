import Promise from 'bluebird'
import Joi from 'joi'

import errorTypes from '../../errors/errorTypes'

export default (payment) => {
	return new Promise((resolve, reject) => {

		Joi.validate(payment, Schema, (err, res) => {
			if (err) {
				const error = { name: 'DATA_VALIDATION_ERROR', status: 400 }
				reject(new errorTypes(error))
			}

			return resolve(payment)
		})

	})
}

const Schema = Joi.object().keys({
    user_id: Joi.string().min(3).max(245).required(),
    payment_id: Joi.string().min(3).max(245).required()
})