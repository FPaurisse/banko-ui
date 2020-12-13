export class CategoryModel {
    _id: string;
    title: string;
    accountId: string;
    userId: string;
    
    static Empty(): CategoryModel {
        return new CategoryModel({
            _id: '',
            title: '',
            accountId: '',
            userId: ''
        });
    }

    public constructor(init?: Partial<CategoryModel>) {
        Object.assign(this, init);
    }
}