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








