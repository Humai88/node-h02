import { Response, Request, NextFunction } from "express";
import { QueryBlogModel } from "../../../models/QueryModel";
import { setUserQueryDefaultValues } from "../../../helpers/queryDefaultValues";


export const applyUserQueryDefaults = (req: Request<any, any, any, QueryBlogModel>, res: Response<any>, next: NextFunction) => {
  req.query = setUserQueryDefaultValues(req.query);
  next();
};