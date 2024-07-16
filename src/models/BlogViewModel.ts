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

export interface PaginatorBlogViewModel {
    pagesCount: number
    pageSize: number
    totalCount: number
    page: number
    items: BlogViewModel[]
}
