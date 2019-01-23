import Promise from 'bluebird'
import uuid    from 'node-uuid'
import neo4j from '../../../../config/database/neo4j'
import errorTypes from '../../errors/errorTypes'

export default (payments) => {
	return new Promise((resolve, reject) => {

		let cypher  = 'MATCH (user:User) WHERE user.user_id = {user_id} WITH user '
            cypher += 'MATCH (user)-[:PAY]->(payments:Payment) '
			cypher += 'RETURN  { user_id: user.user_id } AS user, payments '

		neo4j.query(cypher, payments, (err, res) => {
			if (err) {
				reject(err)
				return
			}

			if (!res.length) {
				const error = { name: 'PAYMENT_ERROR', status: 400 }
				reject(new errorTypes(error))
				return
			}

			resolve(res)

		})

	})
}