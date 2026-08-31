const express = require("express")
const { userAuth } = require("../middleware/auth")
const validateEditProfie = require("../utils/validation")
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res) => {


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
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfie) {
            throw new Error(" Invalid edit request")
        }
        else {
            const loggedInUser = req.User
            Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])
            await loggedInUser.save()
            res.json({
                message: `${loggedInUser.firstName} updated successfully`,
                data: loggedInUser


            })
        }


    }
    catch (err) {
        res.status(500).send("Error:" + err.message)
    }
})

module.exports = profileRouter 