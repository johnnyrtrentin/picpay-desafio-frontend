export class SetTransaction {
    static readonly type = '[Transactions] Set';
    constructor(public paymentValue: number, public paymentUser: string) {}
}
