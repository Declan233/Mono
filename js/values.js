/**
 * 方块的构造函数
 * @param name
 * @param pricetext
 * @param color
 * @param price
 * @param groupNumber
 * @param baserent
 * @param rent1
 * @param rent2
 * @param rent3
 * @param rent4
 * @param rent5
 * @constructor
 */
function Square(name, pricetext, color, price, groupNumber, rent0, rent1, rent2, rent3, rent4) {
	this.name = name;                       //地产名称
	this.pricetext = pricetext;             //地产价格或地产功能说明
	this.color = color;                     //地产色号
	this.owner = -1;                        //地主id
	this.mortgage = false;                  //抵押与否
	this.groupNumber = groupNumber || 0;    //地群编号
	this.price = (price || 0);              //购买价格
	this.rent0 = (rent0 || 0);              //原始房产租金
	this.rent1 = (rent1 || 0);              //1级房产租金
	this.rent2 = (rent2 || 0);              //2级房产租金
	this.rent3 = (rent3 || 0);              //3级房产租金
	this.rent4 = (rent4 || 0);              //4级房产租金
	this.level = 0;                         //等级
	//升级费用
	if (groupNumber === 3 || groupNumber === 4) this.houseprice = 50;
    else if (groupNumber === 5 || groupNumber === 6 || groupNumber === 7) this.houseprice = 100;
	else if (groupNumber === 8 || groupNumber === 9) this.houseprice = 150;
    else if (groupNumber === 10 || groupNumber === 11 || groupNumber === 12) this.houseprice = 200;
	else this.houseprice = 0;

    this.getString = function (square){
        return square.name+" "+square.owner+" "+square.level+" "+square.mortgage+" "+square.rent0+"\n";
    }
}

/**
 * 卡片的构造函数
 * @param text
 * @param action
 * @constructor
 */
function Card(text, action) {
    this.text = text;       //运气卡内容
    this.action = action;   //运气卡的执行函数
}

/**
 * 玩家的构造函数
 * @param name
 * @param color
 * @constructor
 */
function Player(name, color, token, id) {
	this.id = id;       //玩家id
    this.name = name;   //玩家名
    this.color = color; //玩家颜色
    this.token = token; //玩家棋子
    this.position = 0;  //玩家位置
    this.money = 1500;  //玩家现金
    this.jail = false;  //是否在监狱
    this.jailroll = 0;  //在监狱呆的回合数
    this.JailCard = 1;  //出狱卡张数

    this.getString = function (player){
        return player.id+" "+player.name+" "+player.color+" "+player.token+" "+player.position+" "+player.money+" "+player.jail+" "+player.jailroll+" "+player.JailCard+"\n";
    }

}

var square = [];

