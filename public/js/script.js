// APlayer

const aplayer = document.querySelector('#aplayer');

if (aplayer){

    let dataSong = aplayer.getAttribute('data-song');

    let dataAllSong = aplayer.getAttribute('data-allSong');

    dataAllSong = JSON.parse(dataAllSong);

    let dataAllSinger = aplayer.getAttribute('data-allSinger');

    dataAllSinger = JSON.parse(dataAllSinger);

    dataSong = JSON.parse(dataSong);

    let dataSinger = aplayer.getAttribute('data-singer');

    dataSinger = JSON.parse(dataSinger);

    const saveListSong = [];
    const saveListSongSingerId = [];
    
    for (const listSong of dataAllSong){
        if (JSON.stringify(listSong) !== JSON.stringify(dataSong)){
            saveListSong.push(listSong);
            saveListSongSingerId.push(listSong.singerId);
        }
    }

    const singerMap = [];

    dataAllSinger.forEach(singer => {
        const singerObject = {
            id: singer._id,
            fullName: singer.fullName,
        };
        singerMap.push(singerObject);
    });

    const singerMapSong = [];

    for (const listSongSinger of singerMap){
        for (const id of saveListSongSingerId){
            if (listSongSinger.id == id){
                singerMapSong.push(listSongSinger.fullName);
            }
        }
    }
    const avatar = document.querySelector('.singer-detail .inner-avatar');
    const imgAvatar = document.getElementById('imgAvatar');

    const description = document.getElementById('description');
    const lyrics = document.getElementById('lyrics');

    const allSongs = saveListSong.map(listSong => {
        return {
            name: listSong.title,
            artist: listSong.artist, 
            url: listSong.audio,
            cover: listSong.avatar,
        };
    });
    
    const ap = new APlayer({
        container: aplayer,
        // fixed: true,
        theme: '#e9e9e9',
        audio: [
            {   
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar,
            } ,
            ...allSongs,
        ],
        autoplay: true,
        volume: 0.8
    });

    // Bắt sự kiện khi bài hát bắt đầu phát
    ap.on('play', (data) => {
        const currentSong = ap.list.audios[ap.list.index];
        saveCurrentSongInfo(currentSong);
        for (const song of dataAllSong) {
            if (currentSong.name === song.title) {
                imgAvatar.src = currentSong.cover;
                description.innerHTML = song.description;
                lyrics.innerHTML = song.lyrics;
                break;
            }
        }
    });

    function saveCurrentSongInfo(currentSong) {
        const currentSongInfo = {
            name: currentSong.name,
            artist: currentSong.artist,
            url: currentSong.url,
            cover: currentSong.cover,
        };
    
        localStorage.setItem('currentSongInfo', JSON.stringify(currentSongInfo));
    }

    

    // Khi nhạc mà chạy thì cái đĩa sẽ quay
    ap.on('play', function() {
        avatar.style.animationPlayState = "running";
    });
    // Khi nhạc dừng thì cái đĩa sẽ quay
    ap.on('pause', function() {
        avatar.style.animationPlayState = "paused";
    });
}

// End APlayer

// Button Like
const buttonLike = document.querySelector("[button-like]"); // id song

if(buttonLike) {
    buttonLike.addEventListener("click", () => {

        const idSong = buttonLike.getAttribute("button-like"); // Lấy ra id Song của bài hát
        const isActive = buttonLike.classList.contains("active"); // Nếu là isActive thì nó sẽ ko bôi đậm

        const typeLike = isActive ? "dislike" : "like";

        const link = `/songs/like/${typeLike}/${idSong}`;

        console.log(link);

        const option = {
            method: "PATCH"
        }

        fetch(link,option)
            .then(res => res.json()) // in ra res.json trong controller
            .then(data => {
                if(data.code == 200) {
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like} thích`;
        
                    buttonLike.classList.toggle("active");
                }
            })
    });
}
// End Button Like

// Button Favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if(buttonFavorite) {
    buttonFavorite.addEventListener("click", () => {
        const idSong = buttonFavorite.getAttribute("button-favorite");
        const isActive = buttonFavorite.classList.contains("active");

        const typeFavorite = isActive ? "unfavorite" : "favorite";

        const link = `/songs/favorite/${typeFavorite}/${idSong}`;

        const option = {
            method: "PATCH"
        }

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if(data.code == 200) {
                    buttonFavorite.classList.toggle("active");
                }
            })
    });
}
// End Button Like
// End Button Favorite