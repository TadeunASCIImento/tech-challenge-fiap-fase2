import express from "express";
import bodyParser from 'body-parser';

import { app } from "./app";
import { env } from "./env";

import postsRouter  from "./routes/post.routes";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', postsRouter)

app.listen(env.PORT, () => {
    console.log(`Server is runnning on http://localhost:${env.PORT}`);
});