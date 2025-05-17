/**
 * playCall.ts
 */

import play from '../play/play'

/**
 * in the scope of the playground project, the source of calls is "play/" directory
 * "play" "call"
 */

type CallFlowFn = (...params: any) => any

function _getModuleBase(): object {
	const base = play()
	return base
}

function _getObjValueFromName(obj: object, name: string): CallFlowFn {
	const index = Object.keys(obj).indexOf(name)
	const val = Object.values(obj)[index]
	return val
}

function _callFlow(callFlowStr: string): any {
	// make call

	// get source (context)
	const base = {
		src: _getModuleBase(),
		module: _getModuleBase()
	}
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
				base.module = _getObjValueFromName(base.module, target)
				//source = source[cfArray[i]]
			}
		}
		// call function
		if (fnName) {
			const fn = _getObjValueFromName(base.module, fnName)
			return fn()
		}
	}
}

function callFlow(callFlowStr: string): any {
	return _callFlow(callFlowStr)
}

export default callFlow