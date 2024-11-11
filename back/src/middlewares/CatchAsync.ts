import { Request, Response, NextFunction } from "express";

export default (cb: (req: Request, res: Response) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res).catch(next);
  };
};
