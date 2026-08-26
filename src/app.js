const express = require("express");
const mongoDB = require("./config/database")
const bcrypt = require("bcrypt")
const validator = require("validator")
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const app = express();
const { userAuth } = require("./middleware/auth")
const User = require("./models/user")
const { validationSignUpData } = require("./utils/validation")

app.use(express.json())
app.use(cookieparser())


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
        const isPasswordVaild = await user.passwordValidation(password)
        if (isPasswordVaild) {
            const token = await user.getJWT()




            res.cookie("token", token, { expiresIn: "1hr" }, { httpOnly: true })
            res.send("logged successfully")



        } else {
            throw new Error("Invalid credentiales")

        }

    }
    catch (err) {
        res.status(500).send("ERROR:" + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {
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
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("send connection request")
    const user = req.User
    res.send(user.firstName + " connection request sent")
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








