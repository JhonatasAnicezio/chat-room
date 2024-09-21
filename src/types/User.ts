export interface User {
    token: string,
    user: [
        {
            providerId: string,
            uid: string,
            displayName: string | null,
            email: string,
            phoneNumber: string | null,
            photoURL: string | null
        }
    ]
}
