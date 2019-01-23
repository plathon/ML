import express from 'express'
//import SocketIO from 'socket.io'
//import redis from 'redis'
//import redisSocketIO from 'socket.io-redis'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import Raven   from 'raven'
import dotenv from 'dotenv'
import paginate from 'express-paginate'

//init express
const app = express()

//validate env type and set development variables @docs https://github.com/motdotla/dotenv
import './config/environment'
import routes from './config/routes'
import passport from './config/passport'
//import events from './events'

// Must configure Raven before doing anything else with it
//Raven.config(process.env.SENTRY_URL).install()

// The request handler must be the first middleware on the app
//app.use(Raven.requestHandler())

//init default middlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit : '100kb' }))
app.use(morgan('combined'))

app.use(passport.initialize())
app.use(paginate.middleware(10, 10))

//manter comentado quando for apenas uma API
//app.use('/static', express.static('uploads'))

//config paginate middleware
app.all(function(req, res, next) {
  if ( req.query.limit <= 10 ) req.query.limit = 10
  next()
})

//apply routes middleware
app.use(routes())

// The error handler must be before any other error middleware
//app.use(Raven.errorHandler())

//Error handle response to user
app.use((err, req, res, next) => {
	if (err instanceof Error) {
		console.log(err)
		res
		.status(500)
		.send('Could not process your request. Please try again later.')
	} else {
		res.status(err.status || 500).send(err.msg || 'error')
	}
})

//start node on port 8080
const server 	= app.listen(8080)
//const io     	= SocketIO(server)

//var pub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
//var sub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)

// io.adapter(redisSocketIO({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }))

// io.on('connection', (socket) => {
// 	events(socket)
// })

// io.on('error', (error) => {
// 	console.log(error)
// })
