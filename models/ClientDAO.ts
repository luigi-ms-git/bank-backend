import { QueryResult } from 'pg';
import db from './database';
import IModel from './IModel';

enum Query {
	INSERT = "INSERT INTO Clients(cpf, user_name, passwd) VALUES($1, $2)",
	SELECT = "SELECT * FROM Clients WHERE cpf = $1",
	SELECT_BY_NAME = "SELECT * FROM Clients WHERE user_name = $1",
	UPDATE = "UPDATE Clients SET $0 = $1 WHERE cpf = $2",
	DELETE = "DELETE FROM Clients WHERE cpf = $1"
}

class ClientDAO implements IModel {
	async insert(cpf: number, username: string, passwd: number): Promise<QueryResult | Error> {
		if((await this.itExists(username))){
			return new Error("This client already exist");
		}

		const res: QueryResult = await db.query(Query.INSERT,
			[cpf, username, passwd]);
		
		return res;
	}

	async select(cpf: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[cpf]);

		return (res.rowCount > 0)
			? res
			: new Error("This client doesnt exist");
	}

	async searchBy(name: string): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT_BY_NAME,
			[name]);

		return (res.rowCount > 0)
			? res
			: new Error("This client doesnt exist");	
	}

	async update(cpf: number, field: string, newValue: string): Promise<QueryResult | Error> {
		let query = "";

		if(!(await this.itExists(cpf))){
			return new Error("This client does not exist");
		}
		
		if(field === 'username'){
			query = Query.UPDATE.replace(/\$0/, "username");
		}else if(field === 'passwd'){
			query = Query.UPDATE.replace(/\$0/, "passwd");
		}

		const res: QueryResult = await db.query(query,
			[newValue, cpf]);

		return res;
	}

	async remove(cpf: number): Promise<QueryResult | Error> {
		if((await this.itExists(cpf)) === false){
			return new Error("This client does not exist");
		}

		const res: QueryResult = await db.query(Query.DELETE,
			[cpf]);

		return res;
	}

	async itExists(param: number | string): Promise<boolean> {
		let found: any;
		if(typeof param === 'number'){
			found = await this.select(param);
		}else if(typeof param === 'string'){
			found = await this.searchBy(param);
		}

		return ((found instanceof Error) === false);
	} 
}

export default ClientDAO;
