import Promise from 'bluebird'
import slug from 'slug'

export default (user) => {
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
		
		resolve(user)

	})
}