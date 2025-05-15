/**
 * index.ts
 */

import ground from 'ground'

(function () {

	const argv = Bun.argv[2]

	if (argv) {
		ground(argv)
	}

})()