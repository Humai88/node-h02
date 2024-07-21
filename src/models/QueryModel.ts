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

export interface QueryModel {
  pageSize: number
  pageNumber: number
  sortDirection: SortDirection
  sortBy: keyof BlogViewModel
  searchNameTerm: string | null
  blogId?: string
}

export type ParamModel = {
  id: string
}