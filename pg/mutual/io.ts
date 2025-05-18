/**
 * io.ts
 */

enum STDLVL {
	IN,
	OUT,
	ERR
}

interface Emitter {
	set: string
	reset: string
}

async function _hewEmitter():Promise<Emitter> {
	// init return
	const emitter: Emitter = { set: '', reset: ''}
	// create proc to set terminal foreground
	const set = Bun.spawn(['tput', 'setaf', '1'])
	// create proc to reset terminal properties
	const reset = Bun.spawn(['tput', 'sgr0'])
	// get emitter text values
	const setColor = await new Response(set.stdout).text()
	const resetColor = await new Response(reset.stdout).text()
	// set return vals
	emitter.set = setColor
	emitter.reset = resetColor
	return emitter
}

async function _applyEmitter(lambda: (...params: any) => {}, ...params: any) {
	// get emitter
	const emitter = await _hewEmitter()
	// update msg string with emitter values
	const lastIndex = params.length - 1
	const error = { msg: params[lastIndex] }
	error.msg = `${emitter.set}${error.msg}${emitter.reset}`
	params[lastIndex] = error.msg
	// run lambda
	lambda(...params)
}

function _writeStd(msg: string, stdLvl: number) {
	switch (stdLvl) {
		case STDLVL.IN:
			break;
		case STDLVL.OUT:
			break;
		case STDLVL.ERR:
			_applyEmitter(Bun.write, Bun.stderr, msg)
			break;
	}
}

async function _writeError(msg: string) {
	_writeStd(msg, STDLVL.ERR)
}

const io = {
	std: {
		err: (msg: string) => {
			_writeError(msg)
		}
	}
}

export default io