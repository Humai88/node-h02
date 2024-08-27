import { BlogInputModel } from "./BlogInputModel";
import { PostInputModel } from "./PostInputModel";
import { LoginInputModel, UserInputModel } from "./UserModel";

export type ErrorResultModel = {
  errorsMessages: FieldError[]
};
export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel | keyof LoginInputModel | keyof UserInputModel | 'id' | 'postId' | 'commentId' | 'userId' | 'server';

type FieldError = { message: string, field: FieldNamesType }


// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {

// }