/**
 * interfaces.ts
 */

function callable() {
	console.log('callable objects')

	// create callable interface
	interface CALLABLE {
		(...params: any[]): any
	}

	// extend on class
	const lambda: CALLABLE = function(...params: any) {
		const fn = params.shift()
		return fn(...params)
	}

	const add = (a: number, b: number) => a + b

	console.log(lambda(add, 5, 6))
}

export { callable }