export type ErrorResultModel = {
  errorsMessages: FieldError[]
};

type FieldError = { message: string, field: string }


// export const someController = (
//     req: Request<ParamType, OutputType, BodyType, QueryType>,
//     res: Response<OutputType>
// ) => {

// }