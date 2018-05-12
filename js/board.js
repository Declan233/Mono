
window.onload = function() {
    initBoard();
    initPlayers();
    $("#endTurn").prop('disabled', true);
    game = new Game();
    //当掷骰子按钮被按下后
    $("#rollbtn").click(game.next);

    deed();

    endTurn();

}


var hh = sessionStorage.getItem("playinfo");//获取键为allJson的字符串
var playersinfo = JSON.parse(hh);//将字符串抓换成对象
var game;
var player = [];
var pcount = parseInt(playersinfo.pcount,10);
var turn = 0, doublecount = 0;
var dir = 1, rate=1, round=0 ,round2=0, round3=0;
var holdtime = 1200;



var app = angular.module('myApp', []);
app.controller("moneybar",function ($scope,$interval)
{
    for (var i = 0; i < pcount; i++)
        player[i] = new Player(playersinfo.players[i].name, playersinfo.players[i].color,playersinfo.players[i].token,i);


    if(playersinfo.rload==true) {
        console.log(playersinfo);
        for (var i = 0; i < pcount; i++) {
            player[i].id = parseInt(playersinfo.players[i].id);
            player[i].money = parseInt(playersinfo.players[i].money);
            if(playersinfo.players[i].position=="20_5")
                player[i].position = "20_5";
            else
                player[i].position = parseInt(playersinfo.players[i].position);
            if (playersinfo.players[i].jail=="false")
                player[i].jail = false;
            else
                player[i].jail = true;
            player[i].jailroll = parseInt(playersinfo.players[i].jailroll);
            player[i].JailCard = parseInt(playersinfo.players[i].JailCard);
        }

        for (var i=1;i<playersinfo.pops.length-1;i++) {
            var disarea = document.getElementById("displayInfo");
            var info = disarea.appendChild(document.createElement("p"));
            info.className = "triangle-obtuse";
            info.innerText = playersinfo.pops[i].split(": ")[1];
            info.style.borderColor = playersinfo.pops[i].split(": ")[0];
        }

    }

    $scope.ps = player;

    $interval(function(){
        $scope.ps = player;
    },2000);

})


/**
 * 棋盘初始化
 */
function initBoard()
{
    var enlargeWrap = document.body.appendChild(document.createElement("div"));

    enlargeWrap.id = "enlarge-wrap";

    var HTML = "";
    for (var i = 0; i < 52; i++) {
        if(i!=21){
            HTML += "<div id='enlarge" + i + "' class='enlarge'>";
            HTML += "<div id='enlarge" + i + "color' class='enlarge-color'></div><br/>" +
                "<div id='enlarge" + i + "name' class='enlarge-name'></div>";
            HTML += "<br /><div id='enlarge" + i + "price' class='enlarge-price'></div>";
            HTML += "<br /><div id='enlarge" + i + "token' class='enlarge-token'></div></div>";
        }else{
            HTML+= "<div id='enlarge20_5' class='enlarge'>";
            HTML += "<div id='enlarge20_5color' class='enlarge-color'></div><br/>" +
                "<div id='enlarge20_5name' class='enlarge-name'>监狱</div>";
            HTML += "<br /><div id='enlarge20_5price' class='enlarge-price'></div>";
            HTML += "<br /><div id='enlarge20_5token' class='enlarge-token'></div></div>";
        }
    }
    enlargeWrap.innerHTML = HTML;


    var top = $(".quickFlip").offset().top;
    document.getElementById("shield").style.top = top+"px";

    for(var i=0;i<52;i++){
        if(i!=21&&square[i].groupNumber!=0&&square[i].groupNumber!=1&&square[i].groupNumber!=2){
        var cell = document.getElementById("cell" +i);
            cell.innerHTML +=
                "<div class='cellinnerwrap'>" +
                    "<div class='owenerholder' id='owenerholder"+i+"'></div>" +
                    "<div class='innerSquare' onmousemove='mouse("+i+")' style='border: 5px solid "+square[i].color+"'>"+square[i].name+"</div>" +
                    "<div class='holderposition' id='holder"+i+"'></div>" +
                "</div>";
        }else if(i!=21&&(square[i].groupNumber==0||square[i].groupNumber==2)){
            var cell = document.getElementById("cell" +i);
            cell.innerHTML +=
                "<div class='cellinnerwrap' onmousemove='mouse("+i+")'>" +
                "<div class='owenerholder' id='owenerholder"+i+"' style='margin: 2px'>"+square[i].name+"</div>" +
                "<div class='innerSquare' style='background: url("+square[i].color+") no-repeat center; background-size: 90% 110%; width: 100%; '></div>" +
                "<div class='holderposition' id='holder"+i+"'></div>" +
                "</div>";
        }else if(square[i].groupNumber==1){
            var cell = document.getElementById("cell" +i);
            cell.innerHTML +=
                "<div class='cellinnerwrap' onmousemove='mouse("+i+")'>" +
                "<div class='owenerholder' id='owenerholder"+i+"' style='margin: 2px'></div>" +
                "<div class='innerSquare' style='background: url("+square[i].color+") no-repeat center; background-size: 90% 110%; width: 100%;color:lightgoldenrodyellow'>"+square[i].name+"</div>" +
                "<div class='holderposition' id='holder"+i+"'></div>" +
                "</div>";
        }
    }
    $("#arrow1").show();
}

/**
 * 玩家初始化
 */
function initPlayers()
{
    var holder = document.getElementById("holder0");

    console.log(player);
    for (var y = 0; y < pcount; y++) {
        holder.innerHTML += "<span class='glyphicon glyphicon-"+ player[y].token +"' title='" + player[y].name + "' aria-hidden='true' style='color: " + player[y].color + ";'></span>";

    }

}

//显示当前房产结果
function showStats()
{
    var HTML, sq, p;
    var mortgagetext,
        housetext;
    var write;

    HTML = "<table align='center'><tr>";
    for (var x = 0; x < pcount; x++) {
        write = false;
        p = player[x];
        if (x == 4) {
            HTML += "</tr><tr>";
        }
        HTML += "<td class='statscell' id='statscell" + x + "' style='border: 2px solid "
            + p.color + "' ><div class='statsplayername'>" + p.name + "</div>";

        for (var i = 0; i < 52; i++) {
            sq = square[i];

            if (sq.owner == p.id) {
                mortgagetext = "",
                    housetext = "";

                if (sq.mortgage) {
                    mortgagetext = "title='Mortgaged' style='color: grey;'";
                }

                if (!write) {
                    write = true;
                    HTML += "<table>";
                }

                HTML += "<tr><td class='statscellcolor' style='background: " + sq.color + ";";

                if (sq.groupNumber == 1 || sq.groupNumber == 2) {
                    HTML += " border: 1px solid grey;";
                }

                HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='statscellname' " + mortgagetext + ">" + sq.name + housetext + "</td>" +
                    "<td class='statscelllevel'>"+sq.level+" 级</td></tr>";
            }
        }
        if (p.JailCard) {
            if (!write) {
                write = true;
                HTML += "<table>";
            }
            HTML += "<tr><td class='statscellcolor'></td><td class='statscellname'>出狱卡</td><td class='statscelllevel'>"+p.JailCard+"张</td></tr>";

        }

        if (!write) {
            HTML += p.name + " 没有任何财产。";
        } else {
            HTML += "</table>";
        }

        HTML += "</td>";
    }
    HTML += "</tr></table>" ;// "<div id='titledeed'></div>";

    document.getElementById("statstext").innerHTML = HTML;
    // Show using animation.
    $("#statsbackground").fadeIn(400, function() {
        $("#statswrap").show();
    });
    $("#statsclose, #statsbackground").on("click", function() {
        $("#statswrap").hide();
        $("#statsbackground").fadeOut(400);
    });
}

