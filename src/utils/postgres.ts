import postgres from "postgres";
import { config } from "dotenv"

config()

export const createTable = `
create table users(id varchar primary key, name varchar, walletAddress varchar unique);

create table credentials(id varchar primary key, title varchar, tx_hash varchar, description varchar, image varchar, owner varchar, creator varchar, FOREIGN KEY (owner) REFERENCES users(id), FOREIGN KEY (creator) REFERENCES users(id));
`

export const sql = postgres(process.env.POSTGRES_URI as string)
