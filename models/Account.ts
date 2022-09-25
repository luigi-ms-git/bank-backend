class Account {
	private _id: number;
	private _money: number;
	private _clientID: number;

	constructor(clientID: number, money: number){
		this._id = 0;
		this._money = money;
		this._clientID = clientID;
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
	
	public get clientID(): number {
		return this._clientID;
	}

	public set clientID(newClientID: number){
		this._clientID = newClientID;
	}
}

export default Account;
