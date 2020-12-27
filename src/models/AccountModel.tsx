export class AccountModel {
    _id: string;
    userId: string;
    title: string;
    guests: string[];
    
    static Empty(): AccountModel {
        return new AccountModel({
            _id: '',
            title: '',
            userId: '', 
            guests: []
        });
    }

    public constructor(init?: Partial<AccountModel>) {
        Object.assign(this, init);
    }
}