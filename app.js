const express = require("express");
const utils = require("./utils");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Ni Bank");
});

app.get("/users", (req, res) => {
    const users = utils.showAll();
    res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
    const response = utils.showUser(req.params.id);
    if (typeof response === "string") {
        res.status(400).send(response);
    }
    res.status(200).send(response);
});

app.post("/users", (req, res) => {
    args = req.body;
    const response = utils.create(args.id, args.cash, args.credit);
    if (typeof response === "string") {
        res.status(400).send(response);
    }
    res.status(201).send(
        `User with ID "${response.id}", cash "${response.cash}" and credit "${response.credit}" created.`
    );
});

app.put("/users", (req, res) => {});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listentinig to port: ${PORT}`);
});
