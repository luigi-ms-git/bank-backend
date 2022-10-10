import express, { Router, Request, Response } from 'express';
import ClientActions from '../actions/ClientActions';

const client: Router = express.Router();

client.get('/client/:id', (req: Request, res: Response) => {
	const id: string = req.params.id;

	ClientActions.getClient(parseInt(id))
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

client.post('/signup/', (req: Request<{ username: string, passwd: string}>, res: Response) => {
	const { username, passwd } = req.body;

	ClientActions.createClient(username, passwd)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

client.put('/client/', (req: Request<{ id: string, field: string, newData: string}>, res: Response) => {
	const { id, field, newData } = req.body;

	ClientActions.updateOneField(parseInt(id), field, newData)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));		
});

client.delete('/client/', (req: Request, res: Response) => {
	const id: number = req.body;

	ClientActions.deleteClient(id)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

export default client;
