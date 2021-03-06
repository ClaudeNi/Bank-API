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

const updateFunc = (id, money, where) => {
    if (money > 0) {
        const users = loadUsers();
        const user = users.filter((user) => user.id === id)[0];
        const userIndex = users.indexOf(user);
        if (userIndex !== -1) {
            users[userIndex][where] += money;
            saveUsers(users);
            return true;
        }
    }
    return false;
};

const depositCash = (id, money) => {
    return updateFunc(id, money, "cash");
};

const updateCredit = (id, money) => {
    return updateFunc(id, money, "credit");
};

const withdrawMoney = (id, money) => {
    const users = loadUsers();
    const user = users.filter((user) => user.id === id)[0];
    const userIndex = users.indexOf(user);
    if (userIndex !== -1) {
        if (users[userIndex].cash > 0 && users[userIndex].cash - money >= 0) {
            users[userIndex].cash -= money;
            saveUsers(users);
            return true;
        } else if (
            users[userIndex].credit > 0 &&
            users[userIndex].credit - money >= 0
        ) {
            users[userIndex].credit -= money;
            saveUsers(users);
            return true;
        }
    }
    return false;
};

const transferMoney = (id1, id2, money) => {
    const users = loadUsers();
    const user1 = users.filter((user) => user.id === id1)[0];
    const user2 = users.filter((user) => user.id === id2)[0];
    const user1Index = users.indexOf(user1);
    const user2Index = users.indexOf(user2);
    if (user1Index !== -1 && user2Index !== -1) {
        if (users[user1Index].cash > 0 && users[user1Index].cash - money >= 0) {
            users[user1Index].cash -= money;
            users[user2Index].cash += money;
            saveUsers(users);
            return true;
        } else if (
            users[user1Index].credit > 0 &&
            users[user1Index].credit - money >= 0
        ) {
            users[user1Index].credit -= money;
            users[user2Index].cash += money;
            saveUsers(users);
            return true;
        }
    }
    return false;
};

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
    deposit: depositCash,
    update: updateCredit,
    withdraw: withdrawMoney,
    transfer: transferMoney,
    showUser: showUser,
    showAll: showUsers,
};
