import express from "express";
import bodyParser from 'body-parser';

import postsRouter  from "./routes/post.routes";

export const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', postsRouter);
