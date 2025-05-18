/**
 * ground.ts
 *
 * put things together from play
 */

import io from 'io'

import callFlow from 'callFlow'

function _ground(callFlowStr: string): any {
	try {
		const ret = callFlow(callFlowStr)
		return ret
	} catch (e: any) {
		io.std.err(e.message)
	}
}

function ground(callFlowStr: string): any {
	return _ground(callFlowStr)
}

export default ground