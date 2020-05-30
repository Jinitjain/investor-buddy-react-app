const auth = (state = false, action) => {
    switch (action.type) {
        case 'signIn':
            return true
        case 'signOut':
            return false
        default:
            return false
    }
}

export default auth