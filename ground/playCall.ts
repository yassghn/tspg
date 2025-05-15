/**
 * playCall.ts
 */

type playCall = {
	toString: () => string
	base: string
	module: string
	function: string
}

function _getPlayCallArray(call: string): string[] {
	const playCallArray = call.split('.')
	return playCallArray
}

function _isValidPlayCall(pcA: string[]): boolean {
	// check for any undefined
	if (pcA.length > 0) {
		for (let i = 0; i < pcA.length; i++) {
			if (!pcA[i]) {
				return false
			}
		}
		// valid play call
		return true
	}

	return false
}

function _hewPlayCall(call: string): playCall {
	// get play call array
	const pcA = _getPlayCallArray(call)
	// verify call array
	if (_isValidPlayCall(pcA)) {
		// make playcall object
		const pc: playCall = {
			toString: () => { return `${pcA[0]}.${pcA[1]}.${pcA[2]}` },
			base: pcA[0] ?? '',
			module: pcA[1] ?? '',
			function: pcA[2] ?? ''
		}
		return pc
	} else {
		// err
		throw new Error('invalid play call string: ' + call)
	}
}

function _playCall(call: string): playCall {
	const pc = _hewPlayCall(call)
	return pc
}

function playCall(call: string): playCall {
	const pc = _playCall(call)
	return pc
}

export default playCall