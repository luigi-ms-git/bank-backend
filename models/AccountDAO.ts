import { QueryResult } from 'pg';
import db from './database';
import IModel from './IModel';

enum Query {
	INSERT = "INSERT INTO Accounts(money) VALUES($1)",
	SELECT = "SELECT * FROM Accounts WHERE id = $1",
	UPDATE = "UPDATE Accounts SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Accounts WHERE id=$1"
}

class AccountDAO implements IModel {
	async insert(money: number): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This client already exist");
		}

		const res: QueryResult = await db.query(Query.INSERT,
			[money]);

		return res;
	}

	async select(id: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[id]);

		return (res.rowCount > 0)
			? res
			: new Error("This Account doesnt exist");
	}

	async update(id: number, field: string, newValue: number): Promise<QueryResult | Error> {
		let query = "";

		if((await this.itExists()) === false){
			return new Error("This account does not exist");
		}

		if(field !== "money"){
			return new Error("Unable to update");
		}else{
			query = Query.UPDATE.replace(/\$0/, "money");
		}

		const res: QueryResult = await db.query(query, 
			[newValue, id]);

		return res;
	}

	async remove(id: number): Promise<QueryResult | Error> {
		if((await this.itExists()) === false){
			return new Error("This account does not exist");
		}

		const res: QueryResult = await db.query(Query.DELETE,
			[id]);

		return res;
	}

	async itExists(): Promise<boolean> {
		const found = await this.select();

		return ((found instanceof Error) === false);
	}
}

export default AccountDAO;
