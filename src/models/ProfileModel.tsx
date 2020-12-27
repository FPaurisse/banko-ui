export class ProfileModel {
    _id?: string;
    accountIdByDefault: string;
    shareMyProfile: boolean;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
 
    static Empty(): ProfileModel {
        return new ProfileModel({
            _id: '',
            accountIdByDefault: '',
            shareMyProfile: false,
            email: '',
            username: '',
            firstname: '',
            lastname: ''
        });
    }

    public constructor(init?: Partial<ProfileModel>) {
        Object.assign(this, init);
    }
}