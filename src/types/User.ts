export interface User {
    token: Token,
    user: [ Profile ]
}

export interface Profile {
    providerId: string,
    uid: string,
    displayName: string | null,
    email: string,
    phoneNumber: string | null,
    photoURL: string | null
}

export type Token = string;