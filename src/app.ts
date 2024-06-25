import 'reflect-metadata';
import './lib/orm/typeorm.config'

import express from "express";
import bodyParser from 'body-parser';

import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";

export const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use(userRouter);
app.use(postRouter);
