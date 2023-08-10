import register from './registry'


export function whoami(state, params) {
    // TODO: get username from session
    return 'anonymous'
}


register('whoami', whoami)

