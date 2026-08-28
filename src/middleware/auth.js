const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req, res, next) => {

    try {
        const cookies = req.cookies
        const { token } = cookies
        console.log(token)
        if (!token) {
            throw new Error("token is expiries")
        }
        const decodedObj = jwt.verify(token, "Dev@Tinder570")
        const { _id } = decodedObj
        const user = await User.findById(_id)
        console.log(user)
        if (!user) {
            throw new Error("User is not verified")
        }
        req.User = user
        next()
    }
    catch (err) {
        res.status(500).send("ERROR:" + err.message)

    }



}
module.exports = { userAuth }