export class AccountModel {
    _id: string;
    title: string;
    userId: string;
    isDefault: boolean;
    guests: string[];
    
    static Empty(): AccountModel {
        return new AccountModel({
            _id: '',
            title: '',
            userId: '',
            isDefault: false,
            guests: []
        });
    }

    public constructor(init?: Partial<AccountModel>) {
        Object.assign(this, init);
    }
}