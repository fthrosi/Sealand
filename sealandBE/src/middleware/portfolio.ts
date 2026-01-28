import { Request,Response,NextFunction } from "express";


export function validatePortfolioBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description, value } = req.body;
    if (!name || !value || !description) {
        return res.status(400).json({
        success: false,
        message: "Name dan value harus diisi",
        });
    }
    next();
}