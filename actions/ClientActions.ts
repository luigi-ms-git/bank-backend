import { QueryResult } from 'pg';
import Client from '../models/Client';

class ClientActions {
	 static async pushClient(name: string, cpf: number, passwd: number, money: number): Promise<Array<any>> {
		const cli = new Client(cpf, passwd);

		 cli.username = name;

		 cli.createAccount(money);
		 cli.addCard();

		 const data = await cli.insert(cpf, name, passwd);

		 if(data instanceof Error){
			 return Promise.reject([new Error(data.message), 500]);
		 }else{
			 return Promise.resolve([cli.getData(), 201]);
		 }
	 }

	static async pullClient(cpf: number, passwd: number): Promise<Array<any>> {
		const cli = new Client(cpf, passwd);

		const data = await cli.select(cpf);
	
		if(data instanceof Error){
		 return Promise.reject([new Error(data.message), 404]);
		}else{
		 cli.username = data.rows[0].user_name;
		 cli.account.id = data.rows[0].account_id;
		 cli.card.id = data.rows[0].card_id;
			 
		 return Promise.resolve([cli.getData(), 200]);
		}
	}

	static async modify(cpf: number, passwd: number, field: string, newValue: string): Promise<Array<any>> {
		const cli = new Client(cpf, passwd);

		if((field !== "username") && (field !== "passwd")){
		 return Promise.reject([new Error("Unable to update"), 403]);
		}
	
		const data = await cli.update(cpf, field, newValue);

		if(data instanceof Error){
		 return Promise.reject([new Error(data.message), 404]);
		}else{
		 return await this.pullClient(cpf, passwd);
		}
	}

	static async destroy(cpf: number, passwd: number): Promise<Array<any>> {
		const cli = new Client(cpf, passwd);

		const data = await cli.remove(cpf);

		if(data instanceof Error){
		 return Promise.reject([new Error(data.message), 404]);
		}else{
		 return Promise.resolve(["Removed successfully", 200]);
		}
	}
}

export default ClientActions;
