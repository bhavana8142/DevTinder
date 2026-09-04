const express = require("express")
const { userAuth } = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.User._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        const allowedStatus = ["ignored", "interested"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type :" + status,
            })
        }
        const toUser = await User.findById(toUserId)
        if (!toUser) {
            return res.status(404).json({ message: "User not found" })
        }
        // if there is existing connection request 
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }]
        })
        if (existingRequest) {
            return res.status(400).json({
                message: "Connection request already exists between these users",

            })

        }

        const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status })
        const data = await connectionRequest.save()
        res.json({
            message: status === "interested" ? `${req.User.firstName} is interested in connecting with ${toUser.firstName}.` : `${req.User.firstName} ignored ${toUser.firstName}'s connection request.`,
            data

        })





    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})



module.exports = requestRouter 