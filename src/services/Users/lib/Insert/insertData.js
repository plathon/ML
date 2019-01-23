import Promise from 'bluebird'
import uuid    from 'node-uuid'
import neo4j from '../../../../config/database/neo4j'
import errorTypes from '../../errors/errorTypes'
/**
 * 
 * User uniq const para usuário email, user_id, slug
 * https://neo4j.com/docs/cypher-manual/current/schema/constraints/#query-constraint-unique-nodes 
 */

export default (user) => {
	return new Promise((resolve, reject) => {

        user.user_id  = uuid.v1()
        user.language = 'pt-br'

		let cypher  = 'MATCH (indicator:User) WHERE indicator.user_id = {indicated_by} WITH indicator '
			cypher += 'CREATE (user:User { user_id: {user_id}, '
			cypher +=					  'name: {name}, '
			cypher +=					  'email: {email}, '
			cypher += 					  'password: {password}, '
			cypher += 					  'language: {language}, '
			cypher += 					  'created_at: datetime(), '
			cypher += 					  'slug: {slug} })<-[:INDICATED]-(indicator) '
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