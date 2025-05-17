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

function _hewCallStrArray(srcCallStr: string): string[] {
	const callArray = srcCallStr.split('.')
	return callArray
}

function _callSyntaxErrorMsg(pc: SrcCall, name: string): string {
	const msg = `invalid ${name} string from: ${pc.toString()}`
	return msg
}

function _getObjValueFromName(obj: object, name: string): SrcCallFn {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
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

function _isValidCallStr(pc: SrcCall): boolean {
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

function _hewSrcCall(srcCallStr: string): SrcCall {
	const pcA = _hewCallStrArray(srcCallStr)
	const srcCall: SrcCall = {
		toString: () => { return `${pcA[0]}.${pcA[1]}.${pcA[2]}` },
		base: pcA[0] ?? '',
		module: pcA[1] ?? '',
		function: pcA[2] ?? ''
	}
	return srcCall
}

function _getCallFunction(srcCallStr: string): any {
	const p = play()

	// get src call
	const srcCall = _hewSrcCall(srcCallStr)
	// validate src call
	if (_isValidCallStr(srcCall)) {

		// iterate src call object to get call function
		const base = _getObjValueFromName(p, srcCall.base)
		const module = _getObjValueFromName(base, srcCall.module)
		const fn = _getObjValueFromName(module, srcCall.function)

		return fn
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