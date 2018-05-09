

//加载
window.onload = function() {
	draw_setup();
}



var available_colors = new Array('blue','red','green','fuchsia','gray','maroon','navy','olive','orange','purple', 'silver', 'teal');
var available_tokens = new Array('flash','fire','leaf','plane','heart','bell','tower','apple','star');

_draw_setup = {}

draw_setup = function() {
	var context =_draw_setup;
	
	context.draw_player_wrappers(7);
	context.bind_and_invoke_player_token_change();
	context.bind_and_invoke_player_color_change();
	context.bind_and_invoke_players_count_change();
}


_draw_setup.draw_player_wrappers = function(max) {
	var i, color,token;
	var content = "";
	var content_tokens = "<select class='player-token' title='玩家选择棋子'>";
    for (i = 0; i <= available_tokens.length - 1; i++) {
        token = available_tokens[i];
        content_tokens += "<option value='"+token+"'>"+token+"</option>";
    };
	content_tokens += "</select>";

  var content_colors = "<select class='player-color' title='玩家选择颜色'>";
  for (i = 0; i <= available_colors.length - 1; i++) {
  	color = available_colors[i];
  	content_colors += "<option style='color: "+color+";'>"+color+"</option>";
  };
  content_colors += "</select>";

  for (i = 1; i <= max; i++) {
	  content += "<div id='player"+i+"wrap' data-id='"+i+"' class='player-wrap'>";
	  content += "玩家 "+i+": ";
	  content += "<input type='text' id='playername' class='player-name' title='玩家名' maxlength='16' value='玩家"+i+"' /> ";
	  content += content_colors;
	  content += " ";
	  content += content_tokens;
	  content += "</div>";
  };

	$("#player-wrappers").append(content);
}


_draw_setup.bind_and_invoke_players_count_change = function() {
	$("#playernumber").on("change", _draw_setup.select_on_player_number_change);
	$("#playernumber").change();
}

_draw_setup.select_on_player_number_change = function() {
	pcount = parseInt(document.getElementById("playernumber").value, 10);
//	alert(pcount);
	$(".player-wrap").hide();

	for (var i = 1; i <= pcount; i++) {
		$("#player" + i + "wrap").show();
	}
}


_draw_setup.bind_and_invoke_player_token_change = function() {
    $("#player-wrappers .player-token").on("change", _draw_setup.bind_player_token_change);
    $("#player-wrappers .player-token").change();
}

_draw_setup.bind_and_invoke_player_color_change = function() {
    $("#player-wrappers .player-color").on("change", _draw_setup.select_on_player_color_change);
    $("#player-wrappers .player-color").change();
}

_draw_setup.bind_player_token_change = function() {
    var tokens_taken = [];

    var wrap = $(this).closest('.player-wrap');

    tokens_taken.push($(this).val());

    wrap.siblings().each(function(index, el) {
        var el2 = $(el).find('.player-token');
        var val2 = el2.val();
        var is_already_present = tokens_taken.indexOf(val2) != -1;
        if (is_already_present) {
            var tokens_not_taken = arr_diff(available_tokens, tokens_taken);
            el2.val(tokens_not_taken[0]);
        }
        val2 = el2.val();
        tokens_taken.push(val2);
    });

}

_draw_setup.select_on_player_color_change = function() {
	var colors_taken = [];

	var wrap = $(this).closest('.player-wrap');

	colors_taken.push($(this).val());

	wrap.siblings().each(function(index, el) {
		var el2 = $(el).find('.player-color');
		var val2 = el2.val();
		var is_already_present = colors_taken.indexOf(val2) != -1;
		if (is_already_present) {
			var colors_not_taken = arr_diff(available_colors, colors_taken);
			el2.val(colors_not_taken[0]);
		}
		val2 = el2.val();
		colors_taken.push(val2);
	});
}

function arr_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++)
        a[a1[i]] = true;
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]])
            delete a[a2[i]];
        else
            a[a2[i]] = true;
    }
    for (var k in a)
        diff.push(k);
    return diff;
};

