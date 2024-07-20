import { PostViewModel } from "./PostViewModel";

export interface BlogViewModel {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean,
    items: PostViewModel[]
}

