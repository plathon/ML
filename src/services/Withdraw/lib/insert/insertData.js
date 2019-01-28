import Promise from 'bluebird'
import neo4j from '../../../../config/database/neo4j'
import errorTypes from '../../errors/errorTypes'

export default (payment) => {
	return new Promise((resolve, reject) => {

		const paymentStatuaEnum = {
			pending: 1,
			received: 2,
			canceled: 3,
			reinvested: 4,
			withdrawal_pending: 5,
			withdrawal_completed: 6
		}

		payment.status      = paymentStatuaEnum.withdrawal_pending

        let cypher  = 'MATCH (user:User)-[:PAY]->(payment:Payment) '
            cypher += 'WHERE user.user_id = {user_id} AND payment.payment_id = {payment_id} '
            cypher += 'SET payment.status = {status}'
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

			resolve(res[0])

		})

	})
}