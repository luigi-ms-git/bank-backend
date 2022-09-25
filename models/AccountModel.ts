import { QueryResult } from 'pg';
import db from './database';
import Account from './Account';
import IModel from './IModel';

class AccountModel extends Account implements IModel {
	constructor(){
		super(0, 0);
	}

	async insert(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("INSERT INTO Account(money) VALUES($1)",
			[this.money]);
			return res;
		}catch(err: any){
			return new Error(err.stack);
		}
	}

	async select(): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query("SELECT * FROM Account WHERE id=$1",
			[this.id]);
			return res;
		}catch(err: any){
			return new Error(err.stack);
		}
	}

	async update(field: string, newValue: any): Promise<QueryResult | Error> {
		let query = "";

		if(!(await this.itExists())){
			return new Error("This account does not exist");
		}

		if(field === "money"){
			query = "UPDATE Account SET money=$1 WHERE id=$2"
		}else{
			return new Error(`${field} does not exist`);
		}

		try{
			const res: QueryResult = await db.query(query, [newValue, this.id]);
			return res;
		}catch(err: any){
			return new Error(err.stack);
		}
	}

	async remove(): Promise<QueryResult | Error> {
		if(!(await this.itExists())){
			return new Error("This account does not exist");
		}

		try{
			const res: QueryResult = await db.query("DELETE FROM Account WHERE id=$1",
			[this.id]);
			return res;
		}catch(err: any){
			return new Error(err.stack);
		}
	}

	async itExists(): Promise<any> {
		const found = await this.select();
		return found ? true : false;
	}
}

export default AccountModel;
