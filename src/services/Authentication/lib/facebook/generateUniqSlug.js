import Promise from 'bluebird'
import neo4j from '../../../config/database/neo4j'
import slug from 'slug'

function generateUniqSlugToUser (user) {
	return new Promise((resolve, reject) => {

		let slugName = slug(user.name,
			{ 
				lower: true,
			  	replacement: '',
			  	symbols: false,
			  	charmap: slug.charmap,
				multicharmap: slug.multicharmap
			}
		)

		user.slug = slugName
		
		let cypher  = 'MATCH (slugUser:User) WHERE slugUser.slug = {slug} '
			cypher += 'RETURN slugUser.slug AS slug, slugUser.slug_number AS slug_number '
			cypher += 'ORDER BY slugUser.created_at DESC LIMIT 1'

		const params  = { slug: user.slug }

		neo4j.query(cypher, params, (err, res) => {

			if (err) {
				reject(err)
				return
			}

			const userSlugData = (res && res[0]) ? res[0] : null

			if (!userSlugData) {

				user.slug_number = 0
				resolve(user)

			} else {

				user.slug_number = userSlugData.slug_number + 1
				user.slug 		 = `${user.slug}${user.slug_number}`
				resolve(user)

			}
		})

	})
}

export default generateUniqSlugToUser