square[0] = new Square("起点", "领取$500补助.", "./image/001.png", 0, 0);//0
square[1] = new Square("地中海大道", "$60", "#8B4513", 60, 3, 8, 10, 30, 90, 160);//3
square[2] = new Square("波罗的海大道", "$60", "#8B4513", 60, 3, 8, 10, 30, 90, 160);//3
square[3] = new Square("比萨斜塔", "$60", "#8B4513", 60, 3, 12, 20, 60, 180, 320);//3
square[4] = new Square("拉斯维加斯", "支付$140赌资", "./image/004.png", 0, 0);//0
square[5] = new Square("微软", "拥有者在建筑升至1级时免费", "./image/005.png", 200, 1);//1
square[6] = new Square("罗马竞技场", "$100", "#87CEEB", 100, 4, 16, 30, 90, 270, 400);//4
square[7] = new Square("公益基金", "请遵从卡片的指示", "./image/007.png", 0, 2);//2
square[8] = new Square("埃菲尔铁塔", "$100", "#FF0080", 100, 5, 20, 30, 90, 270, 400);//5
square[9] = new Square("金门桥", "$120", "#87CEEB", 120, 4, 28, 40, 100, 300, 450);//4
square[10] = new Square("泰姬陵", "$220", "#FF0000", 220, 7, 40, 90, 250, 700, 875);//7
square[11] = new Square("长城", "$140", "#FF0080", 140, 5, 25, 50, 150, 450, 625);//5
square[12] = new Square("免税店", "花费了$50购物", "./image/012.png", 0, 0);//0
square[13] = new Square("开罗", "$140", "#FF0080", 140, 5, 30, 50, 150, 450, 625);//5
square[14] = new Square("圣彼得教堂", "$160", "#87CEEB", 160, 4, 38, 60, 180, 500, 700);//4
square[15] = new Square("WTO", "贸易频繁，资金流转不周，向其他每个玩家收取 $40 ", "./image/015.png", 200, 0);//0
square[16] = new Square("市政厅广场", "$180", "#FFA500", 180, 6, 44, 70, 200, 550, 750);//6
square[17] = new Square("红十字", "购买后每次到达红十字便可以得到一张免费出狱卡", "./image/017.png", 150, 1);//1
square[18] = new Square("希腊神庙", "$180", "#FFA500", 180, 6, 44, 70, 200, 550, 750);//6
square[19] = new Square("白金汉宫", "$200", "#FFA500", 200, 6, 46, 80, 220, 600, 800);//6
square[20] = new Square("免费停车场", "捡到$50", "./image/020.png", 0, 0);//0
square[21] = new Square("路过", "探监", "#FFFFFF", 0, 2);//2
square[22] = new Square("联合国", "请遵从卡片的指示", "./image/022.png", 0, 2);//2
square[23] = new Square("卢浮宫", "$220", "#FF0000", 220, 7, 58, 90, 250, 700, 875);//7
square[24] = new Square("古城堡", "$240", "#FF0000", 240, 7, 60, 100, 300, 750, 925);//7
square[25] = new Square("ORACLE", "拥有者到达时免交房租两回合", "./image/025.png", 200, 1);//1
square[26] = new Square("悉尼歌剧院", "$260", "#FFFF00", 260, 8, 72, 110, 330, 800, 975);//8
square[27] = new Square("金字塔", "$260", "#FFFF00", 260, 8, 72, 110, 330, 800, 975);//8
square[28] = new Square("东方明珠", "$150", "#87CEEB", 150, 4, 58, 90, 120, 300, 500);//4
square[29] = new Square("布达拉宫", "$280", "#FFFF00", 280, 8, 74, 120, 360, 850, 1025);//8
square[30] = new Square("布赖斯峡谷", "$450", "#0000FF", 450, 10, 120, 300, 700, 900, 1200);//10
square[31] = new Square("科隆大教堂", "$300", "#008000", 300, 9, 76, 130, 390, 900, 110);//9
square[32] = new Square("凯旋门", "$300", "#008000", 300, 9, 76, 130, 390, 900, 1100);//9
square[33] = new Square("机遇", "请遵从卡片的指示", "./image/033.png", 0, 2);//2
square[34] = new Square("国会大厦", "$320", "#008000", 320, 9, 78, 150, 450, 800, 1100);//9
square[35] = new Square("入狱", "发现作弊行为，送入监狱.", "./image/035.png", 0, 2);//2
square[36] = new Square("香港", "所有房产租金连续三回合提升10%", "./image/036.png", 0, 0);//0
square[37] = new Square("黑天鹅堡", "$350", "#0000FF", 350, 10, 85, 175, 500, 1100, 1300);//10
square[38] = new Square("苹果公司", "拥有者可以向其他所有用户征收其资产的10%", "./image/038.png", 200, 1);//1
square[39] = new Square("伦敦塔桥", "$400", "#0000FF", 400, 10, 100, 200, 600, 1000, 1300);//10
square[40] = new Square("亚特兰大", "$200", "#0000FF", 200, 10, 60, 100, 300, 750, 925);//10
square[41] = new Square("乾清宫", "$250", "#00f08F", 250, 11, 100, 200, 400, 800, 1200);//11
square[42] = new Square("空中花园", "$160", "#7B68EE", 160, 12, 50, 100, 150, 400, 800);//12
square[43] = new Square("大堡礁", "$200", "#00f08F", 200, 11, 120, 300, 700, 900, 1200);//11
square[44] = new Square("IBM", "拥有者可以强行购买0级地产", "./image/044.png", 200, 1);//1
square[45] = new Square("金庙", "$220", "#7B68EE", 220, 12, 48, 90, 250, 700, 875);//12
square[46] = new Square("威尼斯", "$100", "#7B68EE", 100, 12, 48, 70, 200, 400, 800);//12
square[47] = new Square("迪拜", "请遵从卡片的指示", "./image/047.png", 0, 2);//2
square[48] = new Square("约旦佩特拉城", "$400", "#00f08F", 400, 11, 120, 300, 700, 1030, 1250);//11
square[49] = new Square("尼亚加拉瀑布", "$60", "#8B4513", 60, 3, 10, 20, 60, 180, 320);//3
square[50] = new Square("中国城", "所有玩家的行走方向反向，持续3回合", "./image/050.png", 150, 0);//0
square[51] = new Square("洛基山脉", "$180", "#FFA500", 180, 6, 44, 70, 200, 550, 750);//6



