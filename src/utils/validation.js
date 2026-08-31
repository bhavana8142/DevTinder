const validator = require("validator")

const validationSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body
    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid")

    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong password")
    }
}
const validateEditProfile = (req) => {
    const alloweEditFields = ["firstName", "lastName", "emailId", "photoUrl", "skills", "about"]
    const isEditAllowed = Object.keys(req.body).every((field) => alloweEditFields(field))
    return isEditAllowed

}
module.exports = { validationSignUpData, validateEditProfile }