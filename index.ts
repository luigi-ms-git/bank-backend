import express, { Express } from 'express';
import { account } from './controllers/accountController';
import { client } from './controllers/clientController';

const app: Express = express();

app.use(account);
app.use(client);

app.listen(8080, () => console.log("Listening on port 8080"));
