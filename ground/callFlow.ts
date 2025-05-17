/**
 * playCall.ts
 */

import play from '../play/play'

/**
 * in the scope of the playground project, the source of calls is "play/" directory
 * "play" "call"
 */

type CallFlow = {
	toString: () => string
	base: string
	module: string
	function: string
}

type CallFlowFn = (...params: any) => any

function _getSrc(): object {
	const src = play()
	return src
}

function _hewCallFlowArray(callFlowStr: string): string[] {
	const cfArray = callFlowStr.split('.')
	return cfArray
}

function _callSyntaxErrorMsg(callFlow: CallFlow, name: string): string {
	const msg = `invalid ${name} string from: ${callFlow.toString()}`
	return msg
}

function _getObjValueFromName(obj: object, name: string): CallFlowFn {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
}

function _isValidCallFlow(callFlow: CallFlow): boolean {
	return true
}

function _hewCallFlow(callFlowStr: string): CallFlow {
	const cfArray = _hewCallFlowArray(callFlowStr)
	const callFlow: CallFlow = {
		toString: () => { return `${cfArray[0]}.${cfArray[1]}.${cfArray[2]}` },
		base: cfArray[0] ?? '',
		module: cfArray[1] ?? '',
		function: cfArray[2] ?? ''
	}
	return callFlow
}

function _getCallFlowFn(callFlowStr: string): CallFlowFn {
	// get source
	const src = _getSrc()
	// validate source
	if (src) {
		// get src call
		const callFlow = _hewCallFlow(callFlowStr)
		// validate src call
		if (_isValidCallFlow(callFlow)) {

			// iterate src call object to get call function
			// get base
			const base = _getObjValueFromName(src, callFlow.base)
			// validate base, throw error if necessary
			// get module
			const module = _getObjValueFromName(base, callFlow.module)
			// validate module, throw error if necessary
			// get call function
			const fn = _getObjValueFromName(module, callFlow.function)
			// validate call function, throw error if necessary
			// return fn
			return fn
		} else {
			throw new SyntaxError(`invalid src call string: ${callFlow.toString()}`)
		}
	} else {
		throw new Error('internal error, invalid src: ' + src)
	}
}

function _hewCall(callFlowStr: string): CallFlowFn {
	const fn = _getCallFlowFn(callFlowStr)
	// return call
	return fn
}

function _callFlow(callFlowStr: string): any {
	// use the rest of this just to verify call
	const fn = _hewCall(callFlowStr)

	// make call

	// get source (context)
	const module = { src: _getSrc() }
	// build call chain array
	const cfArray = _hewCallFlowArray(callFlowStr)
	if (cfArray) {
		// get function call from end of array
		const func = cfArray.pop()
		// rebuild module object
		for (let i = 0; i < cfArray.length; i++) {
			// get target name from call chain array
			const target = cfArray[i]
			// validate target
			if (target) {
				// get index from source object
				module.src = _getObjValueFromName(module.src, target)
				//source = source[cfArray[i]]
			}
		}
		console.log(module)
		// call function
		if (func) {
			const fnx = _getObjValueFromName(module.src, func)
			return fnx()
		}
	}
}

function callFlow(callFlowStr: string): any {
	return _callFlow(callFlowStr)
}

export default callFlow