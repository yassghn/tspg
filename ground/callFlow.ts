/**
 * callFlow.ts
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

const errorMsg = {
	syntax: {
		hewModule: (callFlowStr: string, cfArray: string[], target: string): string => {
			const error = { msg: '' }
			error.msg += 'invalid call flow: '
			error.msg += `"${callFlowStr}"`
			error.msg += ' '
			error.msg += `<${cfArray.join('.')}>`
			error.msg += ' '
			error.msg += `->${target}<-`
			return error.msg
		}
	}
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

function _hewNextModule(callFlowStr: string, cfArray: string[], index: number, module: object): object {
	// init return
	const callFlow = { module: { ...module } }
	// get target name from call chain array
	const target = cfArray[index]
	// validate target
	if (target) {
		// get index from source object
		callFlow.module = _getObjValueFromName(callFlow.module, target)
		// validate
		if (!callFlow.module) {
			const msg = errorMsg.syntax.hewModule(callFlowStr, cfArray, target)
			throw new SyntaxError(msg)
		}
	}
	// return module
	return callFlow.module
}

function _hewModule(callFlowStr: string, cfArray: string[], module: object): object {
	// init return
	const callFlow = { module: { ...module } }
	// rebuild module object
	for (let i = 0; i < cfArray.length; i++) {
		callFlow.module = _hewNextModule(callFlowStr, cfArray, i, callFlow.module)
	}
	// return
	return callFlow.module
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
		const error = { msg: '' }
		error.msg += 'invalid call flow string from: '
		error.msg += `"${callFlowStr}"`
		throw new SyntaxError(error.msg)
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
		callFlow.module = _hewModule(callFlowStr, cfArray, callFlow.module)
		// call function
		if (fnName) {
			const fn = _getObjValueFromName(callFlow.module, fnName)
			if (fn) {
				callFlow.fn = fn
			} else {
				const error = { msg: '' }
				error.msg += 'invalid function name'
				error.msg += ' '
				error.msg += `"${fnName}"`
				error.msg += ' '
				error.msg += 'from: '
				error.msg += callFlowStr
				throw new Error(error.msg)
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