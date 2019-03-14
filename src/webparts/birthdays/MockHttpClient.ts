import { IUser } from './IUser';

export default class MockHttpClient {

    private static _items: IUser[] = [
        {
            title: 'Annie Lindqvist',
            id: '1',
            imageUrl: String(require('./components/persona-female.png')),
            birthdayDate: '17 декабря'
        },
        {
            title: 'Victoria Bachman',
            id: '2',
            imageUrl: String(require('./components/persona-female.png')),
            birthdayDate: '12 мая'
        },
        {
            title: 'Karina Lu',
            id: '3',
            imageUrl: String(require('./components/persona-female.png')),
            birthdayDate: '10 октября'
        }
    ];

    public static get(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}