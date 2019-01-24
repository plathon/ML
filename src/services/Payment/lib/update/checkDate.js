import Promise from 'bluebird'
import moment from 'moment'
import errorTypes from '../../errors/errorTypes'

export default (payment) => {
	return new Promise((resolve, reject) => {

        const payday = moment(payment.created_at)
        let endday   = payday.clone()
        endday.add(process.env.PROFITABILITY_LIMIT, 'day')
        
        let diff = payday.diff(endday)

        if (diff > 0 ) resolve(payment)
        else reject(new errorTypes({ name: 'UNABLE_TO_UPDATE_PAYMENT', status: 400 }))

	})
}