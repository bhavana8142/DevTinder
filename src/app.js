const express = require("express");
const mongoDB = require("./config/database")


const cookieparser = require("cookie-parser")

const app = express();
app.use(express.json())
app.use(cookieparser())
const authRouter = require("./routes/profile")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")



app.use("/", authRouter, (req, res) => { })
app.use("/", profileRouter, (req, res) => { })
app.use("/", requestRouter, (req, res) => { })



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








