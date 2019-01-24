import Promise from 'bluebird'
import uuid    from 'node-uuid'
import neo4j from '../../../../config/database/neo4j'
import errorTypes from '../../errors/errorTypes'

export default (payment) => {
	return new Promise((resolve, reject) => {

		const paymentStatuaEnum = {
			pending: 1,
			received: 2,
			canceled: 3,
			reinvested: 4
		}

		payment.payment_id  = uuid.v1()
		payment.status      = paymentStatuaEnum.pending

		let cypher  = 'MATCH (user:User) WHERE user.user_id = {user_id} WITH user '
            cypher += 'CREATE (user)-[:PAY]->(payment:Payment { payment_id: {payment_id}, '
			cypher +=                                  'amount: {amount}, '
			cypher += 					  			   'status: {status}, '
			cypher += 					  			   'created_at: datetime() })'
			cypher += 'RETURN payment'

		neo4j.query(cypher, payment, (err, res) => {
			if (err) {
				reject(err)
				return
			}

			if (!res.length) {
				const error = { name: 'PAYMENT_ERROR', status: 400 }
				reject(new errorTypes(error))
				return
			}

			resolve(payment)

		})

	})
}