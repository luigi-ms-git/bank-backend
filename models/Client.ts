import Account from './Account';
import Card from './Card';
import ClientDAO from './ClientDAO';

class Client extends ClientDAO {
	private _id: number;
	private _username: string;
	private _passwd: number;
	private _accounts: Array<Account>;
	private _cards: Array<Card>;

	constructor(id: number, username: string, passwd: number){
		this._id = id;
		this._username = username;
		this._passwd = passwd;
		this._accounts = [new Account(0)];
		this._cards = [];
	}

	public createAccount(acc: Account): Account {
		this.accounts.push(acc);
		return acc;
	}

	public requestCard(acc: Account): Card {
		const card = new Card(this, acc);

		this.cards.push(card);

		return card;
	}

	public blockCard(cardId: number): void {
		this.cards = this.cards.filter(c => {
			return c.id !== cardId;
		});

		this.accounts.forEach(a => a.blockCard(cardId));
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

	public get accounts(): Array<Account> {
		return this._accounts;
	}

	public get cards(): Array<Card> {
		return this._cards;
	}
}

export default Client;
