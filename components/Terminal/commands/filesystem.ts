import register, { CommandHandler, Params, State } from './registry'

import { whoami } from './session'


const makeHomeDir = (name: string) => ({
    name,
    children: (_: State) => [
        {
            name: 'events',
            children: (_: State) => [ /* TODO: get events for user */ ]
        }
    ]
})

const fileTree = {
    name: '/',
    children: (_: State) => [
        {
            name: 'home',
            children: (state: State) => {
                const iAm = whoami(state, [])
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


function getOrDefault<T>(obj: { [key: string]: T }, name: string, def: T): T {
    if (!obj.hasOwnProperty(name))
        obj[name] = def
    return obj[name]
}


const userHome = (state: State) => `/home/${whoami(state, [])}`


function normalizePath(state: State, path: string): string {
    const parts = path.split('/')
    let normalizedParts: string[] = []

    for (const part of parts) {
        switch (part) {
            case '':
            case '.': continue
            case '..': normalizedParts.pop(); break
            case '~': normalizedParts = ['/home', whoami(state, [])]; break
            default: normalizedParts.push(part)
        }
    }

    let normalizedPath = normalizedParts.join('/')
    if (path.startsWith('/') && !normalizedPath.startsWith('/'))
        normalizedPath = '/' + normalizedPath

    return normalizedPath
}

function findDirectory(state: State, path: string) {
    if (path === '/')
        return fileTree

    const parts = normalizePath(state, path).split('/').splice(1)
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

const exists = (state: State, path: string) => findDirectory(state, path) !== null


export const cwd = (state: State, _: Params): string => {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    return getOrDefault(filesystem_state, 'cwd', userHome(state))
}

const cd: CommandHandler = (state, params) => {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    let basePath
    if (params[0] === undefined)
        basePath = cwd(state, [])
    else if (params[0].startsWith('/'))
        basePath = params[0]
    else
        basePath = cwd(state, []) + '/' + params[0]
    if (typeof basePath === 'undefined')
        throw new Error('Invalid state')
    const path = normalizePath(state, basePath)
    if (!exists(state, path))
        return `Cannot cd to ${path}: directory does not exist`
    filesystem_state.cwd = path
}

const ls: CommandHandler = (state, params) => {
    let basePath
    if (params[0] === undefined)
        basePath = cwd(state, [])
    else if (params[0].startsWith('/'))
        basePath = params[0]
    else
        basePath = cwd(state, []) + '/' + params[0]
    if (typeof basePath === 'undefined')
        throw new Error('Invalid state')
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

