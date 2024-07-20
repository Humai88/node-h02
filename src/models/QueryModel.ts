import { BlogViewModel } from "./BlogViewModel"
import { PostViewModel } from "./PostViewModel"

export enum SortDirection { 
  asc = 'asc',
  desc = 'desc'
}


export interface PaginatorBlogViewModel {
  pagesCount: number
  pageSize: number
  totalCount: number
  page: number
  items: BlogViewModel[]
}


export interface PaginatorPostViewModel {
  pagesCount: number
  pageSize: number
  totalCount: number
  page: number
  items: PostViewModel[]
}
