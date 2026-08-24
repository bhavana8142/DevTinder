const express = require("express");
const mongoDB = require("./config/database")
const bcrypt = require("bcrypt")
const validator = require("validator")

const app = express();
const { adminAuth, userAuth } = require("./middleware/auth")
const User = require("./models/user")
const { validationSignUpData } = require("./utils/validation")

app.use(express.json())


app.post("/signup", async (req, res) => {








    try {
        //validation of Data 
        validationSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body
        // Encrypt password
        const passwordHash = await bcrypt.hash(password, 10)
        //create instance for user model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })


        await user.save()
        res.send("data Saved succesfully")
    }
    catch (err) {
        if (err.code === 110) {
            return res.status(400).send("Email already exists")

        }
        res.status(500).send("ERROR:" + err.message)
    }


})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        if (!validator.isEmail(emailId)) {
            throw new Error("Email is not valid")
        }
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid credentials")
        }
        const isPasswordVaild = await bcrypt.compare(password, user.password)
        if (!isPasswordVaild) {
            throw new Error("Invalid credentiales")
        } else {
            res.send("logged succesfully")
        }

    }
    catch (err) {
        res.status(500).send("ERROR:" + err.message)
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

        const ALLOW_UPDATES = ["userId", "photoUrl", "age", "skills", "about"]
        const isAllowUpdates = Object.keys(data).every((k) => ALLOW_UPDATES.includes(k))
        if (!isAllowUpdates) {
            res.status(400).send("update not Allowed")
        }
        if (data.skills.length > 10) {
            res.status(400).send("more than 10 skillsdoesn't allow ")
        }


        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true
        })
        res.send(user)

    } catch (err) {
        res.status(500).send("user couldn't find" + err.message)
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
    console.error("Database connection failed:", err)
})








