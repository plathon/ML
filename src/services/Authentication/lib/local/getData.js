import Promise from 'bluebird'
import neo4j from '../../../../config/database/neo4j'

export default (user) => {
	return new Promise((resolve, reject) => {

        let cypher = 'MATCH (user:User) WHERE user.email = {email} RETURN user'

        neo4j.query(cypher, user, (err, res) => {
            if (err) {
                reject(err)
                return
            }

            if (!res.length) {
				const error = { name: 'USER_NOT_FOUND'}
				reject(error)
				return
            }

            res[0].password_hash = res[0].password
            res[0].password      = user.password

            resolve(res[0])
        })

	})
}