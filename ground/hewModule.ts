/**
 * hewModule.ts
 */

import error from 'error'

function getObjValueFromName(obj: object, name: string): CallFlowFn {
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
		callFlow.module = getObjValueFromName(callFlow.module, target)
		// validate
		if (!callFlow.module) {
			const msg = error.msg.syntax.hewModule(callFlowStr, cfArray, target)
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

function hewModule(callFlowStr: string, cfArray: string[], module: object) {
	return _hewModule(callFlowStr, cfArray, module)
}

export default hewModule
export { getObjValueFromName }