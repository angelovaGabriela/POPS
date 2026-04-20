
export interface User { 
    _id: string;
    firstName: string;
    lastName?: string;   
    email: string;
    age: number;
}

export interface UserForAuth {
    firstName: string;
    lastName?: string;   
    email: string;
    age: number;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
