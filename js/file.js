function saveTofile(){

    $.toast({
        heading: '保存成功',
        text: '文件已成功保存在 ~/Mono 下.',
        icon: 'success',
        position: { left : 100, right : 'auto', top : 'auto', bottom : 30 },
        hideAfter: 5000,
        loaderBg: '#FFFAFA',
    })


}


function openfile(){

    document.getElementById("popup").style.width = "300px";
    document.getElementById("popup").style.top = "0px";
    document.getElementById("popup").style.left = "0px";

    document.getElementById("popuptext").innerHTML =
        "<h4>导入</h4>" +
        "<div class=\"form-wrapper\">" +
        "<form method='post'>" +
        "<input style='max-width: 90%'  type=\"file\" name=\"text\" accept='text/plain'/>" +
        "</form></div>" +
        "<div>" +
        "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"upyes\">确定</button>" +
        "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"upno\" >取消</button>" +
        "</div>";


    $("#upyes").on("click", function () {
        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });

    $("#upno").on("click", function () {
        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });


    // Show using animation.
    $("#popupbackground").fadeIn(400, function() {
        $("#popupwrap").show();
    });
    
}