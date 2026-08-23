const express = require("express");
const mongoDB = require("./config/database")

const app = express();
const { adminAuth, userAuth } = require("./middleware/auth")
const User = require("./models/user")

app.use(express.json())


app.post("/signup", async (req, res) => {
    console.log(req.body)

    const user = new User(req.body)
    try {
        await user.save()
        res.send("data Saved succesfully")
    }
    catch (err) {
        res.status(500).send("data not saves", err.message)
    }


})

// get user by email 
app.get("/user", async (req, res) => {
    const userId = req.body._id
    try {
        const users = await User.findById(userId)

        if (users.length === 0) {
            res.status(500).send("users not found")
        }
        else {
            res.send(users)
        }

    } catch (err) {
        res.status(404).send("somwthing went wrong")
    }

})
// get data base feed data 
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({})

        if (users.length === 0) {
            res.status(500).send("users not found")
        }
        else {
            res.send(users)
        }

    } catch (err) {
        res.status(404).send("somwthing went wrong")
    }

})
// delete the user from db 
app.delete("/user", async (req, res) => {

    const userId = req.body.userId
    try {
        await User.findByIdAndDelete(userId)
        res.send("user delted succesfully")

    } catch (err) {
        res.status(500).send("user couldn't find")

    }

})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data = req.body
    try {
        const user = await User.findByIdAndUpdate(userId, data)
        res.send(user)

    } catch (err) {
        res.status(500).send("user couldn't find")
    }
})





mongoDB().then(
    () => {
        console.log("database is connected successfully")

        app.listen(3000, () => {
            console.log("server is started successfully");
        });
    }
).catch(err => {
    console.error("data base is connected")
})








