/**
 * playCall.ts
 */

import play from '../play/play'

/**
 * in the scope of the playground project, the source of calls is "play/" directory
 * "play" "call"
 */

type SrcCall = {
	toString: () => string
	base: string
	module: string
	function: string
}

type SrcCallFn = (...params: any) => any

function _getSrc(): object {
	const src = play()
	return src
}

function _hewCallStrArray(srcCallStr: string): string[] {
	const callArray = srcCallStr.split('.')
	return callArray
}

function _callSyntaxErrorMsg(srcCall: SrcCall, name: string): string {
	const msg = `invalid ${name} string from: ${srcCall.toString()}`
	return msg
}

function _getObjValueFromName(obj: object, name: string): SrcCallFn {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
}

function _isValidSrcCall(srcCall: SrcCall): boolean {
	return true
}

function _hewSrcCall(srcCallStr: string): SrcCall {
	const scA = _hewCallStrArray(srcCallStr)
	const srcCall: SrcCall = {
		toString: () => { return `${scA[0]}.${scA[1]}.${scA[2]}` },
		base: scA[0] ?? '',
		module: scA[1] ?? '',
		function: scA[2] ?? ''
	}
	return srcCall
}

function _getCallFunction(srcCallStr: string): SrcCallFn {
	// get source
	const src = _getSrc()
	// validate source
	if (src) {
		// get src call
		const srcCall = _hewSrcCall(srcCallStr)
		// validate src call
		if (_isValidSrcCall(srcCall)) {

			// iterate src call object to get call function
			const base = _getObjValueFromName(src, srcCall.base)
			const module = _getObjValueFromName(base, srcCall.module)
			const fn = _getObjValueFromName(module, srcCall.function)

			return fn
		} else {
			throw new SyntaxError(`invalid src call string: ${srcCall.toString()}`)
		}
	} else {
		throw new Error('internal error, invalid src: ' + src)
	}
}

function _hewCall(srcCallStr: string): SrcCallFn {
	const fn = _getCallFunction(srcCallStr)
	// return call
	return fn
}

function _runCall(srcCallStr: string): any {
	const fn = _hewCall(srcCallStr)
	const ret = fn()
	return ret
}

function runCall(srcCallStr: string): any {
	return _runCall(srcCallStr)
}

export default runCall