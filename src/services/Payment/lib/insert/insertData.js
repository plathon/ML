import Promise from 'bluebird'
import uuid    from 'node-uuid'
import neo4j from '../../../../config/database/neo4j'
import errorTypes from '../../errors/errorTypes'

export default (user) => {
	return new Promise((resolve, reject) => {

		let cypher  = 'MATCH (user:User) WHERE user.user_id = {user_id} WITH user '
            cypher += 'CREATE (user)-[:PAY]-(:Payment { _'
            cypher +=                                  '}) '
			cypher += 'RETURN user'

		neo4j.query(cypher, user, (err, res) => {
			if (err) {
				reject(err)
				return
			}

			if (!res.length) {
				const error = { name: 'WRONG_USER_OR_INDICATOR', status: 400 }
				reject(new errorTypes(error))
				return
			}

			resolve(user)
		})

	})
}