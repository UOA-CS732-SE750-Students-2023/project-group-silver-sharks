import { Account } from "../models/accountModel.js";


// return all accounts in the database
const getAllAccounts = async () => {

    const accounts = await Account.find();

    // determine the number of results being returned
    const count = await Account.countDocuments({})

    return {accounts, count};
};

const getAccountById = async (id) => {
    const account = await Account.findById(id);
    return account;
};

export {
    getAllAccounts,
    getAccountById
};