import ClientModel from './ClientModel';

class ClientActions {
	static async createClient(username: string, passwd: string): Promise<any | Error> {
		const client = new ClientModel();

		client.username = username;
		client.passwd = passwd;

		try{
			const data = await client.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async getClient(clientID: number): Promise<any | string> {
		const client = new ClientModel();

		client.id = clientID;

		const data = await client.select();

		return (data)
			? Promise.resolve(data)
			: Promise.reject("Error on select client");
	}

	static async updateOneField(clientID: number, field: string, newValue: any): Promise<any | Error> {
		const client = new ClientModel();

		client.id = clientID;

		try{
			const data = await client.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async deleteClient(clientID: number): Promise<any | Error> {
		const client = new ClientModel();

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