import Client from './Client';
import Account from './Account';
import CardDAO from './CardDAO';

class Card extends CardDAO {
	private _client: Client;
	private _account: Account;
	private _id: number;
	private _cvc: number;
	private _password: number;
	private _isBlocked: boolean;

	constructor(cli: Client, acc: Account){
		super();
		this._client = cli;
		this._account = acc;
		this._id = 0;
		this._cvc = 0
		this._password = 0;
		this._isBlocked = false;
	}

	public getData(){
		return (this.isBlocked === false)
			? {
				id: this.id,
				cvc: this.cvc,
				passwd: this.password,
				is_blocked: this.isBlocked
			}
			: { error: "Card blocked" };
	}

	public getFullData(){
		return (this.isBlocked === false)
			? {
				id: this.id,
				cvc: this.cvc,
				passwd: this.password,
				is_blocked: this.isBlocked,
				client: {
					client_id: this.client.cpf,
					client_name: this.client.username
				},
				account: {
					account_money: this.account.money,
					account_limit: this.account.limit
				}}
			: { error: "Card blocked" };
	}

	public hasThisClient(clientId: number): boolean {
		return this.client.cpf === clientId;
	}

	public hasThisAccount(accountId: number): boolean {
		return this.account.id === accountId;
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

	public get cvc(): number {
		return this._cvc;
	}

	public set cvc(newCVC: number){
		this._cvc = newCVC;
	}

	public get password(): number {
		return this._password;
	}

	public set password(newPasswd: number){
		this._password = newPasswd;
	}

	public get isBlocked(): boolean {
		return this._isBlocked;
	}

	public set isBlocked(newIsBlocked: boolean){
		this._isBlocked = newIsBlocked;
	}
}

export default Card;