function trade()
{
    var p = player[turn];

    document.getElementById("popup").style.width = "400px";
    document.getElementById("popup").style.top = "0px";
    document.getElementById("popup").style.left = "0px";
    var s=0,b=0;
    var html;
    var htmls = "<table id='selllist' align='center'><tr><td colspan='2'><input onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" id='selloutp' type='text' placeholder='输入出售价'/></td><td>" +
        "<div>" +
        "<select name=\"selectAge\" id=\"selectplayer\">";
    for (var i=0;i<pcount;i++){
        if(player[i].id!=p.id){
            htmls += "<option value='"+player[i].id+"'>"+player[i].name+"</option>";
        }
    }

    htmls += "</select></div></td><td>&nbsp;&nbsp;等级</td></tr>";
    var htmlb = "<table id='buylist' align='center'><tr><td colspan='3'><input onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" id='buyinp' type='text' placeholder='输入购买价'/></td><td>&nbsp;&nbsp;拥有者&nbsp;&nbsp;</td><td>&nbsp;&nbsp;等级</td></tr>";

    document.getElementById("popuptext").innerHTML = "<h4>交易</h4>"+
        "<ul class=\"nav nav-tabs\" role=\"tablist\">" +
            "<li role=\"presentation\" class=\"active\"><a href=\"#sell\" role=\"tab\" data-toggle=\"tab\">出售</a></li>" +
            "<li role=\"presentation\"><a href=\"#buy\" role=\"tab\" data-toggle=\"tab\">购买</a></li>" +
        "</ul>";

    for(var i=0;i<square.length;i++){
        if(square[i].owner==p.id&&!square[i].mortgage){
            s += 1;
            htmls += "<tr><td class='mbtn'><input type=\"radio\" name=\"radio1\" value='"+i+"' /></td>" +
                "<td class='statscellcolor' style='background: " + square[i].color+";border: 1px solid grey;' onmouseover='showdeed("+i+");' onmouseout='hidedeed();'></td>"+
                "<td class='mname2'>"+square[i].name+"</td><td>"+square[i].level+"级</td></tr>";
        }else if(square[i].owner!=-1&&square[i].owner!=p.id&&!square[i].mortgage) {
            b += 1;
            htmlb += "<tr><td class='mbtn'><input type=\"radio\" name=\"radio2\" value='"+i+"' /></td>" +
                "<td class='statscellcolor' style='background: " + square[i].color + ";border: 1px solid grey;' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td>" +
                "<td class='mname2'>" + square[i].name + "</td><td>"+player[getIndexbyId(square[i].owner)].name+"</td><td>"+square[i].level+"级</td></tr>";
        }
    }
    if(p.JailCard>0){
        htmls += "<tr><td class='mbtn'><input type=\"radio\" name=\"radio1\" value='100' /></td><td></td>"+
            "<td class='mname2'>免费出狱卡</td><td>"+p.JailCard+"张</td></tr>";
        s+=1;
    }
    for(var i=0;i<pcount;i++) {
        if (player[i].id != p.id && player[i].JailCard > 0)
            htmlb += "<tr><td class='mbtn'><input type=\"radio\" name=\"radio2\" value='100' /></td><td></td><td>免费出狱卡</td>" +
                "<td class='mname2'>" + player[i].name + "</td><td>" + p.JailCard + "张</td></tr>";
        b+=1;
    }

    if(s>0) {
        htmls += "</table><br><div>" +
            "<button type=\"button\" class='btn btn-success' value=\"Yes\" onclick='sellpropose()'>发起出售交易</button>" +
            "<button type=\"button\" class='cancle btn btn-warning' value=\"No\" >取消</button></div>";
    }else
        htmls = "无可出售物品" +
            "<div><button type=\"button\" class='cancle btn btn-warning' value=\"No\" >取消</button></div>";
    if(b>0) {
        htmlb += "</table><br><div>" +
            "<button type=\"button\" class='btn btn-success' value=\"Yes\" onclick='buypropose()'>发起购买交易</button>" +
            "<button type=\"button\" class='cancle btn btn-warning' value=\"No\" >取消</button></div>";
    }else
        htmlb = "无可购买物品" +
            "<div><button type=\"button\" class='cancle btn btn-warning' value=\"No\" >取消</button></div>";


    html = "<div class=\"tab-content\">";
    html += "<div role=\"tabpanel\" class=\"active tab-pane\" id=\"sell\">"+htmls+"</div>";
    html += "<div role=\"tabpanel\" class=\"tab-pane\" id=\"buy\">"+htmlb+"</div></div>";



    document.getElementById("popuptext").innerHTML += html;


    $(".cancle").on("click", function () {

        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });

    // Show using animation.
    $("#popupbackground").fadeIn(400, function() {
        $("#popupwrap").show();
    });
}

function sellpropose()
{
    var f = $("input[name='radio1']:checked").val();
    var m = $("#selloutp").val();
    var pid = $("#selectplayer").val();
    if(isNaN(f)) {alert("请选择一个房产或者出狱卡进行出售");return;}
    if(!(m>0)) {alert("请输入出售价格");return;}
    infoDisplay(player[turn].name+" 向 "+player[getIndexbyId(pid)].name+" 发起出售交易：$"+m+" 出售 "+square[f].name,"black",2,player[turn].id,pid,f,m);

    $("#popupwrap").hide();
    $("#popupbackground").fadeOut(400);
}

function buypropose()
{
    var f = $("input[name='radio2']:checked").val();
    var m = $("#buyinp").val();
    if(isNaN(f)) {alert("请选择一个房产或者出狱卡购买");return;}
    if(!(m>0)) {alert("请输入购买价格");return;}

    infoDisplay(player[turn].name+" 向 "+player[getIndexbyId(square[f].owner)].name+" 发起出售交易：$"+m+" 收购 "+square[f].name,"black",3,square[f].owner,player[turn].id,f,m);



    $("#popupwrap").hide();
    $("#popupbackground").fadeOut(400);
}

function mortgage()
{
    var p = player[turn];

    document.getElementById("popup").style.width = "300px";
    document.getElementById("popup").style.top = "0px";
    document.getElementById("popup").style.left = "0px";
    var j=0,html="<table align='center'>";
    document.getElementById("popuptext").innerHTML ="<h4>"+p.name+"地产</h4>";

    for(var i=0;i<square.length;i++){
        if(p.id==square[i].owner&&!square[i].mortgage){
            j++;
            html += "<tr><td class='mbtn'><button type=\"button\" class='btn-success' onclick='cfmortage("+i+")'>抵押</button></td>" +
                "<td class='statscellcolor' style='background: " + square[i].color+";border: 1px solid grey;' onmouseover='showdeed("+i+");' onmouseout='hidedeed();'></td>"+
                "<td class='mname'>"+square[i].name+
                "</td><td class='mvalue'>抵押 $"+parseInt(square[i].price/2+square[i].level*(square[i].houseprice/2))+"</td></tr>";
        }
        else if(p.id==square[i].owner&&square[i].mortgage){
            j++;
            html += "<tr><td class='mbtn'><button type=\"button\" class='btn-warning' onclick='unmortage("+i+")'>赎回</button></td>" +
                "<td class='statscellcolor' style='background: " + square[i].color+";border: 1px solid grey;' onmouseover='showdeed("+i+");' onmouseout='hidedeed();'></td>"+
                "<td class='mname'>"+square[i].name+
                "</td><td class='mvalue'>赎回 $"+parseInt(1.1*(square[i].price/2+square[i].level*(square[i].houseprice/2)))+"</td></tr>";
        }
    }

    if(j==0){
        html += "无可抵押或赎回的地产</table>";
    }
    document.getElementById("popuptext").innerHTML += html;
    document.getElementById("popuptext").innerHTML +=
        "<br><div>" +
        "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"levelupno\" >取消</button>" +
        "</div>";


    $("#levelupno").on("click", function () {

        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });

    // Show using animation.
    $("#popupbackground").fadeIn(400, function() {
        $("#popupwrap").show();
    });
}

