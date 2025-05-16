/**
 * ground.ts
 *
 * put things together from play
 */

import runPlayCall from 'playCall'

function _ground(call: string): any {
	return runPlayCall(call)
}

function ground(call: string): any {
	return _ground(call)
}

export default ground