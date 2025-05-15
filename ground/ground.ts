/**
 * ground.ts
 *
 * put things together from play
 */

import play from '../play/play'
import playCall from 'playCall'

function _processPlayCall(call: string) {
	// get play call array
	const pc = playCall(call)
	return pc
}

function _playCallSyntaxErrorMsg(pc: playCall, name: string): string {
	const msg = `invalid ${name} string from: ${pc.toString()}`
	return msg
}

function _runPlayCall(pc: playCall) {
	const p = play()

	const baseIndex = Object.keys(p).indexOf(pc.base)
	const base = Object.values(p)[baseIndex]
	if (!base) {
		const err = _playCallSyntaxErrorMsg(pc, 'base')
		throw new SyntaxError(err)
	}

	const moduleIndex = Object.keys(base).indexOf(pc.module)
	const module = Object.values(base)[moduleIndex]
	if (!module) {
		const err = _playCallSyntaxErrorMsg(pc, 'module')
		throw new SyntaxError(err)
	}

	const functionIndex = Object.keys(module).indexOf(pc.function)
	const f = Object.values(module)[functionIndex]
	if (!f) {
		const err = _playCallSyntaxErrorMsg(pc, 'function')
		throw new SyntaxError(err)
	}

	f()
}

function _ground(call: string) {
	// process play call
	const pc = _processPlayCall(call)
	_runPlayCall(pc)
}

function ground(call: string) {
	_ground(call)
}

export default ground