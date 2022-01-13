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
    switch (args.action) {
        case "deposit":
            const response = utils.deposite(args.id, args.cash);
            res.status(200).send(
                `Deposited ${args.cash}$ into the user with ID "${args.id}"`
            );
            break;
        case "update":
            const response = utils.update(args.id, args.credit);
            res.status(200).send(
                `New credit balance is ${args.credit} for the user with ID "${args.id}"`
            );
            break;
        case "withdraw":
            const response = utils.withdraw(args.id, args.money);
            res.status(200).send(
                `Withdrew ${args.money} from user with ID "${args.id}"`
            );
            break;
        case "transfer":
            const response = utils.transfer(args.id1, args.id2, args.money);
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
