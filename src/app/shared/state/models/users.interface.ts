export interface UsersStateModel {
    users: IUsers[];
}

export interface IUsers {
    id: string;
    name: string;
    img: string;
    username: string;
}
