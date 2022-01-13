const fs = require("fs");

const createUser = () => {};

const depositeCash = (cash) => {};

const updateCredit = (credit) => {};

const withdrawMoney = (money) => {};

const transferMoney = (money, id1, id2) => {};

const showUser = (id) => {};

const showUsers = () => {};

const getUsers = () => {};

const saveUsers = () => {};

module.exports({
    create: createUser,
    deposite: depositeCash,
    update: updateCredit,
    withdraw: withdrawMoney,
    transfer: transferMoney,
    showUser: showUser,
    showAll: showUsers,
});
