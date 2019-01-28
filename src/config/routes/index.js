import { Router } from 'express'
import passport from '../passport'

import authenticateUserLocal from '../../services/Authentication/routes/local'
//import authenticateUserFacebook from '../../services/Authentication/routes/authenticateUserFacebook'

import InsertUser from '../../services/Users/routes/insert'
import UpdateUser from '../../services/Users/routes/update'
import ReadUser from '../../services/Users/routes/read'

import ResetPassword from '../../services/Password/routes/reset'
import UpdatePassword from '../../services/Password/routes/update'

import insertPayment from '../../services/Payment/routes/insert'
import listPayments from '../../services/Payment/routes/list'
import updatePayment from '../../services/Payment/routes/update'

import listNetwork from '../../services/network/routes/list'

import insertWithdraw from '../../services/withdraw/routes/insert'

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

	routes.post('/payment', passport.authenticate('jwt', { session: false }), insertPayment)
	routes.get('/payments', passport.authenticate('jwt', { session: false }), listPayments)
	routes.put('/payment', passport.authenticate('jwt', { session: false }), updatePayment)

	routes.get('/network', passport.authenticate('jwt', { session: false }), listNetwork)

	routes.post('/withdraw', passport.authenticate('jwt', { session: false }), insertWithdraw)

	return routes

}