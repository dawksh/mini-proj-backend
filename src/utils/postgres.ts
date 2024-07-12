import postgres from "postgres";
import { config } from "dotenv"

config()

export const createTable = `
create table users(id varchar primary key, name varchar, walletAddress varchar unique);

create table credentials(id varchar primary key, title varchar, tx_hash varchar, description varchar, image varchar, owner varchar, creator varchar, FOREIGN KEY (owner) REFERENCES users(id), FOREIGN KEY (creator) REFERENCES users(id));

create table upvotes(id varchar primary key, user_id varchar not null, credential_id varchar not null, FOREIGN KEY (user_id) references users(id), FOREIGN KEY (credential_id) references credentials(id));
`

export const sql = postgres(process.env.POSTGRES_URI as string)