function cfmortage(index)
{
    var fare;
    fare = square[index].price/2+square[index].level*(square[index].houseprice/2);
    game.addMoney(fare,player[turn].id);
    square[index].mortgage = true;
    infoDisplay(player[turn].name+" 抵押了房产 "+square[index].name+" 获得了 $"+fare+" 在赎回来前，经过用户不用交租，如果是特殊地产，则其特殊功能也将停止.");
    $("#levelupno").trigger("click");
    $("#mortgagebtn").trigger("click");
}

function unmortage(index)
{
    var fare = square[index].price/2+square[index].level*(square[index].houseprice/2);
    fare = parseInt(fare*1.1);
    game.addMoney(-fare,player[turn].id);
    square[index].mortgage = false;
    infoDisplay(player[turn].name+" 花费了 $"+fare+" 赎回了房产 "+square[index].name+" 房产事件将恢复.");
    $("#levelupno").trigger("click");
    $("#mortgagebtn").trigger("click");

}

/**
 * 游戏
 * @constructor
 */
function Game()
{
    var die1;//骰子1
    var die2;//骰子2
    var Rent;


    this.rollDice = function(){
        var dice1 = $("#dice1");
        var dice2 = $("#dice2");
        $(".dicewrap").append("<div id='dice_mask'></div>");//加遮罩
        dice1.attr("class","dice col-md-4");//清除上次动画后的点数
        dice2.attr("class","dice col-md-4");//清除上次动画后的点数
        dice1.css('cursor','default');
        dice2.css('cursor','default');
        var num1 = Math.floor(Math.random()*6+1);//产生随机数1-6
        var num2 = Math.floor(Math.random()*6+1);//产生随机数1-6
        dice1.animate({left: '+2px'}, 100,function(){
            dice1.addClass("dice_t");
        }).delay(100).animate({top:'-2px'},100,function(){
            dice1.removeClass("dice_t").addClass("dice_s");
        }).delay(100).animate({opacity: 'show'},600,function(){
            dice1.removeClass("dice_s").addClass("dice_e");
        }).delay(50).animate({left:'-2px',top:'2px'},100,function(){
            dice1.removeClass("dice_e").addClass("dice_"+num1);
            dice1.css('cursor','pointer');
            $("#dice_mask").remove();//移除遮罩
        });
        dice2.animate({left: '+2px'}, 100,function(){
            dice2.addClass("dice_t");
        }).delay(100).animate({top:'-2px'},100,function(){
            dice2.removeClass("dice_t").addClass("dice_s");
        }).delay(100).animate({opacity: 'show'},600,function(){
            dice2.removeClass("dice_s").addClass("dice_e");
        }).delay(50).animate({left:'-2px',top:'2px'},100,function(){
            dice2.removeClass("dice_e").addClass("dice_"+num2);
            dice2.css('cursor','pointer');
            $("#dice_mask").remove();//移除遮罩
        });
        $("#rollbtn").prop('disabled', true);
        die1 = num1;die2 = num2;
        doublecount++;
    };//随机生成骰子点数

    this.next = function() {
        if (player[turn].money < 0) {

            document.getElementById("popup").style.width = "300px";
            document.getElementById("popup").style.top = "0px";
            document.getElementById("popup").style.left = "0px";

            document.getElementById("popuptext").innerHTML =  "<h4>提示</h4>" +
                "<div>现金低于0，您需要进行抵押或者出售财产才能继续游戏!</div>" ;

                document.getElementById("popuptext").innerHTML +=
                    "<div>" +
                    "<button type=\"button\" class=\"btn btn-success \" onclick=\"trade()\">交易</button>\n" +
                    "<button type=\"button\" class=\"btn btn-primary \" onclick=\"mortgage()\">抵押</button>" +
                    "<button type=\"button\" class=\"btn btn-danger hhhh\" onclick=\"bankrupt()\">认输</button>"+
                    "</div>";

            $(".hhhh").on("click", function () {
                $("#popupwrap").hide();
                $("#popupbackground").fadeOut(400);
            });


            // Show using animation.
            $("#popupbackground").fadeIn(400, function() {
                $("#popupwrap").show();
            });

        } else {//继续游戏
            roll();
        }
    };

    this.getDie = function(die) {
        if (die === 1) {
            return die1;
        } else {
            return die2;
        }
    };//获取骰子点数

    this.over = function () {
        popup(100,6);
    }

    this.pay = function() {
        var p = player[turn];
        var s = square[p.position];
        var rent = 0;
        switch (s.level){
            case 0:
                rent = s.rent0;
                break;
            case 1:
                rent = s.rent1;
                break;
            case 2:
                rent = s.rent2;
                break;
            case 3:
                rent = s.rent3;
                break;
            case 4:
                rent = s.rent4;
                break;
            case 5:
                rent = s.rent5;
                break;
        }
        rent = parseInt(rent*rate);
        if(p.id!=square[25].owner||round3==0){
        game.addMoney(-rent,p.id);
        game.addMoney(rent,s.owner);
        toast(p.name+" 支付了 $"+rent+" 给 "+player[getIndexbyId(s.owner)].name,p.color,1);
        }else{
            infoDisplay("作为ORACLE的拥有者 "+p.name+" 该回合免税" );rent=0;
        }
        Rent = rent;
    }

    this.goToJail = function (){
        var p = player[turn];
        var start = p.position;
        var end = "20_5";
        p.jail = true;
        p.position = "20_5";
        updatePosition(start,end);
        infoDisplay(p.name+" 进了监狱");

        setTimeout(autoendturn,holdtime);

        function autoendturn() {
            //自动结束当前回合，进入下一个玩家的回合
            $("#endTurn").prop('disabled', true);
            $("#rollbtn").prop('disabled', false);
            $("#arrow"+(turn+1) ).hide();
            turn++;
            if (turn == pcount) {
                turn = 0;
                if (round != 0) {
                    round--;
                } else if (round == 0 && dir == -1) {
                    dir = 1;
                    infoDisplay("行走方向恢复为顺时针");
                }
                if (round2 != 0) {
                    round2--;
                } else if (round2 == 0 && rate != 1) {
                    rate = 1;
                    infoDisplay("租金收取恢复正常");
                }
                if (round3 != 0) {
                    round3--;
                }
            }
            doublecount = 0;
            $("#arrow"+(turn+1)).show();
        }

    }

    this.buy = function (position,id,type,trade) {
        square[position].owner = id;
        document.getElementById("owenerholder" + position).style.border = "2px solid " + player[getIndexbyId(id)].color;
        if(type==0) {
            document.getElementById("owenerholder" + position).innerText = "Level 0";
        }else if(type==1||type==5){
            document.getElementById("owenerholder" + position).innerText = player[turn].name;
        }
        if(type==5){
            game.addMoney(-50, player[turn].id);
            infoDisplay(player[turn].name + " 花费了 $50 购买了房产：" + square[position].name, player[turn].color);
        } else {
            game.addMoney(-square[position].price, player[turn].id);
            infoDisplay(player[turn].name + " 花费了 $" + square[position].price + " 购买了房产：" + square[position].name, player[turn].color);
        }
        raiserent();

    }

    this.addMoney = function (num,id) {
        player[getIndexbyId(id)].money += num;
    }

    this.pickCard = function () {
        var index = Math.floor(Math.random()*30);
        // var index = 5;
        var card = chanceCards[index];
        $("#cc1").trigger("click");
        var cc2 = document.getElementById("cc2");
        var cccontent = document.getElementById("cccontent");
        cc2.innerHTML = "运气卡 "+(index+1);
        cccontent.innerHTML = card.text;
        infoDisplay(player[turn].name+" 抽到运气卡："+card.text);
        card.action(player[turn]);

        setTimeout(function () {
            $("#cc2").trigger("click");
        },holdtime*3);
    }
    
    this.accountant = function (p) {
        var str,prop,comp,card;
        var j=0,k=0;
        prop = "    房产有：";
        comp = "    公司有：";
        card = "    免费出狱卡："+p.JailCard+"张(每张价值 $50);";
        for (var i=0;i<52;i++){
            if(square[i].owner==p.id){
                if(square[i].groupNumber==1){
                    k++;
                    comp += square[i].name+"(价值 $"+square[i].price+"); ";
                }else{
                    j++;
                    prop += square[i].name+"(价值 $"+(square[i].price + square[i].level*square[i].houseprice)+"); ";
                }
            }
        }
        str = "账户：$"+p.money;
        if(j>0)
            str += prop;
        if(k>0)
            str += comp;
        if(p.JailCard>0)
            str += card;
        return str;
    }

    this.JailCard = function () {
        var p = player[turn];
        document.getElementById("popup").style.width = "300px";
        document.getElementById("popup").style.top = "0px";
        document.getElementById("popup").style.left = "0px";

        document.getElementById("popuptext").innerHTML =
            "<h4>提示</h4>" +
            "<div>您目前有"+p.JailCard+"张免费出狱卡，是否使用？</div>" ;

            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"levelupyes\">使用</button>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"levelupno\" >取消</button>" +
                "</div>";

            $("#levelupyes").on("click", function () {
                p.JailCard--;
                p.jail = false;
                p.jailroll = 0;
                doublecount = 0;
                p.position = 21;
                updatePosition("20_5",21);
                infoDisplay(p.name + " 使用了免费出狱卡以此出狱.");
                $("#popupwrap").hide();
                $("#popupbackground").fadeOut(400);
            });



        $("#levelupno").on("click", function () {
            $("#popupwrap").hide();
            $("#popupbackground").fadeOut(400);
        });


        // Show using animation.
        $("#popupbackground").fadeIn(400, function() {
            $("#popupwrap").show();
        });

    }

}

