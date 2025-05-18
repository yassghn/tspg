/**
 * callFlow.ts
 */

import play from 'play'
import hewModule, { getObjValueFromName } from 'hewModule'
import error from 'error'

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

function _isValidCallFlowArray(cfArray: string[]): boolean {
	// cf array must have at least 2 elements
	if (cfArray.length >= 3) {
		// validate call flow array strings
		for (let i = 0; i < cfArray.length; i++) {
			// get string
			const str = cfArray[i]
			// cover a few basics
			if (!str || str == '.' || str == ' ') {
				// bad string
				return false
			}
		}
	} else {
		return false
	}
	// return valid
	return true
}

function _hewCallFlowArray(callFlowStr: string): string[] {
	const cfArray = callFlowStr.split('.')
	if (!_isValidCallFlowArray(cfArray)) {
		const msg = error.msg.syntax.hewCallFlowArray(callFlowStr)
		throw new SyntaxError(msg)
	}
	return cfArray
}

function _linkCallFlow(callFlowStr: string, callFlow: CallFlow) {
	// build call chain array
	const cfArray = _hewCallFlowArray(callFlowStr)
	if (cfArray) {
		// get function name from end of array
		const fnName = cfArray.pop()
		// hew module
		callFlow.module = hewModule(callFlowStr, cfArray, callFlow.module)
		// call function
		if (fnName) {
			const fn = getObjValueFromName(callFlow.module, fnName)
			if (fn) {
				callFlow.fn = fn
			} else {
				const msg = error.msg.syntax.linkCallFlow(callFlowStr, fnName)
				throw new SyntaxError(msg)
			}
		}
	} else {
		throw new SyntaxError('invalid call flow string: ' + callFlowStr)
	}
}

function _hewCallFlowContext(): CallFlow {
	const callFlow: CallFlow = {
		base: _getModuleBase(),
		module: _getModuleBase(),
		fn: () => { }
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