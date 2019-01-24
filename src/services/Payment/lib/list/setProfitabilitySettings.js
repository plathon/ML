import Promise from 'bluebird'

export default (payments) => {
	return new Promise((resolve, reject) => {

		payments = {
            profitability_settings: {
                average_daily_profitability: process.env.AVERAGE_DAILY_PROFITABILITY,
                profitability_limit: process.env.PROFITABILITY_LIMIT
            },
            payments: [ ...payments ]
        }

        resolve(payments)

	})
}
