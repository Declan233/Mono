
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
var dir = 1, rate=1,round=0 ,round2=0;
var holdtime = 1200;

/**
 * 棋盘初始化
 */
function initBoard() {
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

    // Add images to enlarges.
    document.getElementById("enlarge0token").innerHTML += '<img src="image/arrow_icon.png" height="40" width="136" alt="" />';
    document.getElementById("enlarge20price").innerHTML += "<img src='image/free_parking_icon.png' height='80' width='72' alt='' style='position: relative; top: -20px;' />";
    document.getElementById("enlarge38token").innerHTML += '<img src="image/tax_icon.png" height="60" width="70" alt="" style="position: relative; top: -20px;" />';


    for(var i=0;i<52;i++){
        if(i!=21){
        var cell = document.getElementById("cell" +i);
        var hpid = "holder"+i;
        // console.log(cell);
            cell.innerHTML +=
                "<div class='cellinnerwrap'>" +
                    "<div class='owenerholder' id='owenerholder"+i+"'></div>" +
                    "<div class='innerSquare' onmousemove='mouse("+i+")' style='border: 5px solid "+square[i].color+"'>"+square[i].name+"</div>" +
                    "<div class='holderposition' id='holder"+i+"'></div>" +
                "</div>";
        }
    }
    $("#arrow1").show();
}


/**
 * 玩家初始化
 */
function initPlayers(){
    var holder = document.getElementById("holder0");

    console.log(player);
    for (var y = 0; y < pcount; y++) {
        holder.innerHTML += "<span class='glyphicon glyphicon-"+ player[y].token +"' title='" + player[y].name + "' aria-hidden='true' style='color: " + player[y].color + ";'></span>";

    }

    //继续游戏
    // play();
}





var app = angular.module('myApp', []);
app.controller("moneybar",function ($scope,$interval)
{
    for (var i = 0; i < pcount; i++)
        player[i] = new Player(playersinfo.players[i].name, playersinfo.players[i].color,playersinfo.players[i].token,i);

    $scope.ps = player;

    $interval(function(){
        $scope.ps = player;
    },2000);

})






//显示当前房产结果
function showStats(){
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

            // if (sq.owner == x) {
            //     mortgagetext = "",
            //         housetext = "";
            //
            //     if (sq.mortgage) {
            //         mortgagetext = "title='Mortgaged' style='color: grey;'";
            //     }
            //
            //     if (!write) {
            //         write = true;
            //         HTML += "<table>";
            //     }
            //
            //     if (sq.house == 5) {
            //         housetext += "<span style='float: right; font-weight: bold;'>1&nbsp;x&nbsp;<img src='images/hotel.png' alt='' title='Hotel' class='hotel' style='float: none;' /></span>";
            //     } else if (sq.house > 0 && sq.house < 5) {
            //         housetext += "<span style='float: right; font-weight: bold;'>" + sq.house + "&nbsp;x&nbsp;<img src='images/house.png' alt='' title='House' class='house' style='float: none;' /></span>";
            //     }
            //
            //     HTML += "<tr><td class='statscellcolor' style='background: " + sq.color + ";";
            //
            //     if (sq.groupNumber == 1 || sq.groupNumber == 2) {
            //         HTML += " border: 1px solid grey;";
            //     }
            //
            //     HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='statscellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";
            // }
        }

        // if (p.communityChestJailCard) {
        //     if (!write) {
        //         write = true;
        //         HTML += "<table>";
        //     }
        //     HTML += "<tr><td class='statscellcolor'></td><td class='statscellname'>Get Out of Jail Free Card</td></tr>";
        //
        //  }
        // if (p.chanceJailCard) {
        //     if (!write) {
        //         write = true;
        //         HTML += "<table>";
        //     }
        //     HTML += "<tr><td class='statscellcolor'></td><td class='statscellname'>Get Out of Jail Free Card</td></tr>";
        //
        // }

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

/**
 * 游戏
 * @constructor
 */