function roll()
{
    var p = player[turn];

    game.rollDice();
    var die1 = game.getDie(1);
    var die2 = game.getDie(2);
    var start = p.position;
    var end = 0;

    if (die1 == die2 && !p.jail)
    {//相同数且不在监狱
        if (doublecount < 3) {
            //相同数次数小于3
            p.position += (die1 + die2)*dir;
            end = p.position;
            if (p.position >= 52&&dir==1) {
                p.position -= 52;
                end = p.position;
                game.addMoney(500,p.id);
                toast(p.name+" 经过起点获得 $500 基金.",p.color,1);
            }else if(p.position <= 0&&dir==-1){
                if(p.position != 0)
                    p.position += 52;
                end = p.position;
                game.addMoney(500,p.id);
                toast(p.name+" 经过起点获得 $500 基金.",p.color,1);
            }
            toast(p.name+" 扔出了: "+(die1+die2)+" -- 相同数，到达了 " + square[p.position].name+" 同时获得再掷一次的机会.",p.color,2);
            updatePosition(start,end);//更新位置
            setTimeout(land,holdtime);//执行方格内容
            $("#rollbtn").prop('disabled', false);
        } else if (doublecount === 3) {
            p.jail = true;
            doublecount = 0;
            infoDisplay(p.name + " 连续三次掷出了双数");
            popup(35,2);
            game.goToJail();
        }
        return;
    }
    else if(p.jail === true) {//在监狱
        p.jailroll++;
        if (die1 === die2) {//相同数可出狱
            document.getElementById("jail").style.border = "1px solid black";
            document.getElementById("cell11").style.border = "2px solid" + p.color;
            p.jail = false;
            p.jailroll = 0;
            p.position = 21 + (die1 + die2)*dir;end = p.position;
            doublecount = 0;
            infoDisplay(p.name + " 掷出了双数，离开了监狱.");
        }else {//不同数
            if (p.jailroll >= 3) {//连续三回合可交50罚款出狱
                popup(21,3);
                return;
            }else {//继续监狱生活
                toast(p.name+"未能掷出相同数，继续在监狱呆着.",p.color,2);
                if(p.JailCard>0){
                    game.JailCard();
                }
                $("#endTurn").prop('disabled', false);
                return;
            }
        }
        doublecount = 0;
    }else {//不是相同数
        p.position += (die1 + die2)*dir;end = p.position;
    }
    if (p.position >= 52&&dir==1) {
        p.position -= 52;end = p.position;
        game.addMoney(500,p.id);
        toast(p.name+" 经过起点获得 $500 基金.",p.color,1);
    }else if(p.position < 0&&dir==-1){
        p.position += 52;end = p.position;
        game.addMoney(500,p.id);
        toast(p.name+" 经过起点获得 $500 基金.",p.color,1);
    }
    toast(p.name+" 扔出了: "+(die1+die2)+" 到达了 "+square[p.position].name,p.color,2);
    updatePosition(start,end);//更新位置
    setTimeout(land,holdtime);//执行方格内容
    $("#endTurn").prop('disabled', false);

}

function updatePosition(start,end)
{
    var sq;
    for (var x = 0; x < 52; x++) {
        sq = square[x];
        var holder = document.getElementById("holder" + x);
        holder.innerHTML="";
        for (var y = 0; y < pcount; y++) {
            if (player[y].position == x && y!=turn && !player[y].jail)
                holder.innerHTML += "<span class='glyphicon glyphicon-"+ player[y].token +"' title='" + player[y].name + "' aria-hidden='true' style='color: " + player[y].color + ";'></span>";
        }
    }
    var holder = document.getElementById("holder20_5");
    holder.innerHTML = "";
    for (var y = 0; y < pcount; y++) {
        if (player[y].position == "20_5" && y!=turn)
            holder.innerHTML += "<span class='glyphicon glyphicon-"+ player[y].token +"' title='" + player[y].name + "' aria-hidden='true' style='color: " + player[y].color + ";'></span>";
    }

    if(start!=100&&end!=100){
        //跳跃动画
        var p1 = $("#holder" + start);
        var p2 = $("#holder" + end);
        var p1_top = p1.offset().top;
        var p1_left= p1.offset().left+38;
        var p2_top = p2.offset().top;
        var p2_left = p2.offset().left+38;

        var movingcube = document.getElementById("movingicon");
        movingcube.className = "glyphicon glyphicon-"+player[turn].token;
        movingcube.style.color = player[turn].color;
        $("#movingicon").show();

        var ss = document.styleSheets[3];
        ss.deleteRule(1);

        var rule = "@keyframes move{" +
            "    0% {top:"+p1_top+"px;left:"+p1_left+"px;font-size:12px;}" +
            "    50% {font-size:40px;}" +
            "    100% {top:"+p2_top+"px;left:"+p2_left+"px;font-size:12px;}" +
            "}";
        ss.insertRule(rule,1);
        
        setTimeout(draw,holdtime);
        function draw() {
            document.getElementById("holder" + end).innerHTML +=
                "<span class='glyphicon glyphicon-"+ player[turn].token +"' title='" + player[turn].name + "' aria-hidden='true' style='color: " + player[turn].color + ";'></span>";
        }


    }


}


function toast(msg,color,type){
    var heading='';
    if(type==1){ }else if(type==2){ heading="抵达"; }
    $.toast({
        text: msg, // Text that is to be shown in the toast
        heading: heading, // Optional heading to be shown on the toast

        showHideTransition: 'slide', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 5000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 6, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time

        position: 'bottom-center',
        bgColor: color+'',  // Background color of the toast
        textColor: '#eeeeee',  // Text color of the toast
        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#23bcc6',  // Background color of the toast loader
        beforeShow: function () {}, // will be triggered before the toast is shown
        afterShown: function () {}, // will be triggered after the toat has been shown
        beforeHide: function () {}, // will be triggered before the toast gets hidden
        afterHidden: function () {}  // will be triggered after the toast has been hidden
    });
}

