
const registry = {}

export default function register(name, handler) {
    registry[name] = handler
}

export function get_command(name) {
    return registry[name]
}

