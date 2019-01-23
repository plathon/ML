import Promise from 'bluebird'
import neo4j   from '../../../config/database/neo4j'
import uuid    from 'node-uuid'

import errorTypes from '../errors/errorTypes'

function insertfacebookUserIfNotExists (user) {
	return new Promise((resolve, reject) => {

    if (!user.already_exists) {

      user.user_id  = uuid.v1()
      user.language = 'en-us'

  	  let cypher  = 'CREATE (u:User '
          cypher += '{ user_id: {user_id}, '
          cypher +=   'name: {name}, '
          cypher +=   'email: {email}, '
          cypher +=   'slug: {slug}, '
          cypher +=   'language: {language}, '
          cypher +=   'avatar: {avatar}, '
          cypher +=   'created_at: timestamp(), '
          cypher +=   'facebook_id: {facebook_id}, '
          cypher +=   'facebook_key: {facebook_key} '
          cypher += '})-[:IS_FOLLOWING]->(u)'

      neo4j.query(cypher, user, (err, res) => {

        if (err) {
          reject(err)
          return
        }

        resolve(user)

      })

    } else {

      resolve(user)

    }

	})
}

export default insertfacebookUserIfNotExists