function infoDisplay(msg,color,tradetype,seller,buyer,sid,money)
{

    var disarea = document.getElementById("displayInfo");
    var info = disarea.appendChild(document.createElement("p"));
    info.className = "triangle-obtuse";
    info.innerText = msg;
    if(tradetype>1){
        var accepte = info.appendChild(document.createElement("a"));
        accepte.innerText = "    接受";
        var ignore = info.appendChild(document.createElement("a"));
        ignore.innerText = "     忽略";
        accepte.onclick = function () {
            info.removeChild(accepte);
            info.removeChild(ignore);
            acceptSellDeal(tradetype,seller,buyer,sid,money);
        };
        ignore.onclick = function () {
            info.removeChild(accepte);
            info.removeChild(ignore);
        }
        setTimeout(function () {
            if(info.childNodes.length>1) {
                info.removeChild(accepte);
                info.removeChild(ignore);
                infoDisplay("交易超时已经自动取消");
            }
        },holdtime*10);

    }
    info.style.borderColor = color;


    $("#displayInfo").scrollTop($("#displayInfo").prop("scrollHeight"));
}

function acceptSellDeal(tradetype,seller,buyer,sid,money) {
    if(tradetype==2&&sid!=100){
        game.addMoney(parseInt(money),seller);
        game.addMoney(-money,buyer);
        square[sid].owner=buyer;
        document.getElementById("owenerholder" + sid).style.border = "2px solid " + player[getIndexbyId(buyer)].color;
        if(square[sid].groupNumber!=2) {
            document.getElementById("owenerholder" + sid).innerText = "Level 0";
        }else{
            document.getElementById("owenerholder" + sid).innerText = player[getIndexbyId(buyer)].name;
        }
        infoDisplay(player[getIndexbyId(buyer)].name+"同意了 "+player[getIndexbyId(seller)].name+"的交易请求，买进了 "+square[sid].name+" 交易完成！！！");
    }else if(tradetype==3&&sid!=100){
        game.addMoney(parseInt(money),seller);
        game.addMoney(-money,buyer);
        square[sid].owner=buyer;
        document.getElementById("owenerholder" + sid).style.border = "2px solid " + player[getIndexbyId(buyer)].color;
        if(square[sid].groupNumber!=2) {
            document.getElementById("owenerholder" + sid).innerText = "Level 0";
        }else{
            document.getElementById("owenerholder" + sid).innerText = player[getIndexbyId(buyer)].name;
        }
        infoDisplay("经过"+player[getIndexbyId(seller)].name+"的同意, "+player[getIndexbyId(buyer)].name+" 买进了 "+square[sid].name+" 交易完成！！！");
    }else if(tradetype==2&&sid==100){
        game.addMoney(parseInt(money),seller);
        game.addMoney(-money,buyer);
        player[getIndexbyId(buyer)].JailCard++;
        player[getIndexbyId(seller)].JailCard--;
        infoDisplay(player[getIndexbyId(buyer)].name+"同意了 "+player[getIndexbyId(seller)].name+"的交易请求，购买了免费出狱卡1张 交易完成！！！");
    }else if(tradetype==3&&sid==100){
        game.addMoney(parseInt(money),seller);
        game.addMoney(-money,buyer);
        player[getIndexbyId(buyer)].JailCard++;
        player[getIndexbyId(seller)].JailCard--;
        infoDisplay("经过"+player[getIndexbyId(seller)].name+"的同意, "+player[getIndexbyId(buyer)].name+" 出售了免费出狱卡1张 交易完成！！！");
    }

}

function land()
{
    $("#movingicon").hide();
    var p = player[turn];
    var s = square[p.position];

    switch (s.groupNumber)
    {
        case 0:
            switch (p.position){
                case 4:
                    game.addMoney(-140,p.id);
                    toast(p.name+" 到达拉斯维加斯，缴纳了$140赌资.","#000000",1);
                    break;
                case 12:
                    game.addMoney(-50,p.id);
                    toast(p.name+" 到达免税店，花费$50购物.","#000000",1);
                    break;
                case 15:
                    for(var i=0;i<pcount;i++){
                        if(player[i].id!=p.id)
                            game.addMoney(-40,player[i].id);
                    }
                    game.addMoney((pcount-1)*40,p.id);
                    toast(p.name+" 到达WTO，贸易频繁，资金流转不周，向其他每个玩家收取 $40 ,共获得 $"+(pcount-1)*40,"#000000",1);
                    break;
                case 20:
                    game.addMoney(50,p.id);
                    toast(p.name+" 到达免费停车场，捡到$50.","#000000",1);
                    break;
                case 36:
                    rate = 1.1;round2=2;
                    // popup(p.position,2);
                    toast(p.name+" 到达香港，所有房产租金连续三回合提升10%.","#000000",1);
                    break;
                case 50:
                    dir=-1;round=2;
                    // popup(p.position,2);
                    toast(p.name+" 到达中国城，所有玩家的行走方向反向，持续3回合.","#000000",1);
                    break;
            }
            break;
        case 1:
            //公司
            switch (p.position){
                case 5:
                    //微软 拥有者在建筑升至1级时免费
                    if(s.owner==-1)
                        popup(p.position,1);
                    break;
                case 17:
                    //红十字 拥有者到达时获得一张免费出狱卡
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id&&!p.mortgage){
                        p.JailCard++;
                        infoDisplay("作为红十字的拥有者 "+p.name+" 到达了红十字，获得了一张免费出狱卡");
                    }
                    break;
                case 25:
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id&&!p.mortgage){
                        infoDisplay("作为ORACLE的拥有者，"+p.name+" 在之后的2回合内免交房租");
                        round3 = 1;
                    }

                    break;
                case 38:
                    //苹果 拥有者可以向其他所有用户征收其资产的10%
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id&&!p.mortgage){
                        var levy=0;
                        for(var i=0;i<pcount;i++){
                            if(i!=turn){
                                var tax = parseInt(0.1*player[i].money);
                                game.addMoney(-tax,player[i].id);
                                levy = levy+tax;
                            }
                        }game.addMoney(levy,p.id);
                        infoDisplay("作为苹果的拥有者 "+p.name+" 向其他所有用户征收了10%的个人所得税，共计：$"+levy);
                    }
                    break;
                case 44:
                    // IBM 拥有者可以强行购买0级地产
                    if(s.owner==-1)
                        popup(p.position,1);
                    break;
            }
            break;
        case 2:
            switch (p.position) {
                case 35:
                    popup(p.position,2);
                    game.goToJail();
                    break;
                case 7:
                    // 公益基金", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
                    game.pickCard();
                    break;
                case 22:
                    // 联合国", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
                    game.pickCard();
                    break;
                case 33:
                    // 机遇", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
                    game.pickCard();
                    break;
                case 47:
                    // 迪拜", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
                    game.pickCard();
                    break;
            }
            break;
        default:
            if(s.owner==-1){
                //无主 可以购买
                popup(p.position,0);
            }else if(s.owner==p.id){
                if (s.level<4)
                    levelUp(p.position);
            }else if(!s.mortgage){
                //支付租金
                game.pay();
                if(square[44].owner==p.id&&s.level==0&&!square[44].mortgage)
                    popup(p.position,4);
            }
            break;
    }

}

function endTurn()
{
    //当结束回合按钮被按下
    $("#endTurn").click(function () {
        $("#endTurn").prop('disabled', true);
        $("#rollbtn").prop('disabled', false);
        $("#arrow"+(turn+1) ).hide();
        turn++;
        if (turn==pcount){
            turn = 0;
            if(round!=0){
                round--;
            }else if(round==0&&dir==-1){
                dir=1;
                infoDisplay("行走方向恢复为顺时针");
            }if(round2!=0){
                round2--;
            }else if(round2==0&&rate!=1){
                rate=1;
                infoDisplay("租金收取恢复正常");
            }if(round3!=0){
                round3--;
            }
        }
        doublecount = 0;
        $("#arrow"+(turn+1)).show();

    })
}