function Game() {
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
        // console.log(turn);
        if (player[turn].money < 0) {//还款后余额还是低于0，宣布破产
            console.log(player[turn].name+" is bankrupted");
            bankrupt();
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
        console.log("恭喜"+player[0].name);
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
        addMoney(-rent,p.id);
        addMoney(rent,s.owner);
        infoDisplay(p.name+" 支付了 $"+rent+" 给 "+player[getIndexbyId(s.owner)].name,p.color);
        Rent = rent;
    }

    this.getRent = function(){
        return Rent;
    }

    this.payFine = function () {
        addMoney(-50,player[turn].id);
    }

    this.goToJail = function (){


        var p = player[turn];
        var start = p.position;
        var end = "20_5";
        p.jail=true;
        p.position = "20_5";
        updatePosition(start,end);

        //自动结束当前回合，进入下一个玩家的回合
        $("#endTurn").prop('disabled', true);
        $("#rollbtn").prop('disabled', false);
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
            }
        }
        doublecount = 0;

    }



}






function roll() {
    var p = player[turn];

    game.rollDice();
    var die1 = game.getDie(1);
    var die2 = game.getDie(2);
    var start = p.position;
    var end = 0;

    if (die1 == die2 && !p.jail)
    {//相同数且不在监狱
        if (doublecount < 3)
        {
            //相同数次数小于3
            p.position += (die1 + die2)*dir;
            end = p.position;
            if (p.position >= 52&&dir==1) {
                p.position -= 52;
                end = p.position;
                addMoney(200,p.id);
                infoDisplay(p.name+" 经过起点获得 $200 基金.",p.color);
            }else if(p.position < 0&&dir==-1){
                p.position += 52;
                end = p.position;
                addMoney(200,p.id);
                infoDisplay(p.name+" 经过起点获得 $200 基金.",p.color);
            }
            infoDisplay(p.name+" 扔出了: "+(die1+die2)+" -- 相同数，到达了 " + square[p.position].name+" 同时获得再掷一次的机会.",p.color);
            updatePosition(start,end);//更新位置
            setTimeout(land,holdtime);//执行方格内容
            $("#rollbtn").prop('disabled', false);
        } else if (doublecount === 3) {
            p.jail = true;
            doublecount = 0;
            console.log(p.name + " 连续三次掷出了双数");
            popup(35,2);
            game.goToJail();
        }
        return;
    }
    else if(p.jail === true)
    {//在监狱
        p.jailroll++;
        if (die1 == die2) {//相同数可出狱
            document.getElementById("jail").style.border = "1px solid black";
            document.getElementById("cell11").style.border = "2px solid" + p.color;
            $("#landed").hide();
            p.jail = false;
            p.jailroll = 0;
            p.position = 21 + (die1 + die2)*dir;end = p.position;
            doublecount = 0;
            console.log(p.name + " 掷出了双数，离开了监狱.");
        }else {//不同数
            if (p.jailroll === 3) {//连续三回合可交50罚款出狱
                    popup(21,3);
                p.position = 21 + (die1 + die2)*dir;end = p.position;
            }else {//继续监狱生活
                console.log("您未能掷出相同数，继续在监狱呆着.");
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
        addMoney(200,p.id);
        infoDisplay(p.name+" 经过起点获得 $200 基金.",p.color);
    }else if(p.position < 0&&dir==-1){
        p.position += 52;end = p.position;
        addMoney(200,p.id);
        infoDisplay(p.name+" 经过起点获得 $200 基金.",p.color);
    }
    infoDisplay(p.name+" 扔出了: "+(die1+die2)+" 到达了 "+square[p.position].name,p.color);
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
        // console.log(holder);
        holder.innerHTML="";
        for (var y = 0; y < pcount; y++) {
            if (player[y].position == x && y!=turn && !player[y].jail)
                holder.innerHTML += "<span class='glyphicon glyphicon-"+ player[y].token +"' title='" + player[y].name + "' aria-hidden='true' style='color: " + player[y].color + ";'></span>";
        }
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

        // console.log(player[turn].name+":\n"+p1_top+"  "+p1_left+"\n"+p2_top+"  "+p2_left);

    }


}


function infoDisplay(msg,color)
{
    var disarea = document.getElementById("displayInfo");
    var info = disarea.appendChild(document.createElement("p"))
    info.className = "triangle-obtuse";
    info.innerText = msg;
    info.style.borderColor = color;


    $("#displayInfo").scrollTop($("#displayInfo").prop("scrollHeight"));
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
                    addMoney(-140,p.id);
                    popup(p.position,2);
                    infoDisplay(p.name+" 到达拉斯维加斯，缴纳了$140赌资.",p.color);
                    break;
                case 12:
                    addMoney(-50,p.id);
                    popup(p.position,2);
                    infoDisplay(p.name+" 到达免税店，花费$50购物.",p.color);
                    break;
                case 15:
                    for(var i=0;i<pcount;i++){
                        if(player[i].id!=p.id)
                            addMoney(-40,player[i].id);
                    }
                    addMoney((pcount-1)*40,p.id);
                    popup(p.position,2);
                    infoDisplay(p.name+" 到达WTO，贸易频繁，资金流转不周，向其他每个玩家收取 $40 ,共获得 $"+(pcount-1)*40,p.color);
                    break;
                case 20:
                    addMoney(50,p.id);
                    popup(p.position,2);
                    infoDisplay(p.name+" 到达免费停车场，捡到$50.",p.color);
                    break;
                case 36:
                    rate = 1.1;round2=2;
                    popup(p.position,2);
                    infoDisplay(p.name+" 到达香港，所有房产租金连续三回合提升10%.",p.color);
                    break;
                case 50:
                    dir=-1;round=2;
                    popup(p.position,2);
                    infoDisplay(p.name+" 到达中国城，所有玩家的行走方向反向，持续3回合.");
                    break;
            }
            break;
        case 1:
            //公司
            switch (p.position){
                case 5:
                    // square[5] = new Square("微软", "$200", "#FFFFFF", 200, 1);//1
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id)
                        console.log("MICROSOFT");
                    break;
                case 25:
                    // square[25] = new Square("ORACLE", "$200", "#FFFFFF", 200, 1);//1
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id)
                        console.log("ORACLE");
                    break;
                case 33:
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id)
                        console.log("出狱卡1张");
                    break;
                case 44:
                    // square[44] = new Square("IBM", "$200", "#FFFFFF", 200, 1);//1
                    if(s.owner==-1)
                        popup(p.position,1);
                    else if(s.owner==p.id)
                        console.log("IBM");
                    break;
            }
            break;
        case 2:
            switch (p.position) {
                case 21:
                    popup(p.position,2);
                    break;
                case 35:
                    popup(p.position,2);
                    game.goToJail();
                    break;
            }
            break;
        case 13:
            break;
        default:
            if(s.owner==-1){
                //无主 可以购买
                popup(p.position,0);
            }else if(s.owner==p.id){
                if (s.level==5){

                }else
                    levelUp(p.position);
            }else{
                //支付租金
                game.pay();
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
                "<span>一级旅馆房租: $" + s.rent4 + "</span></div>" +
                "<div><span>二级旅馆房租: $" + s.rent5 + "  </span>" +
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
        }


        if(type!=2&&type!=3) {

            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"popupyes\">购买</button>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"popupno\" >取消</button>" +
                "</div>";

            $("#popupno").on("click", function () {
                $("#popupwrap").hide();

                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });
            $("#popupyes").on("click", function () {
                buy(position, player[turn].id, type);
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

            $("#popupno").on("click", function () {
                $("#popupwrap").hide();
                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });

        }else if(type==3){
            document.getElementById("popuptext").innerHTML +=
                "<div>" +
                "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"popupyes\">保释</button>" +
                "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"popupno\" >取消</button>" +
                "</div>";

            $("#popupno").on("click", function () {
                $("#popupwrap").hide();

                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });
            $("#popupyes").on("click", function () {
                player[turn].jail = false;
                player[turn].jailroll = 0;
                updatePosition(100,100);
                $("#popupwrap").hide();
                document.getElementById("cell" + position).style.backgroundColor = "#ffffff";
                document.getElementById("cell" + position).style.zIndex = 0;
                document.getElementById("cell" + position).style.position = "";
                $("#popupbackground").fadeOut(400);
            });
        }



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
        "<div><span>当前等级: $"+s.level+"  </span>" +
        "<span>基础房租: $"+s.rent0+"</span></div>" +
        "<div><span>一级房租: $"+s.rent1+"  </span>" +
        "<span>二级房租: $"+s.rent2+"</span></div>" +
        "<div><span>三级房租: $"+s.rent3+"  </span>" +
        "<span>一级旅馆房租: $"+s.rent4+"</span></div>" +
        "<div><span>二级旅馆房租: $"+s.rent5+"  </span>" +
        "<span>升级费用: $"+s.houseprice+"</span></div>";

    document.getElementById("popuptext").innerHTML +=
        "<div>" +
        "<button type=\"button\" class='btn btn-success' value=\"Yes\" id=\"levelupyes\">升级</button>" +
        "<button type=\"button\" class='btn btn-warning' value=\"No\" id=\"levelupno\" >取消</button>" +
        "</div>";

    $("#levelupnp").on("click", function() {
        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });
    $("#levelupyes").on("click", function() {
        s.level++;
        addMoney(s.houseprice,player[turn].id);
        document.getElementById("owenerholder"+position).innerText = "Level "+s.level;
        infoDisplay(player[turn].name+" 花费了 $"+s.houseprice+" 把 "+s.name+" 升到了 "+s.level+" 级 ",player[turn].color);
        $("#popupwrap").hide();
        $("#popupbackground").fadeOut(400);
    });


    // Show using animation.
    $("#popupbackground").fadeIn(400, function() {
        $("#popupwrap").show();
    });

}



function bankrupt() {
    var s;
    var id = player[turn].id;
    for(var i=0;i<52;i++){
        s = square[i];
        if(s.owner==id){
            document.getElementById("owenerholder"+i).style.border = "";
            document.getElementById("owenerholder"+i).innerText = "";
            s.owner = -1;
        }
    }
    infoDisplay(player[turn].name+" 已经破产 ");
    player.splice(turn,1);pcount--;
    updatePosition(100,100);

    $("#endTurn").prop('disabled', true);
    $("#rollbtn").prop('disabled', false);
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
        }
    }
    doublecount = 0;
    $("#arrow"+(player[turn].id+1)).show();
    if(pcount==1)
        game.over();
}



