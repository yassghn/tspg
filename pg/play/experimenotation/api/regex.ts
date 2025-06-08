/**
 * regex.ts
 */

function imports() {
    console.log('imports\n')
    const importsString = `
    import config from '@test/config'
    import { test, test1, test2 } from '@test/test'
    import jsonData from '.../dir/dir/test.json' assert { type: 'json' }
    import apiObj from 'node:apiModule'
    `
    console.log('original imports string:')
    console.log(importsString)

    const regex = /\'\@/gim
    const newString = importsString.replaceAll(regex, "'./")

    console.log('imports string after applying regex:')
    console.log(newString)
}

function importExts() {
    console.log('import extensions\n')
    const importsString = `
    import config from '@test/config'
    import { test, test1, test2 } from '@test/test'
    import jsonData from '.../dir/dir/test.json' assert { type: 'json' }
    import apiObj from 'node:apiModule'
    `
    console.log('original imports string:')
    console.log(importsString)

    const r = { regex: null as unknown as RegExp, newString: '' }
    r.regex = /'@/gim
    r.newString = importsString.replaceAll(r.regex, "'./")
    r.regex = /(?<=from\s'[\S].*)'/gim
    r.newString = r.newString.replaceAll(r.regex, ".js'")

    console.log('new imports string:')
    console.log(r.newString)
}

export { imports, importExts }
