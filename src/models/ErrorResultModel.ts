export type ErrorResultModel = {
  errorsMessages: FieldError[]
};

type FieldError = { message: string, field: string }