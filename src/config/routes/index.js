import { Router } from 'express'
import passport from '../passport'


import authenticateUserLocal from '../../services/Authentication/routes/local'
//import authenticateUserFacebook from '../../services/Authentication/routes/authenticateUserFacebook'

import InsertUser from '../../services/Users/routes/insert'
import UpdateUser from '../../services/Users/routes/update'
import ReadUser from '../../services/Users/routes/read'

import ResetPassword from '../../services/Password/routes/reset'
import UpdatePassword from '../../services/Password/routes/update'

export default () => {

	let routes = Router()

	routes.post('/auth/local', passport.authenticate('local', { session: false }), authenticateUserLocal)
	//routes.get('/auth/facebook', passport.authenticate('facebook', { scope:['email'] } ))
	//routes.get('/auth/facebook/callback', passport.authenticate('facebook'), authenticateUserFacebook)

	routes.post('/users', InsertUser)
	routes.put('/users', passport.authenticate('jwt', { session: false }), UpdateUser)

	routes.get('/profile/:slug', ReadUser)

	routes.post('/password/reset', ResetPassword)
	routes.post('/password/update', UpdatePassword)

	return routes

}