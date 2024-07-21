import { Response, Request, NextFunction } from "express";
import { setQueryDefaultValues } from "../../helpers/queryDefaultValues";
import { QueryModel } from "../../models/QueryModel";

export const applyQueryDefaults = (req: Request<any, any, any, QueryModel>, res: Response<any>, next: NextFunction) => {
  req.query = setQueryDefaultValues(req.query);
  next();
};