function mouse(i) {
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

function deed() {

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

function showdeed(property) {
    var sq = square[property];
    $("#deed").show();

    $("#deed-normal").hide();
    $("#deed-mortgaged").hide();
    $("#deed-special").hide();

    if (sq.mortgage) {
        $("#deed-mortgaged").show();
        document.getElementById("deed-mortgaged-name").textContent = sq.name;
        document.getElementById("deed-mortgaged-mortgage").textContent = (sq.price / 2);

    } else {

        if (sq.groupNumber >= 3) {
            $("#deed-normal").show();
            document.getElementById("deed-header").style.backgroundColor = sq.color;
            document.getElementById("deed-name").textContent = sq.name;
            document.getElementById("deed-baserent").textContent = sq.baserent;
            document.getElementById("deed-rent1").textContent = sq.rent1;
            document.getElementById("deed-rent2").textContent = sq.rent2;
            document.getElementById("deed-rent3").textContent = sq.rent3;
            document.getElementById("deed-rent4").textContent = sq.rent4;
            document.getElementById("deed-rent5").textContent = sq.rent5;
            document.getElementById("deed-mortgage").textContent = (sq.price / 2);
            document.getElementById("deed-houseprice").textContent = sq.houseprice;
            document.getElementById("deed-hotelprice").textContent = sq.houseprice;

        } else if (sq.groupNumber == 2) {
            $("#deed-special").show();
            document.getElementById("deed-special-name").textContent = sq.name;
            document.getElementById("deed-special-text").innerHTML = utiltext();
            document.getElementById("deed-special-mortgage").textContent = (sq.price / 2);

        } else if (sq.groupNumber == 1) {
            $("#deed-special").show();
            document.getElementById("deed-special-name").textContent = sq.name;
            document.getElementById("deed-special-text").innerHTML = transtext();
            document.getElementById("deed-special-mortgage").textContent = (sq.price / 2);
        }
    }
}

function addMoney(num,id) {
    player[getIndexbyId(id)].money += num;
}


function buy(position,id,type) {
    square[position].owner = id;
    document.getElementById("owenerholder" + position).style.border = "2px solid " + player[getIndexbyId(id)].color;
    if(type==0) {
        document.getElementById("owenerholder" + position).innerText = "Level 0";
    }else if(type==1){
        document.getElementById("owenerholder" + position).innerText = player[turn].name;
    }
        addMoney(-square[position].price, player[turn].id);
        infoDisplay(player[turn].name + " 花费了 $" + square[position].price + " 购买了房产：" + square[position].name, player[turn].color);

}





function getIndexbyId(id) {
    for (var i=0;i<pcount;i++)
        if(player[i].id == id)
            return i;
    
}


