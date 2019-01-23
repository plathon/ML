import Promise from 'bluebird'
import bcryptjs from 'bcryptjs'

export default (user) => {
	return new Promise((resolve, reject) => {
		
		bcryptjs.genSalt(10, (err, salt) => {
			if (err) return reject(err)
			bcryptjs.hash(user.new_password, salt, (err, hash) => {
				if (err) return reject(err)
				user.password = hash
				return resolve(user)
			})
	  })

	})
}