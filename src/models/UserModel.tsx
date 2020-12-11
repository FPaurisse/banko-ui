export class UserModel {
    _id: string;
    firstname: string;
    lastname: string;
    fullname: string;
    username: string;
    email: string;
    isConfirmed: boolean;
 
    static Empty(): UserModel {
        return new UserModel({
            _id: '',
            firstname: '',
            lastname: '',
            fullname: '',
            username: '',
            email: '',
            isConfirmed: false
        });
    }

    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}