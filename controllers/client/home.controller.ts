import { Request,Response } from "express";
import PlayLists from "../../models/playlists.model";
import Forcus from "../../models/focus.model";
import Mood from "../../models/mood.model";
// [GET]/

export const home = async (req:Request, res:Response) => {

    const playlists = await PlayLists.find({
        deleted: false,
    });
    const focusPlaylists = await Forcus.find({
        deleted: false,
    });

    const moodPlaylists = await Mood.find({
        deleted: false,
    });

    res.render("client/pages/home/home.pug",{
        pageTitle: "Home",
        playlists: playlists,
        focusPlaylists:focusPlaylists,
        moodPlaylists: moodPlaylists,
    });
}