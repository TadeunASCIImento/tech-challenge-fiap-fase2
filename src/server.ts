import express from "express";
import { app } from "./app";
import bodyParser from 'body-parser';
import { env } from "./env";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.listen(env.PORT, () => {
    console.log(`Server is runnning on port: ${env.PORT}`);
});