# rgx

    - rgx

app.get(/.\*fly$/, (req, res) => {

    res.send({ firstName: "Bhavana", lastName: "Battu" })

})

# complex dynamic routes

app.get("/user/:usedId/:name/:age", (req, res) => {
console.log(req.params)
res.send({ firstName: "Bhavana", lastName: "Battu" })
})

# dynamic routes

app.get("/user/:usedId", (req, res) => {
console.log(req.params)
res.send({ firstName: "Bhavana", lastName: "Battu" })
})

# query

app.get("/user", (req, res) => {
console.log(req.query)
res.send({ firstName: "Bhavana", lastName: "Battu" })
})

# use handler

        app.use("/user", (req, res) => {
    res.send('use function')

})

# array

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
app.get("/user", (req, res) => {
console.log(req.query)
res.send({ firstName: "Bhavana", lastName: "Battu" })
})

app.post("/user", (req, res) => {
res.send("data Saved successfully")
}) app.delete("/user", (req, res) => {
res.send("Data deleted successfully")
})
