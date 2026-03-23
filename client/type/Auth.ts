type LOGIN_REQUEST = {
    email: string
    password: string
}
type LOGIN_RESPONCE = {
    message: string,
    result: {
        _id: string
        name: string
        email: string
        password: string
        profilePic: string
        role: string
    }
}