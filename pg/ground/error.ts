/**
 * error.ts
 */

// error message
const msg = {
	// syntax errors
	syntax: {
		//_linkCallFlow
		linkCallFlow: (callFlowStr: string, fnName: string) => {
			const error = { msg: '' }
			error.msg += 'invalid function name'
			error.msg += ' '
			error.msg += `"${fnName}"`
			error.msg += ' '
			error.msg += 'from:'
			error.msg += ' '
			error.msg += callFlowStr
			return error.msg
		},

		//_hewCallFlowArray
		hewCallFlowArray: (callFlowStr: string) => {
			const error = { msg: '' }
			error.msg += 'invalid call flow string from:'
			error.msg += ' '
			error.msg += `"${callFlowStr}"`
			return error.msg
		},

		//_hewModule
		hewModule: (callFlowStr: string, cfArray: string[], target: string): string => {
			const error = { msg: '' }
			error.msg += 'invalid call flow'
			error.msg += ' '
			error.msg += `->${target}<-`
			error.msg += ' '
			error.msg += `"${cfArray.join('.')}"`
			error.msg += ' '
			error.msg += 'from:'
			error.msg += ' '
			error.msg += `"${callFlowStr}"`
			return error.msg
		}
	}
}

const error = {
	msg: msg
}

export default error