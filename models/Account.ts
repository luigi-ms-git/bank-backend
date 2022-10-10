import Client from './Client';
import Card from './Card';
import AccountDAO from './AccountDAO';

class Account extends AccountDAO {
	private _id: number;
	private _money: number;
	private _limit: number;
	private _client: Client;
	private _cards: Array<Card>;

	constructor(money: number){
		this._id = 0;
		this._money = money;
		this._limit = 0.00;
		this._client = new Client();
		this._cards = [];
	}

	public transferTo(anotherAccount: Account, amount: number): void {
		this.money -= amount;

		anotherAccount.money += amount;
	}

	public deposit(amount: number): void {
		this.money += amount;
	}

	public withdraw(amount: number): number {
		if(amount < this.limit){
			this.money -= amount;
			return amount;
		}else{
			return 0;
		}
	}

	public createCard(): void {
		const card = new Card(this.client, this);
		this.cards.push(card);
	}

	public blockCard(cardId: number): void {
		this.cards = this.cards.filter(c => {
			return c.id !== cardId;
		});
	}

	public isClientCorrect(clientId: number, clientPasswd: number): boolean {
		const isIdCorrect = (this.client.id === clientId);
		const idPasswordCorrect = (this.client.passwd === clientPasswd);

		return (isIdCorrect && isPasswordCorrect);
	}

	public isCardCorrect(cardId: number, cardPasswd): boolean {
		let isCorrect = false;

		for(let c in this.cards){
			if(c.id === cardId && c.password === cardPasswd){
				isCorrect = true;
			}
		}

		return isCorrect;
	}

	public get id(): number {
		return this._id;
	}

	public set id(newID: number){
		this._id = newID;
	}

	public get money(): number {
		return this._money;
	}

	public set money(newMoney: number){
		this._money = newMoney;
	}

	public get limit(): number {
		return this._limit;
	}

	public set limit(newLimit: number){
		this._limit = newLimit;
	}
	
	public get client(): Client {
		return this._client;
	}

	public set client(newClient: Client){
		this._client = newClient;
	}

	public get cards(): Array<Card> {
		return this._cards;
	}
}

export default Account;
