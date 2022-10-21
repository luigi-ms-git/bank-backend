import Client from './Client';
import Card from './Card';
import AccountDAO from './AccountDAO';

class Account extends AccountDAO {
	private _id: number;
	private _money: number;
	private _limit: number;
	private _client: Client;
	private _card: Card;

	constructor(money: number, cli: Client){
		super();
		this._id = 0;
		this._money = money;
		this._limit = 0.00;
		this._client = cli;
		this._card = new Card(cli, this);
	}

	public getData(){
		return {
			id: this.id,
			money: this.money,
			limit: this.limit
		};
	}

	public getFullData(){
		return {
			id: this.id,
			money: this.money,
			limit: this.limit,
			client: {
				client_id: this.client.cpf,
				client_name: this.client.username
			},
			card: this.card.getData()
		};
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

	public createCard(cli: Client): void {
		this.card = new Card(cli, this);
	}

	public blockCard(cardId: number): void {
		this.card.isBlocked = true;
	}

	public push() {
		return super.insert(this.money, this.client.cpf);
	} 

	public pull() {
		return super.select(this.id);
	}

	public modify(field: string, value: number) {
		return super.update(this.id, field, value);
	}

	public destroy() {
		return super.remove(this.id);
	}

	public pullClient() {
		return super.searchBy(this.client.cpf);
	}
	public hasThisClient(clientId: number): boolean {
		return this.client.cpf === clientId;
	}

	public hasThisCard(cardId: number): boolean {
		return (this.card.id === cardId) && (this.card.isBlocked === false);
	}

	public isClientCorrect(clientId: number, clientPasswd: number): boolean {
		const isCPFCorrect = (this.client.cpf === clientId);
		const isPasswordCorrect = (this.client.passwd === clientPasswd);

		return (isCPFCorrect && isPasswordCorrect);
	}

	public isCardCorrect(cardId: number, cardPasswd: number): boolean {
		const isIdCorrect = (this.card.id === cardId);
		const isPasswordCorrect = (this.card.password === cardPasswd);

		return (isIdCorrect && isPasswordCorrect);
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

	public get card(): Card {
		return this._card;
	}

	public set card(newCard: Card){
		this._card = newCard;
	}
}

export default Account;
