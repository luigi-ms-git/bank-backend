import { QueryResult } from 'pg';
import db from './database';
import IModel from './IModel';

enum Query {
	INSERT = "INSERT INTO Accounts(money, client_id) VALUES($1)",
	SELECT = "SELECT * FROM Accounts WHERE id = $1",
	SELECT_BY_FK = "SELECT * FROM Accounts WHERE client_id = $1",
	UPDATE = "UPDATE Accounts SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Accounts WHERE id=$1"
}

class AccountDAO implements IModel {
	//Este metodo é chamado apos a criação do cliente
	//não havendo necessidade de verificar se o cliente existe 
	//ou não.
	async insert(money: number, clientId: number): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.INSERT,
				[money, clientId]);

			return res;
		}catch(err: unknown){
			return new Error("Error adding Account");
		}
	}

	async select(id: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[id]);

		return (res.rowCount > 0)
			? res
			: new Error("This Account doesnt exist");
	}

	async searchBy(clientId: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT_BY_FK,
			[clientId]);

		return (res.rowCount > 0)
			? res
			: new Error("This Account doesnt exist");
	}

	async update(id: number, field: string, newValue: number): Promise<QueryResult | Error> {
		let query = "";

		if((await this.itExists(id)) === false){
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
		if((await this.itExists(id)) === false){
			return new Error("This account does not exist");
		}

		const res: QueryResult = await db.query(Query.DELETE,
			[id]);

		return res;
	}

	async itExists(param: number): Promise<boolean> {
		const found = await this.select(param);
		const foundToo = await this.searchBy(param);

		return ((found instanceof Error) === false)
			&& ((foundToo instanceof Error) === false);
	}
}

export default AccountDAO;
