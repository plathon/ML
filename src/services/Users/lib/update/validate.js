import Promise from 'bluebird'
import Joi from 'joi'
import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		Joi.validate(user, schema, (err, res) => {
			if (err) {
				const error = { name: 'DATA_VALIDATION_ERROR', status: 400 }
				reject(new errorTypes(error))
			}
			return resolve(user)
		})

	})
}

const schema = Joi.object().keys({
	_id: Joi.string().required(),
	name: Joi.string().min(3).max(245).required(),
	language: Joi.string().min(3).max(45).required()
})