import { Client } from 'pg';

const config = {
	user: "luigiMoraes",
	host: "localhost",
	database: "bankts",
	password: "",
	port: 5432
};

const db = new Client(config);
db.connect();

export default db;