function popup(position,type)
{
    var s = square[position];
        document.getElementById("popup").style.width = "300px";
        document.getElementById("popup").style.top = "0px";
        document.getElementById("popup").style.left = "0px";
        if(type==0) {
            document.getElementById("popuptext").innerHTML =
                "<h3 style='color:" + s.color + "'>" + s.name + "</h3>" +
                "<div><span>购买价格: $" + s.price + "  </span>" +
                "<span>基础房租: $" + s.rent0 + "</span></div>" +
                "<div><span>一级房租: $" + s.rent1 + "  </span>" +
                "<span>二级房租: $" + s.rent2 + "</span></div>" +
                "<div><span>三级房租: $" + s.rent3 + "  </span>" +
                "<span>旅馆房租: $" + s.rent4 + "</span></div>" +
                "<span>升级费用: $" + s.houseprice + "</span></div>";
        }else if(type==1){
            document.getElementById("popuptext").innerHTML =
                "<h3>" + s.name + "</h3>" +
                "<div>购买价格: $" + s.price + "  </div>" +
                "<div>说明: " + s.pricetext + "</div>" ;
        }else if(type==2){
            document.getElementById("popuptext").innerHTML =
                "<h3>" + s.name + "</h3>" +
                "<div>说明: " + s.pricetext + "</div>";
        } else if(type==3){
            document.getElementById("popuptext").innerHTML =
                "<h3>" + s.name + "</h3>" +
                "<div>您是否愿意花$50保释自己</div>";
        }else if(type==4){
            document.getElementById("popuptext").innerHTML =
                "<h3 style='color:" + s.color + "'>" + s.name + "</h3>" +
                "<div><span>购买价格: $" + s.price + "  </span>" +
                "<span>基础房租: $" + s.rent0 + "</span></div>" +
                "<div><span>一级房租: $" + s.rent1 + "  </span>" +
                "<span>二级房租: $" + s.rent2 + "</span></div>" +
                "<div><span>三级房租: $" + s.rent3 + "  </span>" +
                "<span>旅馆房租: $" + s.rent4 + "</span></div>" +
                "<span>升级费用: $" + s.houseprice + "</span></div>" +
                "<div>作为IBM的拥有者，您可以选择从对方手上强购该房产</div>";
        } else if(type==5){
            document.getElementById("popuptext").innerHTML =
                "<h3>" + s.name + "</h3>" +
                "<div>原购买价格: $" + s.price + "  </div>" +
                "<div>说明: " + s.pricetext + "</div>" +
                "<div>您可以选择花费 $50 购得该公司</div>";
        }else if(type==6){
            document.getElementById("popuptext").innerHTML =
                "<h3 style='color: red'> 恭喜</h3>" +
                "<div>" + player[0].name+ "获得了最后的胜利 </div>" +
                "<div>最终资产: " + game.accountant(player[0]) + "</div>";
        }



        if(type==0||type==1||type==5) {

            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"popupyes\">购买</button>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"popupno\" >取消</button>" +
                "</div>";

            $("#popupyes").on("click", function () {
                game.buy(position, player[turn].id, type);
                $("#popupwrap").hide();
                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });

        }else if(type==2){
            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"popupno\" >确定</button>" +
                "</div>";

        }else if(type==3){
            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"popupyes\">保释</button>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"popupno\" >取消</button>" +
                "</div>";

            $("#popupyes").on("click", function () {
                player[turn].jail = false;
                player[turn].jailroll = 0;
                player[turn].position = 21;
                $("#endTurn").prop('disabled', false);
                updatePosition("20_5",21);
                game.addMoney(-50,player[turn].id);
                infoDisplay(player[turn].name+"花费了 $50 保释了自己");
                $("#popupwrap").hide();
                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });
        }else if(type==4){
            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"popupyes\">强购</button>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"popupno\" >取消</button>" +
                "</div>";

            $("#popupyes").on("click", function () {
                var oldowner = square[position].owner;
                square[position].owner = player[turn].id;
                document.getElementById("owenerholder" + position).style.border = "2px solid " + player[turn].color;
                document.getElementById("owenerholder" + position).innerText = "Level 0";
                game.addMoney(-square[position].price, player[turn].id);
                game.addMoney(square[position].price, oldowner);
                infoDisplay("IBM的拥有者 "+player[turn].name + " 花费了 $" + square[position].price +
                    " 从 "+player[getIndexbyId(oldowner)].name+" 手上强购了房产：" + square[position].name, player[turn].color);
                $("#popupwrap").hide();
                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });
        }else if(type==6){
            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"popupyes\">再来一局</button>" +
                "</div>";

            $("#popupyes").on("click", function () {
                window.self.location = "index.html";
            });
        }

        $("#popupno").on("click", function () {
            $("#popupwrap").hide();

            document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
            document.getElementById("cell" + position).style.zIndex = 0;
            document.getElementById("cell" + position).style.position = "";
            $("#popupbackground").fadeOut(400);
        });

        // Show using animation.
        $("#popupbackground").fadeIn(400, function () {

            $("#popupwrap").show();
        });
        document.getElementById("cell" + position).style.backgroundColor = "#F5FFFA";
        document.getElementById("cell" + position).style.zIndex = 13;
        document.getElementById("cell" + position).style.position = "relative";

}

function levelUp(position)
{
    var s = square[position];
    document.getElementById("popup").style.width = "300px";
    document.getElementById("popup").style.top = "0px";
    document.getElementById("popup").style.left = "0px";

    document.getElementById("popuptext").innerHTML =
        "<h4 style='color:"+s.color+"'>"+s.name+"</h4>" +
        "<div><span>当前等级: "+s.level+"  </span>" +
        "<span>基础房租: $"+s.rent0+"</span></div>" +
        "<div><span>一级房租: $"+s.rent1+"  </span>" +
        "<span>二级房租: $"+s.rent2+"</span></div>" +
        "<div><span>三级房租: $"+s.rent3+"  </span>" +
        "<span>旅馆房租: $"+s.rent4+"</span></div>" +
        "<span>升级费用: $"+s.houseprice+"</span></div>";

    if(player[turn].id==square[5].owner&&s.level==0&&!square[5].mortgage){
        document.getElementById("popuptext").innerHTML +=
            "<div>" +
            "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"levelupyes\">免费升级</button>" +
            "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"levelupno\" >取消</button>" +
            "</div>";

        $("#levelupyes").on("click", function () {
            s.level++;
            document.getElementById("owenerholder" + position).innerText = "Level 1";
            infoDisplay("微软的拥有者 "+player[turn].name + " 免费把 " + s.name + " 升到了 1 级 ");
            $("#popupwrap").hide();
            $("#popupbackground").fadeOut(400);
        });

    }else {
        document.getElementById("popuptext").innerHTML +=
            "<div>" +
            "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"levelupyes\">升级</button>" +
            "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"levelupno\" >取消</button>" +
            "</div>";

        $("#levelupyes").on("click", function () {
            s.level++;
            game.addMoney(-s.houseprice, player[turn].id);
            document.getElementById("owenerholder" + position).innerText = "Level " + s.level;
            infoDisplay(player[turn].name + " 花费了 $" + s.houseprice + " 把 " + s.name + " 升到了 " + s.level + " 级 ", player[turn].color);
            $("#popupwrap").hide();
            $("#popupbackground").fadeOut(400);
        });
    }

    $("#levelupno").on("click", function () {
        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });


    // Show using animation.
    $("#popupbackground").fadeIn(400, function() {
        $("#popupwrap").show();
    });

}

function bankrupt()
{
    var s;
    var id = player[turn].id;
    infoDisplay(player[turn].name+" 已经破产 资产统计："+game.accountant(player[turn]));
    for(var i=0;i<52;i++){
        s = square[i];
        if(s.owner==id){
            document.getElementById("owenerholder"+i).style.border = "";
            document.getElementById("owenerholder"+i).innerText = "";
            s.owner = -1;
            s.mortgage=false;
        }
    }
    player.splice(turn,1);pcount--;
    updatePosition(100,100);


        $("#endTurn").prop('disabled', true);
        $("#rollbtn").prop('disabled', false);
        if (turn == pcount) {
            turn = 0;
            if (round != 0) {
                round--;
            } else if (round == 0 && dir == -1) {
                dir = 1;
                infoDisplay("行走方向恢复为顺时针");
            }
            if (round2 != 0) {
                round2--;
            } else if (round2 == 0 && rate != 1) {
                rate = 1;
                infoDisplay("租金收取恢复正常");
            }
        }
        doublecount = 0;
        $("#arrow" + (player[turn].id + 1)).show();
        if (pcount == 1)
            game.over();
}

