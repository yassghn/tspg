/**
 * play.ts
 *
 * place of experimenotation
 */

import api from './experimenotation/api'
import scratchpad from './experimenotation/scratchpad'

function _play() {
	const play = {
		api: api,
		scratchpad: scratchpad
	}
	return play
}

function play() {
	return _play()
}

export default play