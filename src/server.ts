import express from "express";
import bodyParser from 'body-parser';

import { app } from "./app";
import { env } from "./env";

import router  from "./routes/post.routes";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', router)

app.listen(env.PORT, () => {
    console.log(`Server is runnning on port: ${env.PORT}`);
});