function mouse(i)
{
    if (i=="20_5"){
        $("#jail").on("mousemove", function(e) {
            // console.log(i);
            var element = document.getElementById("enlarge20_5");

            if (e.clientY + 20 > window.innerHeight - 204) {
                // console.log(window.innerHeight - 204);
                element.style.top = (window.innerHeight - 204) + "px";
            } else {
                element.style.top = (e.clientY + 20) + "px";
            }
            element.style.left = (e.clientX + 10) + "px";
        }).on("mouseover",function () {
            $("#enlarge20_5").show();
        }).on("mouseout", function() {
            $("#enlarge20_5").hide();
        });
    }else{

    $("#cell"+i).on("mousemove", function(e) {
        // console.log(i);
        var element = document.getElementById("enlarge"+i);

        if (e.clientY + 20 > window.innerHeight - 204) {
            // console.log(window.innerHeight - 204);
            element.style.top = (window.innerHeight - 204) + "px";
        } else {
            element.style.top = (e.clientY + 20) + "px";
        }
        element.style.left = (e.clientX + 10) + "px";
    }).on("mouseover",function () {
        $("#enlarge" + i).show();
    }).on("mouseout", function() {
        $("#enlarge" + i).hide();
    });
    }
}

function deed()
{

    var s;

    for (var i = 0; i < 52; i++) {
        if(i!=21){
        s = square[i];

        document.getElementById("enlarge" + i + "color").style.backgroundColor = s.color;
        document.getElementById("enlarge" + i + "name").textContent = s.name;
        document.getElementById("enlarge" + i + "price").textContent = s.pricetext;
        }
    }

    var drag, dragX, dragY, dragObj, dragTop, dragLeft;

    $("body").on("mousemove", function(e) {
        var object;

        if (e.target) {
            object = e.target;
        } else if (window.event && window.event.srcElement) {
            object = window.event.srcElement;
        }


        if (object.classList.contains("propertycellcolor") || object.classList.contains("statscellcolor")) {
            if (e.clientY + 20 > window.innerHeight - 279) {
                document.getElementById("deed").style.top = (window.innerHeight - 279) + "px";
            } else {
                document.getElementById("deed").style.top = (e.clientY + 20) + "px";
            }
            document.getElementById("deed").style.left = (e.clientX + 10) + "px";


        } else if (drag) {
            if (e) {
                dragObj.style.left = (dragLeft + e.clientX - dragX) + "px";
                dragObj.style.top = (dragTop + e.clientY - dragY) + "px";

            } else if (window.event) {
                dragObj.style.left = (dragLeft + window.event.clientX - dragX) + "px";
                dragObj.style.top = (dragTop + window.event.clientY - dragY) + "px";
            }
        }
    });


    $("body").on("mouseup", function() {

        drag = false;
    });
    document.getElementById("statsdrag").onmousedown = function(e) {
        dragObj = document.getElementById("stats");
        dragObj.style.position = "relative";

        dragTop = parseInt(dragObj.style.top, 10) || 0;
        dragLeft = parseInt(dragObj.style.left, 10) || 0;

        if (window.event) {
            dragX = window.event.clientX;
            dragY = window.event.clientY;
        } else if (e) {
            dragX = e.clientX;
            dragY = e.clientY;
        }

        drag = true;
    };

    document.getElementById("popupdrag").onmousedown = function(e) {
        dragObj = document.getElementById("popup");
        dragObj.style.position = "relative";

        dragTop = parseInt(dragObj.style.top, 10) || 0;
        dragLeft = parseInt(dragObj.style.left, 10) || 0;

        if (window.event) {
            dragX = window.event.clientX;
            dragY = window.event.clientY;
        } else if (e) {
            dragX = e.clientX;
            dragY = e.clientY;
        }

        drag = true;
    };
    
}

function showdeed(property)
{
    var sq = square[property];
    $("#deed").show();

    $("#deed-normal").hide();
    $("#deed-mortgaged").hide();
    $("#deed-special").hide();

    if (sq.mortgage) {
        $("#deed-mortgaged").show();
        document.getElementById("deed-mortgaged-name").textContent = sq.name;
        document.getElementById("deed-mortgaged-mortgage").textContent = parseInt(sq.price/2 + sq.level*(sq.houseprice/2));

    } else {

        if (sq.groupNumber >= 3) {
            $("#deed-normal").show();
            document.getElementById("deed-header").style.backgroundColor = sq.color;
            document.getElementById("deed-name").textContent = sq.name;
            document.getElementById("deed-baserent").textContent = sq.rent0;
            document.getElementById("deed-rent1").textContent = sq.rent1;
            document.getElementById("deed-rent2").textContent = sq.rent2;
            document.getElementById("deed-rent3").textContent = sq.rent3;
            document.getElementById("deed-rent4").textContent = sq.rent4;
            document.getElementById("deed-price").textContent = sq.price;
            document.getElementById("deed-mortgage").textContent = parseInt(sq.price/2 + sq.level*(sq.houseprice/2));
            document.getElementById("deed-houseprice").textContent = sq.houseprice;

        } else if (sq.groupNumber == 2) {
            $("#deed-special").show();
            document.getElementById("deed-special-name").textContent = sq.name;
            document.getElementById("deed-special-text").innerHTML = sq.pricetext;
            document.getElementById("deed-special-mortgage").textContent = parseInt(sq.price/2 + sq.level*(sq.houseprice/2));

        } else if (sq.groupNumber == 1) {
            $("#deed-special").show();
            document.getElementById("deed-special-name").textContent = sq.name;
            document.getElementById("deed-special-text").innerHTML = sq.pricetext;
            document.getElementById("deed-special-mortgage").textContent = parseInt(sq.price/2 + sq.level*(sq.houseprice/2));
        }
    }
}

function hidedeed()
{
    $("#deed").hide();
}

function getIndexbyId(id)
{
    for (var i=0;i<pcount;i++)
        if(player[i].id == id)
            return i;
    
}

