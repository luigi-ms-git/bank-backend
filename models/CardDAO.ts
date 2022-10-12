import { QueryResult } from 'pg';
import db from './database';
import IModel from './IModel';

enum Query {
	INSERT = "INSERT INTO Cards(id, passwd) VALUES($1, $2)",
	SELECT = "SELECT account_id, client_id FROM Cards WHERE id = $1",
	UPDATE = "UPDATE Cards SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Cards WHERE id = $1"
}

class CardDAO implements IModel {
	async insert(id: number, passwd: number): Promise<QueryResult | Error> {
		if((await this.itExists())){
			return new Error("This card already exist");
		}

		const res: QueryResult = await db.query(Query.INSERT,
			[id, passwd]);
		
		return res;
	}

	async select(id: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[id]);

		return (res.rowCount > 0)
			? res
			: new Error("This card doesnt exist");
	}

	async update(id: number, field: string, newValue: number): Promise<QueryResult | Error> {
		let query = "";

		if(!(await this.itExists())){
			return new Error("This card does not exist");
		}
		
		if((field !== "passwd")){
			return new Error("Unable to update");
		}else if(field === 'passwd'){
			query = Query.UPDATE.replace(/\$0/, "passwd");
		}

		const res: QueryResult = await db.query(query,
			[newValue, id]);

		return res;
	}

	async remove(id: number): Promise<QueryResult | Error> {
		if((await this.itExists()) === false){
			return new Error("This card does not exist");
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

export default CardDAO;
