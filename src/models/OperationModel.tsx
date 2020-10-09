export class OperationModel {
    _id: string;
    title: string;
    amount: string;
    date: string;
    isPassed: boolean;
    isCredit: boolean;
    
    static Empty(): OperationModel {
        return new OperationModel({
            _id: null,
            title: '',
            amount: '0',
            date: '',
            isPassed: false
        });
    }

    public constructor(init?: Partial<OperationModel>) {
        Object.assign(this, init);
    }
}