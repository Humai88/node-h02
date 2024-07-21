import { BlogViewModel } from "./BlogViewModel"
import { PostViewModel } from "./PostViewModel"

// export enum SortDirection { 
//   asc = 'asc',
//   desc = 'desc'
// }


export interface PaginatorBlogViewModel {
  pagesCount: number
  pageSize: number
  totalCount: number
  page: number
  items: BlogViewModel[]
}

export type SortDirection = 'asc' | 'desc'


export interface PaginatorPostViewModel {
  pagesCount: number
  pageSize: number
  totalCount: number
  page: number
  items: PostViewModel[]
}

 interface QueryModel {
  pageSize: number
  pageNumber: number
  sortDirection: SortDirection
}
export interface QueryBlogModel extends QueryModel {
  sortBy: keyof BlogViewModel
  searchNameTerm: string | null
}

export interface QueryPostModel extends QueryModel {
  sortBy: keyof PostViewModel
}

export type ParamModel = {
  id: string
}