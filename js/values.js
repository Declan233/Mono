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
function Square(name, pricetext, color, price, groupNumber, rent0, rent1, rent2, rent3, rent4, rent5) {
	this.name = name;
	this.pricetext = pricetext;
	this.color = color;
	this.owner = -1;
	this.mortgage = false;
	this.house = 0;
	this.hotel = 0;
	this.groupNumber = groupNumber || 0;
	this.price = (price || 0);
	this.rent0 = (rent0 || 0);
	this.rent1 = (rent1 || 0);
	this.rent2 = (rent2 || 0);
	this.rent3 = (rent3 || 0);
	this.rent4 = (rent4 || 0);
	this.rent5 = (rent5 || 0);
	this.level = 0;
	
	if (groupNumber === 3 || groupNumber === 4) {
		this.houseprice = 50;
	} else if (groupNumber === 5 || groupNumber === 6 || groupNumber === 7) {
		this.houseprice = 100;
	} else if (groupNumber === 8 || groupNumber === 9) {
		this.houseprice = 150;
	} else if (groupNumber === 10 || groupNumber === 11 || groupNumber === 12) {
		this.houseprice = 200;
	} else {
		this.houseprice = 0;
	}
}

/**
 * 卡片的构造函数
 * @param text
 * @param action
 * @constructor
 */
function Card(text, action) {
    this.text = text;
    this.action = action;
}

/**
 * 玩家的构造函数
 * @param name
 * @param color
 * @constructor
 */
function Player(name, color, token) {
    this.name = name;
    this.color = color;
    this.token = token;
    this.position = 0;
    this.money = 1500;
    this.creditor = -1;
    this.jail = false;
    this.jailroll = 0;
    this.JailCard = 0;
    this.bidding = true;

    this.pay = function (amount, creditor) {
        if (amount <= this.money) {
            this.money -= amount;
            updateMoney();
            return true;
        } else {
            this.money -= amount;
            this.creditor = creditor;
//			updateMoney();
            return false;
        }
    };
}



var square = [];

