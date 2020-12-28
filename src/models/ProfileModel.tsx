export class ProfileModel {
    _id?: string;
    userId: string;
    accountIdByDefault: string;
    shareMyProfile: boolean;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
 
    static Empty(): ProfileModel {
        return new ProfileModel({
            _id: '',
            userId: '',
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