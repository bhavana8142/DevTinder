const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middleware/auth")


app.use("/admin", adminAuth)
app.get("/user/login", (req, res) => {
    res.send("used loggedin")
})
app.use("/user", userAuth, (req, res) => {
    res.send("user Data")

})

app.get("/admin/getAllData", (req, res) => {
    res.send("send all the Data")
})
app.get("/admin/deleteData", (req, res) => {
    res.send("deleted alll the Data")
})


app.listen(3000, () => {
    console.log("server is started successfully");
});
