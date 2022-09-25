class Client {
	private _id: number;
	private _username: string;
	private _passwd: string;
	private _accountID: number;

	constructor(id: number, username: string, passwd: string){
		this._id = id;
		this._username = username;
		this._passwd = passwd;
		this._accountID = 0;
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

	public get passwd(): string {
		return this._passwd;
	}

	public set passwd(newPasswd: string){
		this._passwd = newPasswd;
	}

	public get accountID(): number {
		return this._accountID;
	}

	public set accountID(newAccountID: number){
		this._accountID = newAccountID;
	}
}

export default Client;
