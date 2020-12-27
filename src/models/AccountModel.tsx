export class AccountModel {
    _id: string;
    title: string;
    userId: string;
    
    static Empty(): AccountModel {
        return new AccountModel({
            _id: '',
            title: '',
            userId: ''
        });
    }

    public constructor(init?: Partial<AccountModel>) {
        Object.assign(this, init);
    }
}