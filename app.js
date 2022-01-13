const express = require("express");
const utils = require("./utils");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Ni Bank");
});

app.get("/users", (req, res) => {
    res.send("Showing all users");
});

app.get("/user/:id", (req, res) => {
    res.send("showing a user");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listentinig to port: ${PORT}`);
});
