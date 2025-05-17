/**
 * playCall.ts
 */

import play from '../play/play'

type callStr = {
	toString: () => string
	base: string
	module: string
	function: string
}

type playCallFunction = (...params: any) => any

interface playCall {
	call: callStr,
	fn: playCallFunction
}

function _getPlayCallArray(call: string): string[] {
	const playCallArray = call.split('.')
	return playCallArray
}

function _playCallSyntaxErrorMsg(pc: callStr, name: string): string {
	const msg = `invalid ${name} string from: ${pc.toString()}`
	return msg
}

function _getObjValueFromName(obj: object, name: string): playCallFunction {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
}

function _getPlayCallFunction(pc: callStr): any {
	const p = play()

	const base = _getObjValueFromName(p, pc.base)
	const module = _getObjValueFromName(base, pc.module)
	const fn = _getObjValueFromName(module, pc.function)

	return fn
}

function _isValidCallStr(pc: callStr): boolean {
	const p = play()

	const base = _getObjValueFromName(p, pc.base)
	if (!base) {
		return false
	}

	const module = _getObjValueFromName(base, pc.module)
	if (!module) {
		return false
	}

	const fn = _getObjValueFromName(module, pc.function)
	if (!fn) {
		return false
	}

	return true
}

function _isValidCallArray(pcA: string[]): boolean {
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

function _hewPlayCallStr(pcA: string[]): callStr {
	const pcStr: callStr = {
		toString: () => { return `${pcA[0]}.${pcA[1]}.${pcA[2]}` },
		base: pcA[0] ?? '',
		module: pcA[1] ?? '',
		function: pcA[2] ?? ''
	}
	return pcStr
}

function _hewPlayCall(call: string): playCall {
	// get play call array
	const pcA = _getPlayCallArray(call)
	// verify call array
	if (_isValidCallArray(pcA)) {
		const callStr = _hewPlayCallStr(pcA)
		if (_isValidCallStr(callStr)) {
			const fn = _getPlayCallFunction(callStr)
			// make play call object
			const pc: playCall = {
				call: callStr,
				fn: fn
			}
			// return playcall
			return pc
		} else {
			throw new Error('invalid play call: ' + callStr.toString())
		}
	} else {
		// err
		throw new Error('invalid play call string: ' + call)
	}
}

function _runPlayCall(call: string): any {
	const pc = _hewPlayCall(call)
	const ret = pc.fn()
	return ret
}

function runPlayCall(call: string): any {
	return _runPlayCall(call)
}

export default runPlayCall