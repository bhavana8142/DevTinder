const express = require("express")

const app = express()






app.get("/user", (req, res) => {
    console.log(req.query)
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