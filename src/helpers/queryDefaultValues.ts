import { QueryBlogModel, QueryPostModel, SortDirection } from "../models/QueryModel"

export const setBlogQueryDefaultValues = (query: QueryBlogModel) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : "",
  }
}


export const setPostQueryDefaultValues = (query:  QueryPostModel) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
  }
}

export const setUserQueryDefaultValues = (query:  QueryBlogModel) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : "",
  }
}