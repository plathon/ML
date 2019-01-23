import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

export default (passport) => {

	/**
	* passport LocalStrategy
	**/

	passport.use(new LocalStrategy({
		usernameField: 'email',
		session: false
	}, (email, password, done) => {

			const user = { email: email, password: password }

			if (!user) {
				done(null, false)
				return
			}

			done(null, user)

	  	}
	))

	/**
	* passport JwtStrategy
	**/

	passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.APP_SECRET,
	}, (payload, done) => {
			if (!payload) return done(null, false)
			const user = { user_id: payload.user_id }
			done(null, user)
		}
	))

	/**
	* passport FacebookStrategy
	**/

	passport.use(new FacebookStrategy({
	    clientID: process.env.FACEBOOK_APP_ID,
	    clientSecret: process.env.FACEBOOK_SECRET,
	    callbackURL: process.env.FACEBOOK_CALLBACK,
	    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
	}, (accessToken, refreshToken, profile, cb) => {
	    	return cb(null, { profile: profile, accessToken: accessToken })
	  	}
	))

	/**
	* passport serialize middleware
	**/

	passport.serializeUser(function(user, done) {
	  done(null, user)
	})

	/**
	* passport deserialize middleware
	**/

	passport.deserializeUser(function(user, done) {
	  done(null, user)
	})

	return passport
}
