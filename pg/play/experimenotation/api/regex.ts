/**
 * regex.ts
 */

function imports() {
    console.log('imports\n')
    const importsString =
    `
    import config from '@test/config'
    import { test, test1, test2 } from '@test/test'
    import jsonData from '.../dir/dir/test.json' assert { type: 'json' }
    import apiObj from 'node:apiModule'
    `
    console.log('original imports string:')
    console.log(importsString)

    const regex = /\'\@/mgi
    const newString = importsString.replaceAll(regex, '\'./')

    console.log('imports string after applying regex:')
    console.log(newString)
}

export { imports }
