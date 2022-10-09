export type FullTagToUserDTO = {
    creator: {
        nickname: string,
        uid: string
    } | null,
    name: string,
    sortOrder: number
}