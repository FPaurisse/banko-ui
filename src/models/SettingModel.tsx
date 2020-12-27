export class SettingModel {
    _id: string;
    accountIdByDefault: string;
 
    static Empty(): SettingModel {
        return new SettingModel({
            _id: '',
            accountIdByDefault: '',
        });
    }

    public constructor(init?: Partial<SettingModel>) {
        Object.assign(this, init);
    }
}