import { QueryResult } from 'pg';
import db from './database';
import IModel from './IModel';

enum Query {
	INSERT = "INSERT INTO Cards(passwd) VALUES($1)",
	SELECT = "SELECT account_id, client_id FROM Cards WHERE id = $1 LIMIT 1",
	SELECT_BY_CVC = "SELECT * FROM Cards WHERE cvc = $1",
	UPDATE = "UPDATE Cards SET $0 = $1 WHERE id = $2",
	DELETE = "DELETE FROM Cards WHERE id = $1"
}

class CardDAO implements IModel {
	//Este metodo é chamado apos a criação do cliente
	//não havendo necessidade de verificar se o cliente existe 
	//ou não.
	async insert(passwd: number): Promise<QueryResult | Error> {
		try{
			const res: QueryResult = await db.query(Query.INSERT,
				[passwd]);
		
			return res;
		}catch(err: unknown){
			return new Error("Error adding Card");
		}
	}

	async select(id: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT,
			[id]);

		return (res.rowCount > 0)
			? res
			: new Error("This card doesnt exist");
	}

	async searchBy(cvc: number): Promise<QueryResult | Error> {
		const res: QueryResult = await db.query(Query.SELECT_BY_CVC,
			[cvc]);

		return (res.rowCount > 0)
			? res
			: new Error("This card doesnt exist");
	}

	async update(id: number, field: string, newValue: number): Promise<QueryResult | Error> {
		let query = "";

		if(!(await this.itExists(id))){
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
		if((await this.itExists(id)) === false){
			return new Error("This card does not exist");
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

export default CardDAO;
