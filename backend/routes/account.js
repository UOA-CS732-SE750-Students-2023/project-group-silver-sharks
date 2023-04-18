import express from "express";
import mongoose from "mongoose";
import { getAllAccounts } from "../dao/account-dao.js";

import { ReasonPhrases, StatusCodes } from "http-status-codes";

const accountRouter = new express.Router();

// endpoint 1: GET all accounts without worrying about pagination
accountRouter.get("/accounts", async (req, res) => {
  const { accounts, count } = await getAllAccounts();

  return res.status(StatusCodes.OK).header("Count", count).json(accounts);
});

export default accountRouter;
