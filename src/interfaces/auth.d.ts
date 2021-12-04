export interface IErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    isValidated?: boolean;
    [key: string]: string | undefined | boolean;
}
export interface IAuthTitle {
    password: boolean;
    icon: any;
    title: string;
    label: string;
    type: string;
    id: number;
}
