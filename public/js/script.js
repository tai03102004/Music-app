// APlayer

const aplayer = document.querySelector('#aplayer');

if (aplayer){
    // Bài hát khi click vào
    let dataSong = aplayer.getAttribute('data-song');
    dataSong = JSON.parse(dataSong);

    // Tất cả bài hát trong mục ưu thích

    let favoriteSong = aplayer.getAttribute('data-favorite'); 
    favoriteSong = JSON.parse(favoriteSong);

    // Tất cả bài hát 
    let dataAllSong = aplayer.getAttribute('data-allSong');
    dataAllSong = JSON.parse(dataAllSong);

    // Tất cả ca sĩ
    let dataAllSinger = aplayer.getAttribute('data-allSinger');
    dataAllSinger = JSON.parse(dataAllSinger);

    // Lấy đúng 1 ca sĩ
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
    console.log(dataSong.lyrics);
    
    const ap = new APlayer({
        container: aplayer,
        // fixed: true,
        theme: '#e9e9e9',
        lrcType: 1,
        audio: [
            {   
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar,
                lrc: dataSong.lyrics
                
            } ,
            ...allSongs,
        ],
        autoplay: true,
        volume: 0.8
    });

    ap.on('ended', function() {
        const link = `/songs/listen/${dataSong._id}`;

        const option = {
            method : "PATCH",
        }
        fetch(link,option)
            .then(res => res.json()) // in ra res.json trong controller
            .then(data => {
                console.log(data);
                if(data.code == 200) { // Nếu mà thành công
                    const elementListenSpan = document.querySelector(".singer-detail .inner-listen span");
                    elementListenSpan.innerHTML = `${data.listen} lượt nghe`; // Hiển thị số lượt nghe luôn
                }
            })
    })
    // console.log(favoriteSong);

    const boxSuggest = document.querySelector(".inner-suggest-1");
    // Bắt sự kiện khi bài hát bắt đầu phát
    ap.on('play', (data) => {
        const currentSong = ap.list.audios[ap.list.index];
        saveCurrentSongInfo(currentSong);
        for (const song of dataAllSong) {
            if (currentSong.name === song.title) {
                const isFavorite = favoriteSong.some(songFavorite => songFavorite.songId === song._id);
                const classAttribute = isFavorite ? "active" : "" ;
                const newUrl = `/songs/detail/${song.slug}`; 
                window.history.pushState({}, '', newUrl);
                imgAvatar.src = currentSong.cover;
                description.innerHTML = song.description;
                lyrics.innerHTML = song.lyrics;
                const htmls = `
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-actions">
                        <div class="inner-action inner-time"><i class="fa-regular fa-clock" aria-hidden="true"></i> 20/10/2023</div>
                        <div class="inner-action inner-singer"><i class="fa-solid fa-microphone-lines" aria-hidden="true"></i>${currentSong.artist}</div>
                        <div class="inner-action inner-topic"><i class="fa-solid fa-music" aria-hidden="true"></i> Nhạc trẻ</div>
                        <div class="inner-action inner-listen"><i class="fa-solid fa-headphones" aria-hidden="true"></i><span>${song.listen}</span></div>
                        <div class="inner-action inner-like" button-like=${song._id}><i class="fa-regular fa-thumbs-up" aria-hidden="true"></i><span>${song.like}</span></div>
                        <div class= "inner-action inner-heart " + ${classAttribute} button-favorite=${song._id}><i class="fa-regular fa-heart" aria-hidden="true"></i> Bài hát yêu thích</div>
                    </div>
                
                `
                const boxList = boxSuggest.querySelector(".inner-list-1");
                boxList.innerHTML = htmls;
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
                if(data.code == 200) { // Nếu mà thành công
                    const span = buttonLike.querySelector("span");
                    // Lấy ra thẻ span và thêm thích vào
                    span.innerHTML = `${data.like} thích`;
                    buttonLike.classList.toggle("active");
                }
            })
    });
}
// End Button Like

// Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite.length > 0) {
    listButtonFavorite.forEach((buttonFavorite)=>{
        buttonFavorite.addEventListener("click", () => {
            // Lấy ra id Song
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const typeActive = buttonFavorite.classList.contains("active");
            // Lấy ra kiểu Favorite
            const typeFavorite = typeActive ? "unfavorite" :  "favorite";
            const link = `/songs/favorite/${typeFavorite}/${idSong}`;
            const option = {
                method : "PATCH",
            }
            fetch(link,option)
                .then(res => res.json())
                .then(data =>{
                    if (data.code == 200) {
                        buttonFavorite.classList.toggle("active");
                    }
                })
        });
    });
}

// End Button Favorite

// Search Suggest

const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = document.querySelector(".inner-suggest");

    input.addEventListener("keyup", ()=> {

        const keyword = input.value; // Lấy ra được nút khi gõ
        const link = `/search/suggest?keyword=${keyword}`;

        fetch(link)
            .then(res => res.json())
            .then(data =>{
                const songs = data.songs;
                if (songs.length > 0) {
                    boxSuggest.classList.add("show");

                    const htmls = songs.map(song => {
                        return `
                            <a class="inner-item" href="/songs/detail/${song.slug}">
                                <div class="inner-image"><img src="${song.avatar}" /></div>
                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>
                                    <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                                </div>
                            </a>
                        `;
                    });
                    const boxList = boxSuggest.querySelector(".inner-list");
                    boxList.innerHTML = htmls.join("");// Biến mảng thành chuỗi String
                } else {
                    boxSuggest.classList.remove("show");
                }
            })
    })
}

// End Search Suggest

