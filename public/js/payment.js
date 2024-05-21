$(document).ready(function() {
    $(".generate_qr").click(function() {
        $(".form").hide();
        $(".qr_code").show();
    });
    $(".download_now").click(function() {
        var name = $(".name").val();
        var num = $(".number").val();
        var email = $(".email").val();
        var id = $(".id").val();
        if (num != "" && name != "" && email != "" && id != "") {
            /*$.post("back.php",{name:name,num:num,email:email,id:id},function(res) {
                if(res==1){

                }
                else{

                }
            });*/
        } else {
            alert("Fill all fields correctly");
        }
    });
});