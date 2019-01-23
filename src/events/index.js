import redis from '../config/database/redis'

import likePublication from './likePublication'

export default (socket) => {

	console.log('user connected')

	socket.on('action', ({ type, payload }) => {

		if (type == 'server/LIKE_PUBLICATION') {
			likePublication(socket, payload)
		}

		socket.on('disconnect', () => {
		    console.log('user disconected')
		})

	})
}