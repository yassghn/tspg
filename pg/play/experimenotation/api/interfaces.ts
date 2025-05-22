/**
 * interfaces.ts
 */

function callable() {
	console.log('callable objects')

	type FNPROPS = {
		props: any[]
		fn: (...args: any) => any
	}

	interface FP extends FNPROPS {
		(...params: any): any
	}

	const lambda: FP = function (...params: any) {
		const l = params.shift()
		return l(...params)
	}
	lambda.props = [1, 2, 3, 4, 5]
	lambda.fn = (a: number, b: number) => lambda.props.reduce((sum: number, val: number) => sum + val, 0) + a + b

	lambda.props.push(6)
	const ret = lambda(lambda.fn, 10, 20)

	console.log(`ret: ${ret}`)
}

export { callable }