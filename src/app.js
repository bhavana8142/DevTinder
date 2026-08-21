const express = require("express")

const app = express()
/*
        app.use("/user", (req, res) => {
    res.send('use function')
})

*/
app.get("/user", (req, res) => {
    res.send({ firstName: "Bhavana", lastName: "Battu" })
})
app.post("/user", (req, res) => {
    res.send("data Saved successfully")
})
app.delete("/user", (req, res) => {
    res.send("Data deleted successfully")
})


app.listen(3000, () => {
    console.log("server is started successfully")

})