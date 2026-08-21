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
