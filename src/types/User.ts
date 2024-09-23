export interface User {
    token: string,
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