square[0] = new Square("起点", "领取$200补助.", "#FFFFFF", 0, 0);//0
square[1] = new Square("地中海大道", "$60", "#8B4513", 60, 3, 8, 10, 30, 90, 160, 250);//3
square[2] = new Square("波罗的海大道", "$60", "#8B4513", 60, 3, 8, 10, 30, 90, 160, 250);//3
square[3] = new Square("比萨斜塔", "$60", "#8B4513", 60, 3, 12, 20, 60, 180, 320, 450);//3
square[4] = new Square("拉斯维加斯", "支付$200", "#FFFFFF", 0, 0);//0
square[5] = new Square("微软", "$200", "#FFFFFF", 200, 1);//1
square[6] = new Square("罗马竞技场", "$100", "#87CEEB", 100, 4, 16, 30, 90, 270, 400, 550);//4
square[7] = new Square("公益基金", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
square[8] = new Square("埃菲尔铁塔", "$100", "#FF0080", 100, 5, 20, 30, 90, 270, 400, 550);//5
square[9] = new Square("金门桥", "$120", "#87CEEB", 120, 4, 28, 40, 100, 300, 450, 600);//4
square[10] = new Square("泰姬陵", "$220", "#FF0000", 220, 7, 40, 90, 250, 700, 875, 1050);//7
square[11] = new Square("长城", "$140", "#FF0080", 140, 5, 25, 50, 150, 450, 625, 750);//5
square[12] = new Square("免税店", "支付$50", "#FFFFFF", 0, 0);//0
square[13] = new Square("开罗", "$140", "#FF0080", 140, 5, 30, 50, 150, 450, 625, 750);//5
square[14] = new Square("圣彼得教堂", "$160", "#87CEEB", 160, 4, 38, 60, 180, 500, 700, 900);//4
square[15] = new Square("IBM", "$200", "#FFFFFF", 200, 1);//1
square[16] = new Square("市政厅广场", "$180", "#FFA500", 180, 6, 44, 70, 200, 550, 750, 950);//6
square[17] = new Square("机遇", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
square[18] = new Square("希腊神庙", "$180", "#FFA500", 180, 6, 44, 70, 200, 550, 750, 950);//6
square[19] = new Square("白金汉宫", "$200", "#FFA500", 200, 6, 46, 80, 220, 600, 800, 1000);//6
square[20] = new Square("免费停车场", "捡到$50", "#FFFFFF", 0, 0);//0
square[21] = new Square("路过", "", "#FFFFFF", 0, 2);//2
square[22] = new Square("联合国", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
square[23] = new Square("卢浮宫", "$220", "#FF0000", 220, 7, 58, 90, 250, 700, 875, 1050);//7
square[24] = new Square("古城堡", "$240", "#FF0000", 240, 7, 60, 100, 300, 750, 925, 1100);//7
square[25] = new Square("ORACLE", "$200", "#FFFFFF", 200, 1);//1
square[26] = new Square("悉尼歌剧院", "$260", "#FFFF00", 260, 8, 72, 110, 330, 800, 975, 1150);//8
square[27] = new Square("金字塔", "$260", "#FFFF00", 260, 8, 72, 110, 330, 800, 975, 1150);//8
square[28] = new Square("东方明珠", "$150", "#FFFFFF", 150, 2);//2
square[29] = new Square("布达拉宫", "$280", "#FFFF00", 280, 8, 74, 120, 360, 850, 1025, 1200);//8
square[30] = new Square("亚特兰大", "$200", "#FFFFFF", 200, 2);//2
square[31] = new Square("科隆大教堂", "$300", "#008000", 300, 9, 76, 130, 390, 900, 110, 1275);//9
square[32] = new Square("凯旋门", "$300", "#008000", 300, 9, 76, 130, 390, 900, 110, 1275);//9
square[33] = new Square("红十字", "$150", "#FFFFFF", 150, 1);//1
square[34] = new Square("国会大厦", "$320", "#008000", 320, 9, 78, 150, 450, 1000, 1200, 1400);//9
square[35] = new Square("入狱", "发现作弊行为，送入监狱.", "#FFFFFF", 0, 2);//2
square[36] = new Square("香港", "捡到$100", "#FFFFFF", 0, 0);//0
square[37] = new Square("黑天鹅堡", "$350", "#0000FF", 350, 10, 85, 175, 500, 1100, 1300, 1500);//10
square[38] = new Square("白宫", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
square[39] = new Square("伦敦塔桥", "$400", "#0000FF", 400, 10, 100, 200, 600, 1400, 1700, 2000);//10
square[40] = new Square("布赖斯峡谷", "$450", "#0000FF", 450, 10, 120, 300, 700, 1600, 1900, 2200);//10
square[41] = new Square("乾清宫", "$250", "#00f08F", 250, 11, 100, 200, 400, 800, 1200, 1500);//11
square[42] = new Square("空中花园", "$160", "#7B68EE", 160, 12, 50, 100, 150, 400, 800, 1300);//12
square[43] = new Square("大堡礁", "$200", "#00f08F", 200, 11, 120, 300, 700, 1600, 1900, 2200);//11
square[44] = new Square("WTO", "$200", "#FFFFFF", 200, 1);//1
square[45] = new Square("金庙", "$220", "#7B68EE", 220, 12, 48, 90, 250, 700, 875, 1050);//12
square[46] = new Square("威尼斯", "$100", "#7B68EE", 100, 12, 48, 70, 200, 400, 800, 1250);//12
square[47] = new Square("迪拜", "请遵从卡片的指示", "#FFFFFF", 0, 2);//2
square[48] = new Square("约旦佩特拉城", "$400", "#00f08F", 400, 30, 50, 300, 700, 1600, 1900, 2200);//11
square[49] = new Square("尼亚加拉瀑布", "$60", "#8B4513", 60, 3, 10, 20, 60, 180, 320, 450);//3
square[50] = new Square("中国城", "$150", "#FFFFFF", 150, 2);//2
square[51] = new Square("洛基山脉", "$180", "#FFA500", 180, 6, 44, 70, 200, 550, 750, 950);//6




var communityChestCards = [];
var chanceCards = [];

communityChestCards[0] = new Card("出狱卡，这张卡将会被保存到使用或者交易出去.", function(p) { });
communityChestCards[1] = new Card("您获得了诺贝尔化学奖，奖金$10.", function() { });
communityChestCards[2] = new Card("通过售卖股票，您获得了$50.", function() { });
communityChestCards[3] = new Card("社保支付给您$50养老金.", function() { });
communityChestCards[4] = new Card("您被车撞到了，获得了$20抚恤金.", function() { });
communityChestCards[5] = new Card("获得科研基金$100.", function() { });
communityChestCards[6] = new Card("您被强送入监狱了.", function() { });
communityChestCards[7] = new Card("您可以选择支付$50获得再一次掷骰子机会.", function() { });
communityChestCards[8] = new Card("支付医院账单$100.", function() { });
communityChestCards[9] = new Card("银行操作出错，获得$180.", function() { });
communityChestCards[10] = new Card("路遇抢劫，被抢走$120.", function() { });
communityChestCards[11] = new Card("支付律师费$50.", function() { });
communityChestCards[12] = new Card("生日快乐.每位玩家给您$10作为生日礼物.", function() { });
communityChestCards[13] = new Card("回到2号门(获得$200启动基金).", function() { });
communityChestCards[14] = new Card("您被要求支付税金 $40每个房间. $115每栋旅馆.", function() { });
communityChestCards[15] = new Card("您被强送入监狱了.", function() { });


chanceCards[0] = new Card("出狱卡，这张卡将会被保存到使用或者交易出去.", function(p) { });
chanceCards[1] = new Card("您被要求支付税金 $25每个房间. $100每栋旅馆.", function() { });
chanceCards[2] = new Card("乱扔垃圾罚款$15.", function() { });
chanceCards[3] = new Card("您被选举称为联合国秘书长，请支付每位玩家$50.", function() { });
chanceCards[4] = new Card("回退三格.", function() { });
chanceCards[5] = new Card("前进到最近的一个公司. 如果无主, 您可以从银行卖得. 如果有主, 支付给主人租金的2倍.", function() { });
chanceCards[6] = new Card("银行支付$50利息给您.", function() { });
chanceCards[7] = new Card("金融风暴投资不利，损失了$100.", function() { });
chanceCards[8] = new Card("支付济贫税$15.", function() { });
chanceCards[9] = new Card("前往科隆大教堂. 如果经过起点，获得$200.", function() { });
chanceCards[10] = new Card("遇到旁氏骗局，$100养老金打水飘了.", function() { });
chanceCards[11] = new Card("前往免费停车场. 如果经过起点，获得$200.", function() { });
chanceCards[12] = new Card("您的建筑贷款获利$150.", function() { });
chanceCards[13] = new Card("前往WTO. 获得一张免费出狱卡.", function() { });
chanceCards[14] = new Card("前往免税店.", function() { });
chanceCards[15] = new Card("您被强送入监狱了.", function() { });



function utiltext() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;如果公司有主，支付2倍租金.<br /><br />&nbsp;&nbsp;&nbsp;';
}


function transtext() {
    return '<div style="font-size: 14px; line-height: 1.5;">Rent<span style="float: right;">$25.</span><br />If 2 Railroads are owned<span style="float: right;">50.</span><br />If 3 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">100.</span><br />If 4 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">200.</span></div>';
}

