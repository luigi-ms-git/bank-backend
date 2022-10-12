import { QueryResult } from 'pg';
import Client from '../models/Client';

class ClientActions {
	static async createClient(id: number, username: string, passwd: string): Promise<QueryResult | Error> {
		const client = new Client(id, username, passwd);

		try{
			const data = await client.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async getClient(clientID: number): Promise<QueryResult | Error> {
		const client = new Client();

		client.id = clientID;

		const data = await client.select();

		return (data)
			? Promise.resolve(data)
			: Promise.reject(new Error("Error on select client"));
	}

	static async updateOneField(clientID: number, field: string, newValue: string): Promise<QueryResult | Error> {
		const client = new Client();

		client.id = clientID;

		try{
			const data = await client.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async deleteClient(clientID: number): Promise<QueryResult | Error> {
		const client = new Client();

		client.id = clientID;

		try{
			const data = await client.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}
}

export default ClientActions;
