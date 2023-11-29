import { Request,Response } from "express";

// [GET]/

export const home = async (req:Request, res:Response) => {

    res.render("client/pages/home/home.pug",{
        pageTitle: "Home",
    });
}