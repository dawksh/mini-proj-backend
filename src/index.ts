import express from "express";
import { config } from "dotenv";
import { sql } from "./utils/postgres";
import { randomUUID } from "crypto";
import cors from "cors"

config();

const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions))

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
    select c.* from credentials c JOIN users u on u.id = c.owner where u.wallet_address = ${walletAddress as string};
    `
    return res.status(200).send({
        result: query,
        status: "OK"
    })
})
app.get("/credential", async (req, res) => {
    const { id } = req.query;
    const query = await sql`
    select * from credentials where id = ${id as string};
    `
    return res.status(200).send({
        result: query,
        status: "OK"
    })
})
app.post("/vote", async (req, res) => {
    const { user_id, credential_id } = req.body;
    const id = randomUUID()
    try {
        const query = await sql`
        insert into upvotes values(${id}, ${user_id}, ${credential_id});
        `
        return res.status(200).send({
            result: query,
            status: "OK"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: e
        })
    }
})
app.get("/votes", async (req, res) => {
    const { credential_id } = req.query;
    const query = await sql`
    select count(*) from upvotes where credential_id = ${credential_id as string};
    `
    return res.status(200).send({
        result: query,
        status: "OK"
    })
})
app.get("/credentials", async (req, res) => {
    const query = await sql`
    select * from credentials;
    `
    return res.status(200).send({
        result: query,
        status: "OK"
    })
})



app.listen(PORT, async () => {
    console.log("Server Listening on PORT: ", PORT);
})

