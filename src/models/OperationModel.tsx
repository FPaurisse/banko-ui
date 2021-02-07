export class OperationModel {
    _id: string;
    title: string;
    categories: string[];
    amount: string;
    date: string;
    isPassed: boolean;
    isCredit: boolean;
    userId: string;
    accountId: string;
    
    static Empty(): OperationModel {
        return new OperationModel({
            _id: null,
            title: null,
            categories: [],
            amount: null,
            date: null,
            isPassed: false,
            userId: '',
            accountId: ''
        });
    }

    public constructor(init?: Partial<OperationModel>) {
        Object.assign(this, init);
    }
}