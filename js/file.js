function saveTofile(){

    document.getElementById("popup").style.width = "300px";
    document.getElementById("popup").style.top = "0px";
    document.getElementById("popup").style.left = "0px";

    document.getElementById("popuptext").innerHTML =
        "<h2>保存文件</h2>"+
        "<div>文件名: <input type=\"text\" class=\"filename\" id=\"text-filename\" placeholder=\"filename\"/>.txt</div>" +
        "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"upyes\">确定</button>" +
        "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"upno\" >取消</button>" +
        "</div>";

    $("#upyes").on("click", function () {
        var savecontent = getCurrentGame();
        var fliename = $("#text-filename").val()!=""?$("#text-filename").val():"Monopoly";
        var blob = new Blob([savecontent], {type: "text/plain;charset=utf-8"});

        saveAs(blob, fliename+".txt");

        $.toast({
            heading: '保存成功',
            text: '文件已成功保存.',
            icon: 'success',
            position: { left : 100, right : 'auto', top : 'auto', bottom : 30 },
            hideAfter: 5000,
            loaderBg: '#FFFAFA',
        })

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


function getCurrentGame() {
    var savecontent = "";
    for (var i=0;i<pcount;i++){
        savecontent += player[i].getString(player[i]);
    }
    savecontent += "#####\n";
    for (var i=0;i<52;i++){
        savecontent += i+" "+square[i].getString(square[i]);
    }
    savecontent += "#####\n";

    var ps = document.getElementsByClassName("triangle-obtuse");
    for (var i=0; i<ps.length; i++){
        var innerHtml = ps[i].innerHTML;
        var color = ps[i].style.borderColor;
        if (color==="") color = "black";
        savecontent += color+" "+innerHtml+"\n";
    }
    savecontent += "#####\n";

    return savecontent;
}