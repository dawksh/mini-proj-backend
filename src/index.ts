import express from "express";
import { config } from "dotenv";
import { createTable, sql } from "./utils/postgres";
import { randomUUID } from "crypto";

config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());



app.listen(PORT, async () => {
    console.log("Server Listening on PORT: ", PORT);
})

