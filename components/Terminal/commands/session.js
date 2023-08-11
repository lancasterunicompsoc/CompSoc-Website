import register from './registry'


export function whoami(state, params) {
    // TODO: get username from session
    return 'anonymous'
}

function join(state, params) {
    // TODO: perform redirect
    return 'Redirecting to join page...'
}


register('whoami', whoami)
register('join', join)

