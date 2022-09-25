import express, { Router, Request, Response } from 'express';
import ClientActions from '../models/ClientActions';

const client: Router = express.Router();

client.get('/client/:id', (req: Request, res: Response) => {
	const id: string = req.params.id;
});

client.post('/signin/', (req: Request, res: Response) => {
	const { id, passwd } = req.body;
});

client.post('/signup/', (req: Request, res: Response) => {
	const { username, passwd } = req.body;

	ClientActions.createClient(username, passwd)
		.then(res => res.json({ res }))
		.catch(rej => res.status(400).json({ rej }));
});

client.put('/client/', (req: Request, res: Response) => {
	const { id, field, newData } = req.body;
});

client.delete('/client/', (req: Request, res: Response) => {
	const id: number = req.body;
});

export { client };
