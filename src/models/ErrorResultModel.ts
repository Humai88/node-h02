import { BlogInputModel } from "./BlogInputModel";
import { PostInputModel } from "./PostInputModel";

export type ErrorResultModel = {
  errorsMessages: FieldError[]
};
export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel | 'id';

type FieldError = { message: string, field: FieldNamesType }


// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {

// }