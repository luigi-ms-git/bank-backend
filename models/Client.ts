import Account from './Account';
import Card from './Card';
import ClientDAO from './ClientDAO';

class Client extends ClientDAO {
	private _cpf: number;
	private _username: string;
	private _passwd: number;
	private _account: Account;
	private _card: Card;

	constructor(cpf: number, passwd: number){
		super();
		this._cpf = cpf;
		this._username = "";
		this._passwd = passwd;
		this._account = new Account(0, this);
		this._card = new Card(this, this._account);
	}

	public getData(){
		return {
			cpf: this.cpf,
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
		this.account.id = this.cpf;
	}

	public addCard(): void {
		this.card = new Card(this, this.account);
		this.account.createCard(this);
	}

	public blockCard(): void {
		this.card.isBlocked = true;
		this.account.blockCard(this.card.id);
	}

	public get cpf(): number {
		return this._cpf;
	}

	public set cpf(newCPF: number){
		this._cpf = newCPF;
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

	public set card(newCard: Card){
		this._card = newCard;
	}
}

export default Client;
