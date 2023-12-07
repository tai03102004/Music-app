// search.js
function searchSongs() {
    var keyword = $('[name="keyword"]').val();

    $.ajax({
        type: 'GET',
        url: '/search/result',
        data: { keyword: keyword },
        success: function(data) {
            $('.row').html(data);
        },
        error: function(error) {
            console.error('Lỗi:', error);
        }
    });
}
