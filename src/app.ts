import 'reflect-metadata';
import './lib/orm/typeorm.config'

import express from "express";

import cors from "cors";

import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express'; 

import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";


export const app = express();

const swaggerDocument = require('./swagger.json');

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use(userRouter);
app.use(postRouter);
