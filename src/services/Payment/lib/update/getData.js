import Promise from 'bluebird'
import neo4j from '../../../../config/database/neo4j'

export default (payment) => {
	return new Promise((resolve, reject) => {

        let cypher  = 'MATCH (user:User) WHERE user.user_id = {user_id} WITH user '
            cypher += 'MATCH (user)-[:PAY]->(payment:Payment) WHERE payment.payment_id = {payment_id} '
            cypher += 'RETURN payment'

        neo4j.query(cypher, payment, (err, res) => {
            if (err) {
                reject(err)
                return
            }

            if (!res.length) {
				const error = { name: 'PAYMENT_NOT_FOUND'}
				reject(error)
				return
            }

            resolve(res[0])

        })

	})
}