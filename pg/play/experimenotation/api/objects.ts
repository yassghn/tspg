/**
 * objects.ts
 */

function shallowCopy() {
	console.log('shallow copy test')

	const cmp = {
		x: 1,
		y: 1,
		z: 1
	}

	const cmpx = {
		x: 1,
		y: 2,
		z: 3,
		cmpZ: cmp
	}

	// copy reference
	const cmpxEqual = cmpx
	// shallow copy object (keep nested references)
	const cmpxCopy = { ...cmpx }

	// equality tests
	console.log(cmpx == cmpxEqual)
	console.log(cmpx === cmpxEqual)

	console.log(cmpx == cmpxCopy)
	console.log(cmpx === cmpxCopy)

	// alter values
	cmpx.cmpZ.x = 5
	cmpx.y = 10
	// cmpZ, i.e. const cmp, refence stays the same
	console.log(cmpx)
	console.log(cmpxEqual)
	console.log(cmpxCopy)
}

export { shallowCopy }