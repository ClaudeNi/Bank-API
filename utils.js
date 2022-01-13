const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const createUser = (id = uuidv4(), cash = 0, credit = 0) => {
    const users = loadUsers();
    const checkUser = users.find((user) => user.id === id);
    if (checkUser) {
        return `User with the ID "${id}" already exists!`;
    } else {
        const user = {
            id: id,
            cash: cash,
            credit: credit,
        };
        users.push(user);
        saveUsers(users);
        return user;
    }
};

const depositeCash = (cash) => {};

const updateCredit = (credit) => {};

const withdrawMoney = (money) => {};

const transferMoney = (money, id1, id2) => {};

const showUser = (id) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === id);
    if (user) {
        return user;
    } else {
        return `User with ID "${id}" not found`;
    }
};

const showUsers = () => {
    const users = loadUsers();
    return users;
};

const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync("users.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync("users.json", dataJSON);
};

module.exports = {
    create: createUser,
    deposite: depositeCash,
    update: updateCredit,
    withdraw: withdrawMoney,
    transfer: transferMoney,
    showUser: showUser,
    showAll: showUsers,
};
