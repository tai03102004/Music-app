import { Request, Response } from "express";

// [GET]
export const index = async (req: Request, res: Response) => {
    res.json({
        location : req.body.file
    });
};