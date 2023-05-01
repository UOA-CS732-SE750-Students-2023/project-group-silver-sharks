import express from "express";
import multer from "multer";
import path from "path";
import { StatusCodes } from "http-status-codes";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});