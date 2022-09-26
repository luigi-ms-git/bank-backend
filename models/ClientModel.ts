import { QueryResult } from 'pg';
import db from './database';
import Client from './Client';
import IModel from './IModel';

class ClientModel extends Client implements IModel {
	constructor(){
		super(0, "", "");
	}

	async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("INSERT INTO Client(username, passwd) VALUES($1, $2)",
			[this.username, this.passwd]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Error on insert operation");
		}
	}

	async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("SELECT * FROM Client WHERE id=$1",
			[this.id]);
			return res;
		}catch(err: unknown){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Error on select operation");
		}
	}

	async update(field: string, newValue: string): Promise<QueryResult | Error> {
		let query = "";

		if(!(await this.itExists())){
			return new Error("This client does not exist");
		}

		if(field === "username"){
			query = "UPDATE Client SET username=$1 WHERE id=$2"
		}else if(field === "passwd"){
			query = "UPDATE Client SET passwd=$1 WHERE id=$2"
		}else{
			return new Error(`${field} does not exist`);
		}

		try{
			const res: QueryResult = await db.query(query, [newValue, this.id]);
			return res;
		}catch(err: any){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Error on update operation");
		}
	}

	async remove(): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This client does not exist");
		}

		try{
			const res: QueryResult = await db.query("DELETE FROM Client WHERE id=$1",
			[this.id]);
			return res;
		}catch(err: any){
			return (err instanceof Error)
				? new Error(err.stack)
				: new Error("Error on delete operation");
		}
	}

	async itExists(): Promise<boolean> {
		const found = await this.select();
		return found ? true : false;
	} 
}

export default ClientModel;
