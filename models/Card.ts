import Client from './Client';
import Account from './Account';
import CardDAO from './CardDAO';

class Card extends CardDAO {
	private _client: Client;
	private _account: Account;
	private _id: number;
	private _password: number;

	constructor(cli: Client, acc: Account, passwd: number){
		this._client = cli;
		this._account = acc;
		this._id = 0;
		this._password = passwd;
	}

	public get client(): Client {
		return this._client;
	}

	public set client(newClient: Client){
		this._client = newClient;
	}

	public get account(): Account {
		return this._account;
	}

	public set account(newAccount: Account){
		this._account = newAccount;
	}

	public get id(): number {
		return this._id;
	}

	public set id(newID: number){
		this._id = newID;
	}

	public get password(): number {
		return this._password;
	}

	public set password(newPasswd: number){
		this._password = newPasswd;
	}
}

export default Card;
