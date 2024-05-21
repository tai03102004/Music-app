// Remeber Me
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    
    return "";
}


async function setcookie() {
    var u = document.getElementById("username").value;
    var p = document.getElementById("password").value;
     // Mã hóa mật khẩu
    var hashedPassword = await bcrypt.hash(p, 10);
    document.cookie = "myusrname=" + u + ";path=http://localhost/web6pm";
    document.cookie = "mypswd=" + hashedPassword + ";path=http://localhost/web6pm";
}

// Hàm getCookieData để lấy giá trị cookie
async function getCookieData() {
    var userName = getCookie("myusrname");
    var hashedPassword = getCookie("mypswd");

    // Giả sử bạn muốn giữ mật khẩu ẩn danh và không thể giải mã
    document.getElementById("username").value = userName;
    document.getElementById("password").value = hashedPassword // Mật khẩu đã được mã hóa, không thể hiển thị
}

// Gọi hàm getCookieData khi trang web được tải
window.onload = getCookieData;

// End Remeber Me