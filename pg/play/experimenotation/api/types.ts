/**
 * types.ts
 */

function theBasics() {
	Bun.write(Bun.stdout, 'the basics\n')
}

function extendInterface() {
	interface BASE {
		prop1: string
		prop2: string
	}

	interface EXTENSION extends BASE {
		prop3: number
	}

	interface USEEXTENSION {
		prop4: EXTENSION
	}

	const obj: EXTENSION = {
		prop1: '1',
		prop2: '2',
		prop3: 3
	}

	const obj2: USEEXTENSION = {
		prop4: {
			prop1: '1',
			prop2: '2',
			prop3: 3
		}
	}

	console.dir(obj)
	console.log(typeof obj)
	console.dir(obj2)
}

export { theBasics, extendInterface }