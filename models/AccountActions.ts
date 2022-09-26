import { QueryResult } from 'pg';
import AccountModel from './AccountModel';

class AccountActions {
	static async createAccount(money: number): Promise<QueryResult | Error> {
		const account = new AccountModel();

		account.money = money;

		try{
			const data = await account.insert();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async getAccount(accountID: number): Promise<QueryResult | Error> {
		const account = new AccountModel();

		account.id = accountID;

		const data = await account.select();

		return (data)
			? Promise.resolve(data)
			: Promise.reject(new Error("Error on select account"));
	}

	static async updateOneField(accountID: number, field: string, newValue: number): Promise<QueryResult | Error> {
		const account = new AccountModel();

		account.id = accountID;

		try{
			const data = await account.update(field, newValue);
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}

	static async deleteAccount(accountID: number): Promise<QueryResult | Error> {
		const account = new AccountModel();

		account.id = accountID;

		try{
			const data = await account.remove();
			return Promise.resolve(data);
		}catch(err){
			return Promise.reject(err);
		}
	}
}

export default AccountActions;
