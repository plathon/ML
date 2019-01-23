import Promise from 'bluebird'
import neo4j from '../../../../config/database/neo4j'

export default (user) => {
	return new Promise((resolve, reject) => {

		let cypher  = 'MATCH (user:User) WHERE user.user_id  = {user_id} '
		    cypher += 'SET user.name = {name} '
		    cypher += 'SET user.language = {language} '
		
		neo4j.query(cypher, user, (err) => {
			if (err) {
				reject(err)
				return
			}

			resolve(user)
		})

	})
}