const mongoose = require("mongoose")

const mongoDB = async () => {
    await mongoose.connect("mongodb+srv://battubhavanacse_db_user:neVf79U0BZmJ84vU@namastenode.jjyawrj.mongodb.net/devTinder")
}
module.exports = mongoDB





