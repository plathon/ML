import redis from '../config/database/redis'

const likePublication = (socket = null, payload) => {
    socket.to(payload).broadcast.emit('action', { type: 'FEED_PUBLICATION_LIKE_RECEIVED', payload: payload })
}

export default likePublication