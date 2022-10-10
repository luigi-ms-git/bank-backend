import { QueryResult } from 'pg';
import db from './database';
import IModel from './IModel';

enum Query {
	INSERT = "INSERT INTO Clients(username, passwd) VALUES($1, $2)",
	SELECT = "SELECT * FROM Clients WHERE id = $1",
	UPDATE = "UPDATE Clients SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Clients WHERE id = $1"
}

class ClientDAO implements IModel {
	async insert(username: string, passwd: number): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This client already exist");
		}

		const res: QueryResult = await db.query(Query.INSERT,
			[username, passwd]);
		
		return res;
	}

	async select(id: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[id]);

		return (res.rowCount > 0)
			? res
			: new Error("This client doesnt exist");
	}

	async update(id: number, field: string, newValue: string): Promise<QueryResult | Error> {
		let query = "";

		if(!(await this.itExists())){
			return new Error("This client does not exist");
		}
		
		if((field !== "username") && (field !== "passwd")){
			return new Error("Unable to update");
		}else if(field === 'username'){
			query = Query.UPDATE.replace(/\$0/, "username");
		}else if(field === 'passwd'){
			query = Query.UPDATE.replace(/\$0/, "passwd");
		}

		const res: QueryResult = await db.query(query,
			[newValue, id]);

		return res;
	}

	async remove(id: number): Promise<QueryResult | Error> {
		if((await this.itExists()) === false){
			return new Error("This client does not exist");
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

export default ClientDAO;
