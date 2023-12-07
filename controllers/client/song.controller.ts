import { Request,Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-songs.model";

// [GET]/song/:slugTopic

export const list = async (req:Request, res:Response) => {

    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        status : "active",
        deleted : false,
    });

    const songs = await Song.find({
        topicId: topic.id,
        status : "active",
        deleted : false,
    }).select("avatar title slug singerId like");

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id :song.singerId,
            status : "active",
            deleted : false,
        });
        song["infoSinger"] = infoSinger;
    }

    res.render("client/pages/songs/list",{
        pageTitle: topic.title,
        songs: songs
    });
}

// [GET]/song/detail/:slugSong


export const detail = async (req:Request, res:Response) => {

    try{
        const slugSong : string = req.params.slugSong; // in ra slug song

        const allSong = await Song.find({
            deleted : false,
        });

        const allSinger = await Singer.find({
            deleted : false,
        });

        const song = await Song.findOne({
            slug: slugSong,
            status : "active",
            deleted : false,
        });


        const singer = await Singer.findOne({
            _id: song.singerId,
            status : "active",
            deleted : false,
        }).select("fullName");


        const topic = await Topic.findOne({
            _id: song.topicId,
            deleted: false,
        }).select("title");

        const favoriteSong = await FavoriteSong.findOne({
            // userId: "",  // Lấy ra id của người yêu thích bài hát
            songId: song.id
        });
        
        song["isFavoriteSong"] = favoriteSong ? true : false; // xoá hoặc thêm vào mục yêu thích

        const favoriteAllSong = await FavoriteSong.find({
            // userId: "",  // Lấy ra id của người yêu thích bài hát
            deleted: false,
        }).select("songId");

        res.render("client/pages/songs/detail",{
            pageTitle: "Chi tiết bài hát",
            favoriteSong: favoriteAllSong,
            allSong: allSong,
            allSinger: allSinger,
            song: song,
            singer: singer,
            topic : topic,
        });
        
    } catch (err) {
        console.log(err);
        res.json({
            message: "Lỗi mời bạn xem lại. ",
        });
    }
}

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
    
    const idSong: string = req.params.idSong; // Lấy ra slug của song 
    const typeLike: string = req.params.typeLike; // Lấy ra slug của kiểu like (like or dislike)

    const song = await Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });


    // newLike sẽ tăng lên 1 nếu đúng like , dislike - 1
    const newLike : number = typeLike == "like" ? song.like + 1 : song.like - 1;

    await Song.updateOne({
        _id: idSong
    }, {
        like: newLike
    });
    // like: ["id_user_1", "id_user_2"] // Khi đã có tài khoản thì like nên để 1 list các người dùng

    res.json({
        code: 200,
        message: "Thành công!",
        like: newLike
    });
}

// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong; // id Bài hát

    const song = await Song.findOne({
        _id: idSong
    });
    
    const listen: number = song.listen + 1; // Tăng số lượt nghe lên
    
    await Song.updateOne({
        _id: idSong
    }, {
        listen: listen
    }); // update lại số lượt nghe
    
    const songNew = await Song.findOne({
        _id: idSong
    });
    
    res.json({
        code: 200,
        message: "Thành công!",
        listen: songNew.listen // số lượt nghe
    });
} 

// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
    // req.params lấy sau dấu / kiểu của nó
    const idSong: string = req.params.idSong;
    const typeFavorite: string = req.params.typeFavorite;

    switch (typeFavorite) {
        case "favorite": // Nếu yêu thích sẽ lấy bài hát vào và lưu trong dataabse
        // Lưu ý kiểu gì chỉ lưu 1 lần đầu cho nên kiểm tra có tồn tại chưa
            const existFavoriteSong = await FavoriteSong.findOne({
                songId: idSong
            });
            if(!existFavoriteSong) {
                const record = new FavoriteSong({
                    // userId: "",
                    songId: idSong
                });
                await record.save();
            }
            break;
        case "unfavorite":
            await FavoriteSong.deleteOne({
                songId: idSong
            });
            break;
        default:
            break;
    }

    res.json({
        code: 200,
        message: "Thành công!"
    });
}