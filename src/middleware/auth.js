const adminAuth = (req, res, next) => {
    console.log("checking admin authorization")
    const token = "xyz"
    const isAuthorization = token === "xyz"
    if (!isAuthorization) {
        res.status(404).send("admin not authorized")
    }
    else {
        console.log("successfully authorized")
        next()
    }
}


const userAuth = (req, res, next) => {
    console.log("checking user authorization")
    const token = "abc"
    const isAuthorization = token === "abc"
    if (!isAuthorization) {
        res.status(404).send("user not authorized")
    }
    else {
        console.log("successfully authorized")
        next()
    }

}
module.exports = { adminAuth, userAuth }