import Promise from 'bluebird'
import neo4j from '../../../../config/database/neo4j'
import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		let cypher  = 'MATCH (user:User) WHERE user.email  = {email} '
            cypher += 'SET user.password_hash = {password_hash} '
            cypher += 'RETURN user'
		
		neo4j.query(cypher, user, (err, res) => {
			if (err) {
				reject(err)
				return
			}

            if (!res.length) {
                const error = { name: 'USER_NOT_FOUND', status: 400 }
                reject(new errorTypes(error))
                return
            }

			resolve(user)
		})

	})
}
