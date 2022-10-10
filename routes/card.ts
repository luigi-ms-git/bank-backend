import express, { Router, Request, Response } from 'express';
import CardActions from '../actions/CardActions';

const card: Router = express.Router();

card.get('', (req: Request, res: Response) => {});

card.post('', (req: Request, res: Response) => {});

card.put('', (req: Request<{id: number, field: string, newData: number}>, res: Response) => {});

card.delete('', (req: Request, res: Response) => {});

export default card;
