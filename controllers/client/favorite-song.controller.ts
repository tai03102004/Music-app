import { Request,Response } from "express";
import FavoriteSong from "../../models/favorite-songs.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";


// [GET] / favorite-songs/

export const index = async (req: Request, res: Response) => {

    const favoriteSongs = await FavoriteSong.find({
        // userId: "", //  id của người sử dụng 
        deleted: false,
    }); // Danh sách bài hát yêu thích

    for (const item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: item.songId,
        });
        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId,
        });

        item["infoSong"] = infoSong; // Thông tin bài hát 
        item["infoSinger"] = infoSinger; // Thông tin ca sĩ

    }


    res.render("client/pages/favorite-songs/index",{
        favoriteSongs: favoriteSongs,
        pageTitle : "Bài hát yêu thích",
    })
}