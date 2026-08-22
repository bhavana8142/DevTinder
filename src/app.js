const express = require("express");

const app = express();

app.use(
    "/user",
    [(req, res, next) => {
        console.log("user1");
        next()
        //res.send("response1");

    }],
    (req, res, next) => {
        console.log("user2");
        //res.send("response2");
        next()
    },
    (req, res) => {
        console.log("user3");
        res.send("response3");
    },
);

// app.get("/user", (req, res) => {
//     console.log(req.query)
//     res.send({ firstName: "Bhavana", lastName: "Battu" })
// })

// app.post("/user", (req, res) => {
//     res.send("data Saved successfully")
// })
// app.delete("/user", (req, res) => {
//     res.send("Data deleted successfully")
// })

app.listen(3000, () => {
    console.log("server is started successfully");
});
