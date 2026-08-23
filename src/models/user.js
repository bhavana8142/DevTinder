const mongoose = require('mongoose')

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
        trim: true
    },
    password: {
        type: String,
        required: true



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
        default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
    },
    about: {
        type: String,
        default: "This is the  default about of user"
    },
    skills: {
        type: [String]
    },
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)