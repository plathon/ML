import generateUniqSlug from '../lib/facebook/generateUniqSlug'
import getData 			from '../lib/facebook/getData' 
import insertData       from '../lib/facebook/insertData'
import generateJWT	 	from '../lib/facebook/generateJWT'

import errorHandler 	from '../../errors/errorHandler'
//com
function authenticateUserFacebook (req, res, next) {

	const user = {
		facebook_key: req.user.accessToken,
		facebook_id: req.user.profile.id,
		email: req.user.profile.emails[0].value,
		name: `${req.user.profile.name.givenName} ${req.user.profile.name.familyName}`,
		avatar: 'https://graph.facebook.com/'+ req.user.profile.id +'/picture'
	}

	generateUniqSlug(user)
	.then(getData)
	.then(insertData)
	.then(generateJWT)
	.then((user) => {

		const profile = {
			user_id: user.user_id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			language: user.language,
			slug: user.slug
		}

		res.redirect(process.env.BASE_URL + "/oauth/callback?token=" + user.token + '&profile=' + JSON.stringify(profile))

	})
	.catch(errorHandler)
	.catch( err => {
		next(err)
	})

}

export default authenticateUserFacebook