/**
 * playCall.ts
 */

import play from '../play/play'

type playCall = {
	toString: () => string
	base: string
	module: string
	function: string
}

type playCallFunction = (...params: any) => any

function _getPlayCallArray(call: string): string[] {
	const playCallArray = call.split('.')
	return playCallArray
}

function _playCallSyntaxErrorMsg(pc: playCall, name: string): string {
	const msg = `invalid ${name} string from: ${pc.toString()}`
	return msg
}

function _getObjValueFromName(obj: object, name: string): playCallFunction {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
}

function _getPlayCallFunction(pc: playCall) {
	const p = play()

	const base = _getObjValueFromName(p, pc.base)
	if (!base) {
		const err = _playCallSyntaxErrorMsg(pc, 'base')
		throw new SyntaxError(err)
	}

	const module = _getObjValueFromName(base, pc.module)
	if (!module) {
		const err = _playCallSyntaxErrorMsg(pc, 'module')
		throw new SyntaxError(err)
	}

	const f = _getObjValueFromName(module, pc.function)
	if (!f) {
		const err = _playCallSyntaxErrorMsg(pc, 'function')
		throw new SyntaxError(err)
	}

	return f
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

function _runPlayCall(call: string): any {
	const pc = _hewPlayCall(call)
	const fn = _getPlayCallFunction(pc)
	const ret = fn()
	return ret
}

function runPlayCall(call: string): any {
	return _runPlayCall(call)
}

export default runPlayCall