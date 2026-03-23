


export const setStorage = (data: LOGIN_RESPONCE) => {
    if (typeof window === "undefined") {
        return
    }
    localStorage.setItem("ADMIN", JSON.stringify(data.result))

}
export const getStorage = () => {
    if (typeof window === "undefined") {
        return
    }
    const data = JSON.parse(localStorage.getItem("ADMIN") as string)
    return data
}
export const removeStorage = () => {
    if (typeof window === "undefined") {
        return
    }
    const data = localStorage.removeItem("ADMIN")

    return data

}