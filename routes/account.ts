import express, { Router, Request, Response } from 'express';
import AccountActions from '../actions/AccountActions';

const account: Router = express.Router();

account.get('/account/:clientID', (req: Request, res: Response) => {
	const clientID: string = req.params.clientID;

	AccountActions.getAccount(parseInt(clientID))
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

account.post('/account/new', (req: Request<{clientID: number, money: number}>, res: Response) => {
	const { clientID, money } = req.body;

	AccountActions.createAccount(money)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

account.put('/account/deposit', (req: Request<{id: number, field: string, newData: number}>, res: Response) => {
	const { id, field, newData } = req.body;

	AccountActions.updateOneField(id, field, newData)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

account.delete('/account', (req: Request, res: Response) => {
	const id: number = req.body;

	AccountActions.deleteAccount(id)
		.then(resolved => res.json({ resolved }))
		.catch(rejected => res.status(400).json({ rejected }));
});

export default account;
