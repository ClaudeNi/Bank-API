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

app.put("/users", (req, res) => {
    args = req.body;
    let response;
    switch (args.action) {
        case "deposit":
            response = utils.deposit(args.id, args.money);
            if (response) {
                console.log("in");
                res.status(200).send(
                    `Deposited ${args.money}$ into the user with ID "${args.id}"`
                );
            }
            res.status(400).send(`Something went wrong.`);
            break;
        case "update":
            response = utils.update(args.id, args.money);
            if (response) {
                res.status(200).send(
                    `added ${args.money}$ to the credit balance for the user with ID "${args.id}"`
                );
            }
            res.status(400).send(`Something went wrong.`);
            break;
        case "withdraw":
            response = utils.withdraw(args.id, args.money);
            res.status(200).send(
                `Withdrew ${args.money} from user with ID "${args.id}"`
            );
            break;
        case "transfer":
            response = utils.transfer(args.id1, args.id2, args.money);
            res.status(200).send(
                `Transfered ${args.money}$ from user with ID "${args.id1}" to user with ID "${args.id2}"`
            );
            break;
        default:
            res.status(400).send(
                `Something went wrong with the action "${args.action}"`
            );
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listentinig to port: ${PORT}`);
});
