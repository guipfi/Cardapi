export const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        user: user
    }
}

export const logoutUser = (user) => {
    return {
        type: "LOGOUT_USER",
        user: user
    }
}