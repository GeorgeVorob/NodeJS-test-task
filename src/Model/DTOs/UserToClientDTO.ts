import { Tag } from "../models/tag"

export type UserToClientDTO = {
    email?: string,
    nickname?: string,
    tags: { id: number, name: string, sortOrder: number }
}