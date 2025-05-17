/**
 * playCall.ts
 */

import { theBasics } from 'play/experimenotation/api/types'
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
			// get base
			const base = _getObjValueFromName(src, srcCall.base)
			// validate base, throw error if necessary
			// get module
			const module = _getObjValueFromName(base, srcCall.module)
			// validate module, throw error if necessary
			// get call function
			const fn = _getObjValueFromName(module, srcCall.function)
			// validate call function, throw error if necessary
			// return fn
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
	// use the rest of this just to verify call
	const fn = _hewCall(srcCallStr)

	// make call

	// get source (context)
	let source = _getSrc()
	// build call chain array
	const callChainArray = srcCallStr.split('.')
	if (callChainArray) {
		// get function call from end of array
		const func = callChainArray.pop()
		// rebuild module object
		for (let i = 0; i < callChainArray.length; i++) {
			// get target name from call chain array
			const target = callChainArray[i]
			// validate target
			if (target) {
				// get index from source object
				source = _getObjValueFromName(source, target)
				//source = source[callChainArray[i]]
			}
		}
		// call function
		if (func) {
			const fnx = _getObjValueFromName(source, func)
			return fnx()
		}
	}
}

function runCall(srcCallStr: string): any {
	return _runCall(srcCallStr)
}

export default runCall