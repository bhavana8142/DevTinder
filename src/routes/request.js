const express = require("express")
const { userAuth } = require("../middleware/auth")

const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("send connection request")
    const user = req.User
    res.send(user.firstName + " connection request sent")
})

module.exports = requestRouter 