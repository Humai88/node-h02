import { QueryModel, SortDirection } from "../models/QueryModel"

export const setQueryDefaultValues = (query: QueryModel) => { 
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
}
 }
