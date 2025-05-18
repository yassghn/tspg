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

async function _writeStd(msg: string, stdLvl: number) {
	switch (stdLvl) {
		case STDLVL.IN:
			break;
		case STDLVL.OUT:
			break;
		case STDLVL.ERR:
			const e = await _hewEmitter()
			Bun.write(Bun.stderr, e.set + msg + e.reset)
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