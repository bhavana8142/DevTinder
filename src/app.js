const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middleware/auth")













app.listen(3000, () => {
    console.log("server is started successfully");
});
