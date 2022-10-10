import express, { Express } from 'express';
import account from './routes/account';
import client from './routes/client';
import card from './routes/card';

const app: Express = express();

app.use(express.json());
app.use(account);
app.use(client);
app.use(card);

app.listen(8080, () => {
	console.log("Listening on http://localhost:8080/");
});
