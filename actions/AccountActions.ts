import Account from '../models/Account';
import Client from '../models/Client';

class AccountActions {
	static async pushAccount(money: number, clientCPF: number): Promise<Array<any>> {
		const cli = new Client(clientCPF, 0);
		const acc = new Account(money, cli);	
		
		const data = await acc.push();

		if(data instanceof Error){
			return Promise.reject([new Error(data.message), 400]);
		}else{
			return Promise.resolve([acc.getFullData(), 201]);
		}
	}

	static async pullAccount(accountID: number): Promise<Array<any>> {
	
	}

	static async modify(accountID: number, field: string, newValue: number): Promise<Array<any>> {
		
	}

	static async destroy(accountID: number): Promise<Array<any>> {
		
	}
}

export default AccountActions;
