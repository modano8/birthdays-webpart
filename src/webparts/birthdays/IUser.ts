export interface IUser {
    title: string;
    id: string;
    imageUrl: string;
    birthdayDate: string;
}

export interface IUsers {
    value: IUser[];
}