var chanceCards = [];



chanceCards[0] = new Card("金融风暴投资不利，损失了$100.", function(p) {
    game.addMoney(-100,p.id);
});
chanceCards[1] = new Card("您被要求支付税金,基础税金$20，每个地产每升一级加收$12.", function(p) {
    var tax = 0;
    for (var i = 0; i < square.length; i++) {
        if (square[i].owner == p.id)
            tax = tax + 20 + square[i].level * 12;
    }
    game.addMoney(-tax, p.id);
    infoDisplay(p.name+"支付税金 $"+tax);
});
chanceCards[2] = new Card("乱扔垃圾罚款$25.", function(p) {
	game.addMoney(-25,p.id);
});
chanceCards[3] = new Card("您被选举称为联合国秘书长，请支付每位玩家$40.", function(p) {
	for(var i=0;i<pcount;i++){
		if(player[i].id!=p.id)
			game.addMoney(40,player[i].id);
	}
    game.addMoney(-(40*pcount),p.id);
});
chanceCards[4] = new Card("回退三格.", function(p) {
	var start,end;
	start = p.position;
	p.position -= (dir)*3;
	end = p.position;
	updatePosition(start,end);
	setTimeout(land,holdtime);
});
chanceCards[5] = new Card("前进到最近的一个公司. 如果无主, 您可以花费$50购得. 如果有主, 支付给主人$120.", function(p) {
	switch (p.position){
		case 7:
			if(dir==1){
				p.position=17;
                updatePosition(7,17);
			}else{
                p.position=5;
                updatePosition(7,5);
			}
			break;
        case 22:
            if(dir==1){
                p.position=25;
                updatePosition(22,25);
            }else{
                p.position=17;
                updatePosition(22,17);
            }
            break;
        case 33:
            if(dir==1){
                p.position=38;
                updatePosition(33,38);
            }else{
                p.position=25;
                updatePosition(33,25);
            }
            break;
        case 47:
            if(dir==1){
                p.position=5;
                updatePosition(33,5);
            }else{
                p.position=44;
                updatePosition(33,25);
            }
            break;
	}
	setTimeout(dete,holdtime);
	function dete() {
	    console.log(square[p.position]);
		if(square[p.position].owner==-1){
            popup(p.position,5);
		}else if(square[p.position].owner==p.id)
			land();
		else{
			game.addMoney(-120,p.id);
            game.addMoney(120,square[p.position].owner);
            infoDisplay("由于该公司有主"+p.name+" 支付给 "+player[getIndexbyId(square[p.position].owner)].name+" $120");
		}


    }
});
chanceCards[6] = new Card("银行支付$50利息给您.", function(p) {
	game.addMoney(50,p.id);
});
chanceCards[7] = new Card("出狱卡，这张卡将会被保存到使用或者交易出去.", function(p) {
    p.JailCard++;
});
chanceCards[8] = new Card("支付济贫税$20.", function(p) {
    game.addMoney(-20,p.id);
});
chanceCards[9] = new Card("前往科隆大教堂. 如果经过起点，获得$500.", function(p) {
    var start = p.position;
    p.position = 31;
    if((p.position>31 && dir==1)||(p.position<31 && dir==-1)){//经过起点
        game.addMoney(500,p.id);
        infoDisplay(p.name+" 经过起点获得 $500 基金.",p.color);
    }
    updatePosition(start,31);
    setTimeout(land,holdtime);
});
chanceCards[10] = new Card("前往免费停车场. 如果经过起点，获得$500.", function(p) {
    var start = p.position;
    p.position = 20;
    if((p.position>20 && dir==1)||(p.position<20 && dir==-1)){//经过起点
        game.addMoney(500,p.id);
        infoDisplay(p.name+" 经过起点获得 $500 基金.",p.color);
    }
    updatePosition(start,20);
    setTimeout(land,holdtime);
});
chanceCards[11] = new Card("遇到旁氏骗局，$100养老金打水飘了.", function(p) {
    game.addMoney(-100,p.id);
});
chanceCards[12] = new Card("您的建筑贷款获利$150.", function(p) {
    game.addMoney(150,p.id);
});
chanceCards[13] = new Card("出狱卡，这张卡将会被保存到使用或者交易出去.", function(p) {
    p.JailCard++;
});
chanceCards[14] = new Card("前往中国城. 如果经过起点，获得$500.", function(p) {
    var start = p.position;
    p.position = 50;
    if((p.position>50 && dir==1)||(p.position<50 && dir==-1)){//经过起点
        game.addMoney(500,p.id);
        infoDisplay(p.name+" 经过起点获得 $500 基金.",p.color);
    }
    updatePosition(start,40);
    land();
});
chanceCards[15] = new Card("您被强送入监狱了.", function(p) {
	game.goToJail();
});
chanceCards[16] = new Card("除了您之外所有玩家支付税金，基础税金$20，每个地产每升一级加收$12.", function(p) {
    var tax = [];
	for (var i=0;i<7;i++)
		tax[i]=0;
    for (var i = 0; i < square.length; i++) {
        if (square[i].owner != -1
			&& square[i].owner != p.id
			&& square[i].groupNumber>=3
			&& square[i].groupNumber<=12){
            tax[square[i].owner] += 20 + square[i].level * 12;
		}
    }
    // console.log(tax);
    for(var i = 0; i < pcount; i++){
		if(tax[i]>0) {
            game.addMoney(-tax[i], i);
            infoDisplay(player[getIndexbyId(i)].name+"支付税金 $"+tax[i]);
        }
    }
});
chanceCards[17] = new Card("您获得了诺贝尔化学奖，奖金$10.", function(p) {
    game.addMoney(10,p.id);
});
chanceCards[18] = new Card("通过售卖股票，您获得了$50.", function(p) {
    game.addMoney(50,p.id);
});
chanceCards[19] = new Card("社保支付给您$50养老金.", function(p) {
    game.addMoney(50,p.id);
});
chanceCards[20] = new Card("您被车撞到了，获得了$20抚恤金.", function(p) {
    game.addMoney(20,p.id);
});
chanceCards[21] = new Card("获得科研基金$100.", function(p) {
    game.addMoney(100,p.id);
})
chanceCards[22] = new Card("您被强送入监狱了.", function(p) {
    game.goToJail();
});
chanceCards[23] = new Card("花费$80来了一场说走就走的旅行.", function(p) {
	game.addMoney(-80,p.id);
});
chanceCards[24] = new Card("支付医院账单$100.", function(p) {
    game.addMoney(-100,p.id);
});
chanceCards[25] = new Card("银行操作出错，获得$180.", function(p) {
    game.addMoney(180,p.id);
});
chanceCards[26] = new Card("路遇抢劫，被抢走$100.", function(p) {
    game.addMoney(-100,p.id);
});
chanceCards[27] = new Card("支付律师费$50.", function(p) {
    game.addMoney(-50,p.id);
});
chanceCards[28] = new Card("生日快乐.每位玩家给您$10作为生日礼物.", function(p) {
	for(var i=0;i<pcount;i++){
		if(player[i].id!=p.id)
            game.addMoney(-10,player[i].id);
	}
    game.addMoney(10*(pcount-1),p.id);
});
chanceCards[29] = new Card("回到2号门(获得$500启动基金).", function(p) {
	var start = p.position;
	p.position=0;
	game.addMoney(500,p.id);
    infoDisplay(p.name+" 经过起点获得 $500 基金.",p.color);
	updatePosition(start,0);
});




