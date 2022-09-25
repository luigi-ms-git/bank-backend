import express, { Router, Request, Response } from 'express';
import AccountActions from '../models/AccountActions';

const account: Router = express.Router();

account.get('/account/:clientID', (req: Request, res: Response) => {
	const clientID: string = req.params.clientID;
});

account.post('/account/new', (req: Request, res: Response) => {});

account.put('/account/deposit', (req: Request, res: Response) => {});

account.put('/account/withdraw', (req: Request, res: Response) => {});

account.delete('/account', (req: Request, res: Response) => {});

export { account };
