/**
 * playCall.ts
 */

import play from '../play/play'

/**
 * in the scope of the playground project, the source of calls is "play/" directory
 * "play" "call"
 */

type CallFlowFn = (...params: any) => any

type CallFlow = {
	base: object
	module: object
	fn: CallFlowFn
}

function _getModuleBase(): object {
	const base = play()
	return base
}

function _getObjValueFromName(obj: object, name: string): CallFlowFn {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
}

function _linkCallFlow(callFlowStr: string, callFlow: CallFlow) {
	// build call chain array
	const cfArray = callFlowStr.split('.')
	if (cfArray) {
		// get function name from end of array
		const fnName = cfArray.pop()
		// rebuild module object
		for (let i = 0; i < cfArray.length; i++) {
			// get target name from call chain array
			const target = cfArray[i]
			// validate target
			if (target) {
				// get index from source object
				callFlow.module = _getObjValueFromName(callFlow.module, target)
				//source = source[cfArray[i]]
			}
		}
		// call function
		if (fnName) {
			const fn = _getObjValueFromName(callFlow.module, fnName)
			callFlow.fn = fn
		}
	}
}

function _hewCallFlowContext(): CallFlow {
	const callFlow: CallFlow = {
		base: _getModuleBase(),
		module: _getModuleBase(),
		fn: () => {}
	}
	return callFlow
}

function _hewCallFlow(callFlowStr: string): CallFlow {
	// hew call flow object
	const callFlow = _hewCallFlowContext()
	// link call flow function
	_linkCallFlow(callFlowStr, callFlow)
	// return
	return callFlow
}

function _callFlow(callFlowStr: string): any {
	// hew call flow object
	const callFlow = _hewCallFlow(callFlowStr)
	// run call
	const ret = callFlow.fn()
	return ret
}

function callFlow(callFlowStr: string): any {
	return _callFlow(callFlowStr)
}

export default callFlow