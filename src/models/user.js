const mongoose = require('mongoose')
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50

    },
    lastName: {
        type: String

    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email address : " + value)
            }
        }

    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter strong password :" + value)
            }
        }



    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("gender is not valid")
            }
        }
    },
    description: {
        type: String,

    },
    photoUrl: {
        type: String,
        default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid photo Url Address :" + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is the  default about of user"
    },
    skills: {
        type: [String]
    },
}, { timestamps: true })
userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder570", { expiresIn: "7d" })
    return token

}
userSchema.methods.passwordValidation = async function (passwordByUserInput) {
    const user = this
    const passwordHash = user.password
    const isPasswordValidation = await bcrypt.compare(passwordByUserInput, passwordHash)
    return isPasswordValidation

}


module.exports = mongoose.model("User", userSchema)