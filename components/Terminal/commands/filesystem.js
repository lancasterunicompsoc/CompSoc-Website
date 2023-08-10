import register from './registry'

import { whoami } from './session'


function getOrDefault(obj, name, def) {
    if (!obj.hasOwnProperty(name))
        obj[name] = def
    return obj[name]
}


export function cwd(state) {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    return getOrDefault(filesystem_state, 'cwd', `/home/${whoami(state)}`)
}


function cd(state, params) {
    const path = cwd(state)
    return `current path ${path}`
}

function ls(state, params) {
    const basePath = cwd(state)
    const path = basePath + '/' + params[0]

    if (path === '~')
        return 'events'
}


register('cd', cd)
register('cwd', cwd)
register('ls', ls)

