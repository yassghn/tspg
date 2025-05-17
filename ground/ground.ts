/**
 * ground.ts
 *
 * put things together from play
 */

import runPlayCall from 'call'

function _ground(srcCallStr: string): any {
	try {
		const ret = runPlayCall(srcCallStr)
		return ret
	} catch (e) {
		// todo: error reporting
		console.error(e)
	}
}

function ground(srcCallStr: string): any {
	return _ground(srcCallStr)
}

export default ground