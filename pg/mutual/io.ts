/**
 * io.ts
 */

import { WriteStream } from 'fs'
import { styleText } from 'util'

enum STDLVL {
    IN,
    OUT,
    ERR
}

const colors = {
    red: 'red',
    default: 'default'
}

function _stdTypeColorInfer(stdLvl: STDLVL): any {
    // init return
    const infer = { color: '' }
    // infer color based on STDLVL
    switch (stdLvl) {
        case STDLVL.IN:
            infer.color += ''
            break
        case STDLVL.OUT:
            infer.color += ''
            break
        case STDLVL.ERR:
            infer.color += colors.red
            break
    }
    // return
    return infer.color
}

function _applyEmitter(std: WriteStream & any, stdLvl: STDLVL, str: string): string {
    const ret = { str: '' }
    const color = _stdTypeColorInfer(stdLvl)
    ret.str += styleText(color, str, { stream: std, validateStream: true })
    return ret.str
}

function echo(std: WriteStream & any, str: string) {
    Bun.write(std, str + '\n')
}

async function _writeError(msg: string) {
    const emittedStr = _applyEmitter(Bun.stderr, STDLVL.ERR, msg)
    echo(Bun.stderr, emittedStr)
}

const io = {
    std: {
        err: (msg: string) => {
            _writeError(msg)
        }
    }
}

export default io
