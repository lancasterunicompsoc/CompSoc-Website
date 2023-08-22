import register, { CommandHandler, Params, State } from './registry'

import { whoami } from './session'


interface Entry {
    name: string,
    children?: ChildFactory,
}

type ChildFactory = (state: State) => Entry[]

const makeHomeDir = (name: string): Entry => ({
    name,
    children: (_: State) => [
        {
            name: 'events',
            children: (_: State) => [ /* TODO: get events for user */ ]
        }
    ]
})

const fileTree: Entry = {
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

function resolvePath(state: State, path?: string): string {
    let fullPath
    if (path === undefined)
        fullPath = cwd(state, [])
    else if (path.startsWith('/'))
        fullPath = path
    else
        fullPath = cwd(state, []) + '/' + path
    return normalizePath(state, fullPath)
}

function findDirectory(state: State, path: string): Entry | null {
    if (path === '/')
        return fileTree

    const parts = normalizePath(state, path).split('/').splice(1)
    let dir = fileTree
    for (const part of parts) {
        if (dir.children === undefined)
            return null

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

const exists = (state: State, path: string): boolean => findDirectory(state, path) !== null


export const cwd = (state: State, _: Params): string => {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    return getOrDefault(filesystem_state, 'cwd', userHome(state))
}

const cd: CommandHandler = (state, params) => {
    const filesystem_state = getOrDefault(state, 'filesystem', {})
    const path = resolvePath(state, params[0])
    if (!exists(state, path))
        return `Cannot cd to ${path}: directory does not exist`
    filesystem_state.cwd = path
}

const ls: CommandHandler = (state, params) => {
    const path = resolvePath(state, params[0])
    const item = findDirectory(state, path)
    if (item === null)
        return `Cannot access '${path}': no such file or directory`

    if (item.children === undefined)
        return path

    const children = item.children(state)
    return children.map(child => child.name).join('    ')
}


register('cd', cd)
register('cwd', cwd)
register('ls', ls)

