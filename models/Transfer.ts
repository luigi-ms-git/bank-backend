import Account from './Account';

class Transfer {
	private _accountOrigin: Account;
	private _accountReceiver: Account;
	private _money: number;
	private _transferStatus: string;

	constructor(accOrigin: Account, accReceiver: Account){
		this._accountOrigin = accOrigin;
		this._accountReceiver = accReceiver;
		this._money = 0.00;
		this._transferStatus = "Not finished";
	}

	public getData(){
		return {
			acc_origin: this.accountOrigin.id,
			acc_receiver: this.accountReceiver.id,
			money: this.money,
			transfer_status: this.transferStatus
		};
	}

	public send(money: number): void {
		this.accountOrigin.money -= money;
		this.accountReceiver.money += money;

		this.transferStatus = "Finished";
	}

	public destroy(): void {
		this.transferStatus = "Cancelled";
	}

	private get accountOrigin(): Account {
		return this._accountOrigin;
	}

	private set accountOrigin(newAccOrigin: Account){
		this._accountOrigin = newAccOrigin;
	}

	private get accountReceiver(): Account {
		return this._accountReceiver;
	}

	private set accountReceiver(newAccReceiver: Account){
		this._accountReceiver = newAccReceiver;
	}

	private get money(): number {
		return this._money;
	}

	private set money(newMoney: number){
		this._money = newMoney;
	}

	private get transferStatus(): string {
		return this._transferStatus;
	}

	private set transferStatus(newTransferStatus: string){
		this._transferStatus = newTransferStatus;
	}
}

export default Transfer;
