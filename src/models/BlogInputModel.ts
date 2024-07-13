export interface BlogInputModel {
  name: string,
  description: string,
  websiteUrl: string,
}

export interface PostInBlogInputModel {
  title: string,
  content: string,
  shortDescription: string,
}

export type ParamModel = {
  id: string
}
