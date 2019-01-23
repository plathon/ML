
class errorTypes extends Error {
	constructor (props) {
		super()
		this.errors = (props && props.errors) ? props.errors : []
		this.name   = (props && props.name )  ? props.name   : ''
		this.status = (props && props.status) ? props.status : 500
	}
}

export default errorTypes