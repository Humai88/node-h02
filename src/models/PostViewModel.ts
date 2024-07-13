export interface PostViewModel {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export interface PaginatorPostViewModel {
    // pageCount: number
    // pageSize: number
    // totalCount: number
    // page: number
    items: PostViewModel[]
}

// export type OutputType = OutputErrorsType | OutputVideoType

// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {

// }