import express from "express";
import mongoose from "mongoose";
import { 
    getAllAccounts,
    addAccount
} from "../dao/account-dao.js";

import { ReasonPhrases, StatusCodes } from "http-status-codes";

const accountRouter = new express.Router();

// endpoint 1: GET all accounts without worrying about pagination
accountRouter.get("/account", async (req, res) => {
  const { accounts, count } = await getAllAccounts();

  return res.status(StatusCodes.OK).header("Count", count).json(accounts);
});

export default accountRouter;

// endpoint 2: POST - adding account
accountRouter.post('/account', async (req,res) => {
    const newAccount = await addAccount(req.body);

    return res.status(StatusCodes.CREATED)
              .header('Location', `/products/${newAccount._id}`)
              .json(newAccount);
});