function raiserent() {
    var a = [0,0,0,0,0,0,0,0,0,0];
        if(a[0]==0&&square[1].owner==square[2].owner&&square[3].owner==square[49]&&square[3].owner==square[1]){
            a[0]++;
            square[1].rent0 *= 1.1;
            square[1].rent1 *= 1.1;
            square[1].rent2 *= 1.1;
            square[1].rent3 *= 1.1;
            square[1].rent4 *= 1.1;
            square[2].rent0 *= 1.1;
            square[2].rent1 *= 1.1;
            square[2].rent2 *= 1.1;
            square[2].rent3 *= 1.1;
            square[2].rent4 *= 1.1;
            square[3].rent0 *= 1.1;
            square[3].rent1 *= 1.1;
            square[3].rent2 *= 1.1;
            square[3].rent3 *= 1.1;
            square[3].rent4 *= 1.1;
            square[49].rent0 *= 1.1;
            square[49].rent1 *= 1.1;
            square[49].rent2 *= 1.1;
            square[49].rent3 *= 1.1;
            square[49].rent4 *= 1.1;
            infoDisplay(player[square[1].owner].name+" 齐集了棕色房产，棕色房产全体房租增加10%！");
        }
        if(a[1]==0&&square[6].owner==square[9].owner&&square[14].owner==square[28]&&square[6].owner==square[14]){
            a[1]++;
            square[6].rent0 *= 1.1;
            square[6].rent1 *= 1.1;
            square[6].rent2 *= 1.1;
            square[6].rent3 *= 1.1;
            square[6].rent4 *= 1.1;
            square[9].rent0 *= 1.1;
            square[9].rent1 *= 1.1;
            square[9].rent2 *= 1.1;
            square[9].rent3 *= 1.1;
            square[9].rent4 *= 1.1;
            square[14].rent0 *= 1.1;
            square[14].rent1 *= 1.1;
            square[14].rent2 *= 1.1;
            square[14].rent3 *= 1.1;
            square[14].rent4 *= 1.1;
            square[28].rent0 *= 1.1;
            square[28].rent1 *= 1.1;
            square[28].rent2 *= 1.1;
            square[28].rent3 *= 1.1;
            square[28].rent4 *= 1.1;
            infoDisplay(player[square[14].owner].name+" 齐集了浅蓝房产，棕色房产全体房租增加10%！");
        }
        if(a[2]==0&&square[8].owner==square[11].owner&&square[11].owner==square[13]){
            a[2]++;
            square[8].rent0 *= 1.1;
            square[8].rent1 *= 1.1;
            square[8].rent2 *= 1.1;
            square[8].rent3 *= 1.1;
            square[8].rent4 *= 1.1;
            square[11].rent0 *= 1.1;
            square[11].rent1 *= 1.1;
            square[11].rent2 *= 1.1;
            square[11].rent3 *= 1.1;
            square[11].rent4 *= 1.1;
            square[13].rent0 *= 1.1;
            square[13].rent1 *= 1.1;
            square[13].rent2 *= 1.1;
            square[13].rent3 *= 1.1;
            square[13].rent4 *= 1.1;
            infoDisplay(player[square[11].owner].name+" 齐集了粉红房产，粉红房产全体房租增加10%！");
        }
        if(a[3]==0&&square[16].owner==square[18].owner&&square[19].owner==square[51]&&square[16].owner==square[19]){
            a[3]++;
            square[16].rent0 *= 1.1;
            square[16].rent1 *= 1.1;
            square[16].rent2 *= 1.1;
            square[16].rent3 *= 1.1;
            square[16].rent4 *= 1.1;
            square[18].rent0 *= 1.1;
            square[18].rent1 *= 1.1;
            square[18].rent2 *= 1.1;
            square[18].rent3 *= 1.1;
            square[18].rent4 *= 1.1;
            square[19].rent0 *= 1.1;
            square[19].rent1 *= 1.1;
            square[19].rent2 *= 1.1;
            square[19].rent3 *= 1.1;
            square[19].rent4 *= 1.1;
            square[51].rent0 *= 1.1;
            square[51].rent1 *= 1.1;
            square[51].rent2 *= 1.1;
            square[51].rent3 *= 1.1;
            square[51].rent4 *= 1.1;
            infoDisplay(player[square[16].owner].name+" 齐集了土黄房产，土黄房产全体房租增加10%！");
        }
        if(a[4]==0&&square[10].owner==square[23].owner&&square[10].owner==square[24]){
            a[4]++;
            square[10].rent0 *= 1.1;
            square[10].rent1 *= 1.1;
            square[10].rent2 *= 1.1;
            square[10].rent3 *= 1.1;
            square[10].rent4 *= 1.1;
            square[23].rent0 *= 1.1;
            square[23].rent1 *= 1.1;
            square[23].rent2 *= 1.1;
            square[23].rent3 *= 1.1;
            square[23].rent4 *= 1.1;
            square[24].rent0 *= 1.1;
            square[24].rent1 *= 1.1;
            square[24].rent2 *= 1.1;
            square[24].rent3 *= 1.1;
            square[24].rent4 *= 1.1;
            infoDisplay(player[square[10].owner].name+" 齐集了红色房产，红色房产全体房租增加10%！");
        }
        if(a[5]==0&&square[26].owner==square[27].owner&&square[26].owner==square[29]){
            a[5]++;
            square[26].rent0 *= 1.1;
            square[26].rent1 *= 1.1;
            square[26].rent2 *= 1.1;
            square[26].rent3 *= 1.1;
            square[26].rent4 *= 1.1;
            square[27].rent0 *= 1.1;
            square[27].rent1 *= 1.1;
            square[27].rent2 *= 1.1;
            square[27].rent3 *= 1.1;
            square[27].rent4 *= 1.1;
            square[29].rent0 *= 1.1;
            square[29].rent1 *= 1.1;
            square[29].rent2 *= 1.1;
            square[29].rent3 *= 1.1;
            square[29].rent4 *= 1.1;
            infoDisplay(player[square[26].owner].name+" 齐集了黄色房产，黄色房产全体房租增加10%！");
        }
        if(a[6]==0&&square[31].owner==square[32].owner&&square[31].owner==square[34]){
            a[6]++;
            square[31].rent0 *= 1.1;
            square[31].rent1 *= 1.1;
            square[31].rent2 *= 1.1;
            square[31].rent3 *= 1.1;
            square[31].rent4 *= 1.1;
            square[32].rent0 *= 1.1;
            square[32].rent1 *= 1.1;
            square[32].rent2 *= 1.1;
            square[32].rent3 *= 1.1;
            square[32].rent4 *= 1.1;
            square[34].rent0 *= 1.1;
            square[34].rent1 *= 1.1;
            square[34].rent2 *= 1.1;
            square[34].rent3 *= 1.1;
            square[34].rent4 *= 1.1;
            infoDisplay(player[square[31].owner].name+" 齐集了绿色房产，绿色房产全体房租增加10%！");
        }
        if(a[7]==0&&square[30].owner==square[37].owner&&square[39].owner==square[40]&&square[30].owner==square[39]){
            a[7]++;
            square[30].rent0 *= 1.1;
            square[30].rent1 *= 1.1;
            square[30].rent2 *= 1.1;
            square[30].rent3 *= 1.1;
            square[30].rent4 *= 1.1;
            square[37].rent0 *= 1.1;
            square[37].rent1 *= 1.1;
            square[37].rent2 *= 1.1;
            square[37].rent3 *= 1.1;
            square[37].rent4 *= 1.1;
            square[39].rent0 *= 1.1;
            square[39].rent1 *= 1.1;
            square[39].rent2 *= 1.1;
            square[39].rent3 *= 1.1;
            square[39].rent4 *= 1.1;
            square[40].rent0 *= 1.1;
            square[40].rent1 *= 1.1;
            square[40].rent2 *= 1.1;
            square[40].rent3 *= 1.1;
            square[40].rent4 *= 1.1;
            infoDisplay(player[square[30].owner].name+" 齐集了深蓝房产，深蓝房产全体房租增加10%！");
        }
        if(a[8]==0&&square[41].owner==square[43].owner&&square[41].owner==square[48]){
            a[8]++;
            square[41].rent0 *= 1.1;
            square[41].rent1 *= 1.1;
            square[41].rent2 *= 1.1;
            square[41].rent3 *= 1.1;
            square[41].rent4 *= 1.1;
            square[43].rent0 *= 1.1;
            square[43].rent1 *= 1.1;
            square[43].rent2 *= 1.1;
            square[43].rent3 *= 1.1;
            square[43].rent4 *= 1.1;
            square[48].rent0 *= 1.1;
            square[48].rent1 *= 1.1;
            square[48].rent2 *= 1.1;
            square[48].rent3 *= 1.1;
            square[48].rent4 *= 1.1;
            infoDisplay(player[square[41].owner].name+" 齐集了蓝绿房产，蓝绿房产全体房租增加10%！");
        }
        if(a[9]==0&&square[42].owner==square[45].owner&&square[42].owner==square[46]){
            a[9]++;
            square[42].rent0 *= 1.1;
            square[42].rent1 *= 1.1;
            square[42].rent2 *= 1.1;
            square[42].rent3 *= 1.1;
            square[42].rent4 *= 1.1;
            square[45].rent0 *= 1.1;
            square[45].rent1 *= 1.1;
            square[45].rent2 *= 1.1;
            square[45].rent3 *= 1.1;
            square[45].rent4 *= 1.1;
            square[46].rent0 *= 1.1;
            square[46].rent1 *= 1.1;
            square[46].rent2 *= 1.1;
            square[46].rent3 *= 1.1;
            square[46].rent4 *= 1.1;
            infoDisplay(player[square[42].owner].name+" 齐集了淡紫房产，淡紫房产全体房租增加10%！");
        }
}





