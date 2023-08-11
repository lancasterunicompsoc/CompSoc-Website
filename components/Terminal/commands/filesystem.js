import register from './registry'

import { whoami } from './session'


const makeHomeDir = name => ({
    name,
    children: _ => [
        {
            name: 'events',
            children: _ => [ /* TODO: get events for user */ ]
        }
    ]
})

const fileTree = {
    name: '/',
    children: () => [
        {
            name: 'home',
            children: state => {
                const iAm = whoami(state)
                const children = [
                    makeHomeDir(iAm)
                ]
                if (iAm !== 'anonymous')
                    children.push(makeHomeDir('anonymous'))
                return children
            }
        }
    ]
}


function getOrDefault(obj, name, def) {
    if (!obj.hasOwnProperty(name))
        obj[name] = def
    return obj[name]
}


const userHome = state => `/home/${whoami(state)}`


function normalizePath(state, path) {
    const parts = path.split('/')
    let normalizedParts = []

    for (const part of parts) {
        switch (part) {
            case '':
            case '.': continue
            case '..': normalizedParts.pop(); break
            case '~': normalizedParts = ['/home', whoami(state)]; break
            default: normalizedParts.push(part)
        }
    }

    let normalizedPath = normalizedParts.join('/')
    if (path.startsWith('/') && !normalizedPath.startsWith('/'))
        normalizedPath = '/' + normalizedPath

    return normalizedPath
}

function findDirectory(state, path) {
    if (path === '/')
        return fileTree

    const parts = path.split('/').splice(1)
    let dir = fileTree
    for (const part of parts) {
        let found = false
        for (const child of dir.children(state))
            if (child.name === part) {
                dir = child
                found = true
                break
            }
        if (!found)
            return null
    }
    return dir
}

const exists = (state, path) => findDirectory(state, path) !== null


export function cwd(state) {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    return getOrDefault(filesystem_state, 'cwd', userHome(state))
}

function cd(state, params) {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    let basePath
    if (params[0] === undefined)
        basePath = cwd(state)
    else if (params[0].startsWith('/'))
        basePath = params[0]
    else
        basePath = cwd(state) + '/' + params[0]
    const path = normalizePath(state, basePath)
    if (!exists(state, path))
        return `Cannot cd to ${path}: directory does not exist`
    filesystem_state.cwd = path
}

function ls(state, params) {
    let basePath
    if (params[0] === undefined)
        basePath = cwd(state)
    else if (params[0].startsWith('/'))
        basePath = params[0]
    else
        basePath = cwd(state) + '/' + params[0]
    const path = normalizePath(state, basePath)
    const item = findDirectory(state, path)
    if (item === null)
        return `Cannot access '${path}': no such file or directory`
    const children = item.children(state)
    return children.map(child => child.name).join('    ')
}


register('cd', cd)
register('cwd', cwd)
register('ls', ls)

