const express = require("express")
const { userAuth } = require("../middleware/auth")
const profileRouter = express.Router()
console.log("hello")
profileRouter.get("/profile", userAuth, async (req, res) => {


    try {


        const user = req.User
        if (!user) {
            throw new Error("user is not verified")
        }
        else {
            res.send(user)

        }

    }
    catch (err) {
        res.status(500).send("user couldn't find" + err.message)

    }


})

module.exports = profileRouter 