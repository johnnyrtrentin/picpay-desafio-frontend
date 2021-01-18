export interface UsersStateModel {
    users: IUsers[];
}

export interface IUsers {
    id: number;
    name: string;
    img: string;
    username: string;
}
