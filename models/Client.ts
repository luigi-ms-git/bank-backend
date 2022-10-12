import Account from './Account';
import Card from './Card';
import ClientDAO from './ClientDAO';

class Client extends ClientDAO {
	private _id: number;
	private _username: string;
	private _passwd: number;
	private _account: Account;
	private _card: Card;

	constructor(username: string, passwd: number){
		this._id = 0;
		this._username = username;
		this._passwd = passwd;
		this._account = new Account(0, this);
		this._card = new Card(this, this._account);
	}

	public getData(){
		return {
			id: this.id,
			name: this.username,
			account: this.account.getData(),
			card: this.card.getData()
		};
	}

	public hasThisAccount(accountId: number): boolean {
		return this.account.id === accountId;
	}

	public hasThisCard(cardId: number): boolean {
		return (this.card.id === cardId) && (this.card.isBlocked === false);
	}

	public createAccount(money: number): void {
		this.account.money = money;
		this.account.id = this.id;
	}

	public addCard(): void {
		this.card = new Card(this, this.account);
		this.account.createCard(this);
	}

	public blockCard(): void {
		this.card.isBlocked = true;
		this.account.blockCard();
	}

	public get id(): number {
		return this._id;
	}

	public set id(newID: number){
		this._id = newID;
	}

	public get username(): string {
		return this._username;
	}

	public set username(newUserName: string){
		this._username = newUserName;
	}

	public get passwd(): number {
		return this._passwd;
	}

	public set passwd(newPasswd: number){
		this._passwd = newPasswd;
	}

	public get account(): Account {
		return this._account;
	}

	public get card(): Card {
		return this._card;
	}
}

export default Client;
