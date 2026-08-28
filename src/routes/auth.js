const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const validator = require("validator")
const { validationSignUpData } = require("../utils/validation")

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {

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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter
