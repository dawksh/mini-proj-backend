import express from "express";
import { config } from "dotenv";
import { sql } from "./utils/postgres";
import { randomUUID } from "crypto";

config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
    const { name, walletAddress } = req.body;
    const id = randomUUID()
    const query = await sql`
    insert into users values(${id}, ${name}, ${walletAddress});
    `
    return res.status(200).send({
        query,
        status: "OK"
    })
})
app.post("/credential", async (req, res) => {
    const { title, txHash, description, image, owner, creator } = req.body;
    const id = randomUUID()
    const query = await sql`
    insert into credentials values(${id}, ${title}, ${txHash}, ${description}, ${image}, ${owner}, ${creator});
    `
    return res.status(200).send({
        query,
        status: "OK"
    })
})
app.get("/user", async (req, res) => {
    const { walletAddress } = req.query;
    const query = await sql`
    select * from users where walletAddress ILIKE ${walletAddress as string};
    `
    return res.status(200).send({
        result: query,
        status: "OK"
    })
})
app.get("/userCredentials", async (req, res) => {
    const { walletAddress } = req.query;
    const query = await sql`
    select * from users where walletAddress ILIKE ${walletAddress as string};
    `
    return res.status(200).send({
        result: query,
        status: "OK"
    })
})

app.listen(PORT, async () => {
    console.log("Server Listening on PORT: ", PORT);
})

