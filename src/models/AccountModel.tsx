export class AccountModel {
    _id: string;
    userId: string;
    title: string;
    guests: string[];
    guestAccount: boolean;
    
    static Empty(): AccountModel {
        return new AccountModel({
            _id: '',
            title: '',
            userId: '', 
            guests: [],
            guestAccount: false
        });
    }

    public constructor(init?: Partial<AccountModel>) {
        Object.assign(this, init);
    }
}