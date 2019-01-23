import Promise from 'bluebird'
import neo4j   from '../../../config/database/neo4j'

function retrieveUserByEmailIfAlreadyExists (user) {
	return new Promise((resolve, reject) => {

		let cypher  = 'MATCH (u:User) WHERE u.email = {email} '
        cypher += 'WITH u, u.name AS name, u.avatar AS avatar, u.language AS language, '
        cypher += 'u.slug AS slug, u.user_id AS user_id, u.email AS email, u.password AS password '
        cypher += 'LIMIT {limit} RETURN user_id, name, avatar, language, slug, email, password AS password_hash'

    const params = { email: user.email, limit: 1 }

    neo4j.query(cypher, params, (err, res) => {

      if (err) {
        reject(err)
        return
      }

      const userExists = ( res.length ) ? true : false

      if (userExists) {
        user = res[0]
        user.already_exists = userExists
      }

      resolve(user)

    })

	})
}

export default retrieveUserByEmailIfAlreadyExists