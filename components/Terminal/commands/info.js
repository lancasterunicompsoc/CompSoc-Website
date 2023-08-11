import register from './registry'

function echo(_, params) {
    return params.join(' ')
}


function info(_, params) {
    let target = params.join(' ')
    switch (target.toLowerCase()) {
        case 'compsoc':
        case 'lucompsoc':
        case 'computer science society':
            return 'Lancaster University Computer Science Society exists to promote interest in computing and technology among students and wider society.'

        case 'lu':
        case 'lancaster university':
            return 'Lancaster University is a collegiate university 3 miles south of Lancaster.'

        default:
            return `Could not find information for \`${target}\`. Try \`info compsoc\``
    }
}


register('echo', echo)
register('info', info)

